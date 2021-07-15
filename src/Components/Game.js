import React, {useEffect, useState} from 'react';
import Clicker from "./Clicker";
import EvoPoints from "./EvoPoints";
import Upgrades from "./Upgrades";
import Lucky from "./Lucky";
import useInterval from "../Helpers/useInterval";

const LSKEY = "Sickremental";
const initOwnedUpgrades = [
    {id: 0, amount: 0, isLocked: false},
    {id: 1, amount: 0, isLocked: true},
    {id: 2, amount: 0, isLocked: true},
    {id: 3, amount: 0, isLocked: true}];

const Game = () => {
    const [amountClicked, setAmountClicked] = useState(0);
    const [upgrades, setUpgrades] = useState([{
        "id": 0,
        "name": "sun",
        "filename": "./images/upgrades/stage0/sun_upgrade.png",
        "title": "Sunshine time",
        "level": 0,
        "price": 10,
        "gain": 1,
        "minOwned": 20
    },
        {
            "id": 1,
            "name": "food",
            "filename": "./images/upgrades/stage0/food_upgrade.png",
            "title": "Food bubbles!",
            "level": 0,
            "price": 50,
            "gain": 2,
            "minOwned": 10
        },
        {
            "id": 2,
            "name": "current",
            "filename": "./images/upgrades/stage0/current_upgrade.png",
            "title": "Strong Currents",
            "level": 0,
            "price": 100,
            "gain": 3,
            "minOwned": 5
        },
        {
            "id": 3,
            "name": "supercell",
            "filename": "./images/upgrades/stage0/supercell_upgrade.png",
            "title": "SuperCell!",
            "level": 0,
            "price": 200,
            "gain": 4,
            "minOwned": 2
        }]);
    const [passiveTick, setPassiveTick] = useState(0);
    const [isLucky, setIsLucky] = useState(false);
    const [isLuckTrigger, setIsLuckTrigger] = useState(false);
    const [gameStage, setGameStage] = useState(0);
    const [isNextStageUnlocked, setIsNextStageUnlocked] = useState(false);
    const [gameSettings, setGameSettings] = useState({background: "", clicker: "", cutout: ""});
    const [ownedUpgrades, setOwnedUpgrades] = useState(initOwnedUpgrades);
    //TODO: split of upgrades done do test tho ...


    useEffect(() => {
        //TODO: if no save load default starter data?
        if (window.localStorage.getItem(LSKEY + ".clicks") && window.localStorage.getItem(LSKEY + ".upgrades") && window.localStorage.getItem(LSKEY + ".stage")) {
            setAmountClicked(parseInt(window.localStorage.getItem(LSKEY + ".clicks")));
            setOwnedUpgrades(JSON.parse(window.localStorage.getItem(LSKEY + ".upgrades")));
            setGameStage(parseInt(window.localStorage.getItem(LSKEY + ".stage")));
        }
    }, [])

    const buyUpgrade = (boughtUpgrade) => {
        const ownedUpgradeIndex = ownedUpgrades.findIndex(el => el.id === boughtUpgrade.id);

        let allOwnedUpgrades = [...ownedUpgrades];

        let price = boughtUpgrade.price * (allOwnedUpgrades[ownedUpgradeIndex].amount < 1 ? 0.5 : allOwnedUpgrades[ownedUpgradeIndex].amount);
        let minOwned = boughtUpgrade.minOwned;

        if (price <= amountClicked) {
            setAmountClicked(amountClicked - price);
            allOwnedUpgrades[ownedUpgradeIndex] = {
                ...allOwnedUpgrades[ownedUpgradeIndex],
                amount: allOwnedUpgrades[ownedUpgradeIndex].amount + 1
            };
            //TODO fix this hardcoded +1 to unlock next upgrade
            console.log(allOwnedUpgrades[ownedUpgradeIndex].amount + " " + minOwned);
            console.log(allOwnedUpgrades[ownedUpgradeIndex]);
            if (allOwnedUpgrades[ownedUpgradeIndex].amount >= minOwned) {
                console.log("hardcoded +1")
                allOwnedUpgrades[ownedUpgradeIndex+1] = {
                    ...allOwnedUpgrades[ownedUpgradeIndex+1],
                    isLocked: false
                };
            }
            setOwnedUpgrades(allOwnedUpgrades);
        }

        if (allOwnedUpgrades.every((el) => el.isLocked === false) && allOwnedUpgrades[3].amount >= upgrades[3].minOwned) {
            setIsNextStageUnlocked(true);
        }
    };

    const luckClick = (luck) => {
        if (luck) {
            setAmountClicked(amountClicked + 1000);
        } else {
            let tempAmount = amountClicked;
            if (tempAmount - 1000 < 0) {
                tempAmount = 0;
            } else {
                tempAmount -= 1000;
            }
            setAmountClicked(tempAmount);
        }
        //TODO: refactor click to actually be clickable and remove itself on click plus stop animation start other animation
    }

    const saveGame = () => {
        window.localStorage.setItem(LSKEY + ".clicks", amountClicked);
        window.localStorage.setItem(LSKEY + ".upgrades", JSON.stringify(ownedUpgrades));
        window.localStorage.setItem(LSKEY + ".stage", gameStage)
    }

    useEffect(() => {
        let passive = 0;
        upgrades.forEach(upgrade => {
            const ownedUpgradeIndex = ownedUpgrades.findIndex(el => el.id === upgrade.id);
            passive += ownedUpgrades[ownedUpgradeIndex].amount * upgrade.gain;
        })
        setPassiveTick(passive);
    }, [upgrades, ownedUpgrades])


    useInterval(() => {
        setAmountClicked(amountClicked + passiveTick);
    }, 1000);
    //TODO: perhaps decrease gameLoop time and divide by 10 ?
    useInterval(() => {
        let rand = Math.random();
        if (rand > 0.5) {
            setIsLucky(true)
        } else {
            setIsLucky(false);
        }
        let rand2 = Math.random();
        if (rand2 <= 0.9) {
            setIsLuckTrigger(true);
        } else {
            setIsLuckTrigger(false);
        }
    }, 3000);


    const getUpgradeData = () => {

        fetch('./data/upgrades.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                //TODO: HOW TO LOAD IN DEFAULT GAME DATA ?!!
                setUpgrades(myJson[gameStage].upgrades);
                setGameSettings({
                    background: myJson[gameStage].background,
                    clicker: myJson[gameStage].clicker,
                    cutout: myJson[gameStage].cutout
                })
            });
    }

    useEffect(() => {
        setOwnedUpgrades(initOwnedUpgrades);
        setIsNextStageUnlocked(false);
        getUpgradeData()
    }, [gameStage])

    return (
        <>
            <button className={"SaveButton"} onClick={() => saveGame()}>Save Game!</button>
            <section className="App">

                <div className="Columns" style={{backgroundImage: ' url(' + gameSettings.background + ')'}}>
                    <Clicker clicked={() => setAmountClicked(amountClicked + 1)} image={gameSettings.clicker}
                             cutout={gameSettings.cutout}/>

                    <EvoPoints amount={amountClicked} passive={passiveTick}/>

                    <Upgrades upgrades={upgrades} buyUpgrade={buyUpgrade} ownedUpgrades={ownedUpgrades}
                              isNextStageUnlocked={isNextStageUnlocked} onStageClick={() => setGameStage(1)}/>
                </div>

                {isLuckTrigger ? <Lucky clicked={() => luckClick(isLucky)} lucky={isLucky}/> : <></>}

            </section>
        </>

    );
}
//TODO: IS LUCKY SUCKED ATM
export default Game;

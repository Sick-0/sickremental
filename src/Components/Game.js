import React, {useEffect, useRef, useState} from 'react';
import Clicker from "./Clicker";
import EvoPoints from "./EvoPoints";
import Upgrades from "./Upgrades";
import Lucky from "./Lucky";

const LSKEY = "Sickremental";

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        let id = setInterval(() => {
            savedCallback.current();
        }, delay);
        return () => clearInterval(id);
    }, [delay]);
}

const Game = () => {
    let initState = 0;
    if (window.localStorage.getItem(LSKEY + ".clicks")){
        initState = parseInt(window.localStorage.getItem(LSKEY + ".clicks"));
    }
    const [amountClicked, setAmountClicked] = useState(initState);
    const [upgrades, setUpgrades] = useState([
        {id: 0, name: "sun", level: 0, price: 10, gain: 1},
        {id: 1, name: "food", level: 0, price: 50, gain: 2},
        {id: 2, name: "current", level: 0, price: 100, gain: 3},
        {id: 3, name: "collaboration", level: 0, price: 200, gain: 4}
    ]);
    const [passiveTick, setPassiveTick] = useState(0);
    const [isLucky, setIsLucky] = useState(false);
    const [isLuckTrigger, setIsLuckTrigger] = useState(false);


    const buyUpgrade = (boughtUpgrade) => {
        const upgradeIndex = upgrades.findIndex(el => el.id === boughtUpgrade);
        let allUpgrades = [...upgrades];
        if (allUpgrades[upgradeIndex].price <= amountClicked) {
            setAmountClicked(amountClicked - allUpgrades[upgradeIndex].price);
            allUpgrades[upgradeIndex] = {
                ...allUpgrades[upgradeIndex],
                level: allUpgrades[upgradeIndex].level + 1,
                price: allUpgrades[upgradeIndex].price * 2
            };
            setUpgrades(allUpgrades);
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

    useEffect(() => {
        let passive = 0;
        upgrades.forEach(upgrade => {
            passive += upgrade.level * upgrade.gain;
        })
        setPassiveTick(passive);
    }, [upgrades])


    useInterval(() => {
        setAmountClicked(amountClicked + passiveTick);
    }, 1000);


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

    useEffect(() => {
        window.localStorage.setItem(LSKEY + ".clicks", amountClicked);
    }, [upgrades]);
    //TODO: actually save upgrades as well sicco!

    return (
        <section className="App">
            <div className="Columns">
                <Clicker clicked={() => setAmountClicked(amountClicked + 1)}/>

                <EvoPoints amount={amountClicked} passive={passiveTick}/>

                <Upgrades upgrades={upgrades} buyUpgrade={buyUpgrade}/>
            </div>
            {isLuckTrigger ? <Lucky clicked={() => luckClick(isLucky)} lucky={isLucky}/> : <></>}


        </section>
    );
}

export default Game;

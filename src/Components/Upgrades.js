import React from 'react';
import Upgrade from "./Upgrade";

const Upgrades = (props) => {
    return (
        <div className="Upgrades">
            {props.upgrades.map(upgrade => {
                let index = props.ownedUpgrades.findIndex(el => el.id === upgrade.id);
                let amount = props.ownedUpgrades[index].amount;
                return <Upgrade
                    name={upgrade.name}
                    level={amount}
                    key={upgrade.id}
                    id={upgrade.id}
                    gain={upgrade.gain}
                    price={upgrade.price}
                    buyUpgrade={props.buyUpgrade}
                    fileName = {upgrade.filename}
                    title={upgrade.title}
                />
            })}
            <div className="NextStageDiv" >
                <div className="UpgradeText" onClick={props.onStageClick}>
                    <code>Next stage here yo! </code>
                </div>
            </div>
        </div>
    ); //
};

export default Upgrades;

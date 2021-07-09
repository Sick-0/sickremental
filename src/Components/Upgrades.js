import React from 'react';
import Upgrade from "./Upgrade";

const Upgrades = (props) => {
    return (
        <div className="Upgrades">
            {props.upgrades.map(upgrade => {
                return <Upgrade
                    name={upgrade.name}
                    level={upgrade.level}
                    key={upgrade.id}
                    id={upgrade.id}
                    gain={upgrade.gain}
                    price={upgrade.price}
                    buyUpgrade={props.buyUpgrade}/>
            })}
        </div>
    );
};

export default Upgrades;

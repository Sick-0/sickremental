import React from 'react';

const Upgrade = (props) => {
    return (
        <div className="UpgradeBadge" key={props.id}>
            <img onClick={() => {props.buyUpgrade(props.id)}} src={props.name + "_upgrade.png"} className="UpgradeBadgeImage" alt={props.name}/>
            <div className="UpgradeText">
            <p>{props.name.charAt(0).toUpperCase() + props.name.slice(1)} (+{props.gain}/s)</p>
            <code>Amount: {props.level} giving {props.gain * props.level}/s</code> <br/>
            <code>Price: {props.price}</code> <br/>
            </div>
        </div>
    );
}

export default Upgrade;

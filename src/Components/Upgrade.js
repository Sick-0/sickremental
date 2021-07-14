import React from 'react';

const Upgrade = (props) => {
    return (
        <div className="UpgradeBadge" key={props.id}>
            <img alt={props.name} onClick={() => {props.buyUpgrade({id: props.id, price: props.price})}} src={props.fileName} className="UpgradeBadgeImage" />
            <div className="UpgradeText">
            <p>{props.title} (+{props.gain}/s)</p>
            <code>Amount: {props.level} giving {props.gain * props.level}/s</code> <br/>
            <code>Price: {props.price}</code> <br/>
            </div>
        </div>
    );
}

export default Upgrade;

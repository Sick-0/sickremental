import React from 'react';

const Upgrade = (props) => {
    return (
            <div className={"UpgradeBadge noselect " + (props.isLocked ? "disabledUpgrade" : "")} key={props.id}
                 hidden={props.isLocked}>
                <img alt={props.name} onClick={() => {
                    props.buyUpgrade({id: props.id, price: props.price, minOwned: props.neededForNext})
                }} src={props.fileName} className="UpgradeBadgeImage"/>
                <div className="UpgradeText">
                    <p>{props.title} (+{props.gain}/s)</p>
                    <code>Amount: {props.level} giving {props.gain * props.level}/s</code> <br/>
                    <code>Price: {props.price * (props.level < 1 ? 0.5 : props.level)}</code> <br/>
                </div>
            </div>
    );
}

export default Upgrade;

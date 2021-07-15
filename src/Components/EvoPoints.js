import React from 'react';

const EvoPoints = (props) => {

    return (
        <div className="EvoPoints noselect">
            <code className="EvoPointsText">Total points is : {props.amount}</code>
            <p className="EvoPointsSubText">Total gain per second is : {props.passive}</p>
        </div>
    );
};

export default EvoPoints;

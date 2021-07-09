import React from 'react';

const Lucky = (props) => {
    return (
        <div onClick={props.clicked} className="Lucky">
            <img alt="is it lucky or unlucky?" className="LuckyImage" src={props.lucky ? 'lucky_meteor.png' : 'unlucky_volcanic.png' }/>
        </div>
    );
};

export default Lucky;

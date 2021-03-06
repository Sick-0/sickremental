import React, {useEffect, useRef, useState} from 'react';
import AnimatedClick from "./AnimatedClick";

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


const Clicker = (props) => {

    const [animatedClicks, setAnimatedClicks] = useState([]);

    const clickHandle = () => {
        let tempArr = [...animatedClicks, {startPosX: MouseEvent.x, startPosY: MouseEvent.y, time: Date.now()}];
        setAnimatedClicks(tempArr);
        console.log(tempArr);
    }


    useInterval(() => {
        let time = Date.now();
        let temparr = animatedClicks;
        temparr = temparr.filter((item) => {
            return time < item.time + (1500);
        });
        setAnimatedClicks(temparr);
    }, 1000);

//TODO: pas x en y aan naar de actual location
    return (
        <div className="Clicker noselect" >
            {
                animatedClicks ? animatedClicks.map(click => {
                    return <AnimatedClick x={click.startPosX} y={click.startPosY}/>
                }) : <></>
            }
            <img alt='click here ya stupid ;)' onClick={() => {props.clicked(); clickHandle();}} className={`DaClicker ${props.cutout}`} src={props.image}/>
        </div>
    );
};

export default Clicker;

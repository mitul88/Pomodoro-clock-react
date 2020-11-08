import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SetTimer = (props) => {
    const id = props.title.toLowerCase();
    return (
        <div className = "timer-container">
            <h2 id={`${id}-label`}>
                {props.title} Length
            </h2>
            <div className="flex actions-wrapper">
                <button id={`${id}-decrement`} onClick={props.handleDecrease}>
                    <FontAwesomeIcon icon = "minus" />
                </button>
                    <span id={`${id}-length`}>{props.count}</span>
                <button id={`${id}-increment`} onClick={props.handleIncrease}> 
                <FontAwesomeIcon icon = "plus" />
                </button>
            </div>
        </div>
    )
}

export default SetTimer; 
import React from 'react';

export default function header(props) {
    return (
        <div className="header-wrapper">
            <button onClick={() => props.handleMonthChange("-")} >Previous</button>
            <h2>{props.monthName}</h2>
            <button onClick={() => props.handleMonthChange("+")} >Next</button>
        </div>
    )
}
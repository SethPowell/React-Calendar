import React from "react";
import Calendar from "./calendar-wrapper"

export default function contentWrapper(props) {
    return (
        <div className="content-wrapper">
            <Calendar month={props.month} />
        </div>
    )
}
import React from "react";

import DayOfWeek from "./day-of-week"

export default function calendarWrapper(props) {
    return (
        <div className="calendar-wrapper">
            <DayOfWeek day="Sunday" />
            <DayOfWeek day="Monday" />
            <DayOfWeek day="Tuesday" />
            <DayOfWeek day="Wednesday" />
            <DayOfWeek day="Thursday" />
            <DayOfWeek day="Friday" />
            <DayOfWeek day="Saturday" />
        </div>
    )
}
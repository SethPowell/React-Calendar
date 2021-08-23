import React from "react";
import CalendarBox from "./calendar-box";

import DayOfWeek from "./day-of-week"

export default function calendarWrapper(props) {
    const renderCalendarBoxes = () => {
        const calendarBoxesArray = []
        for (let i=0; i<42; i++) {
            calendarBoxesArray.push(
                <CalendarBox />
            )
        }
        return calendarBoxesArray
    }

    return (
        <div className="calendar-wrapper">
            <DayOfWeek day="Sunday" />
            <DayOfWeek day="Monday" />
            <DayOfWeek day="Tuesday" />
            <DayOfWeek day="Wednesday" />
            <DayOfWeek day="Thursday" />
            <DayOfWeek day="Friday" />
            <DayOfWeek day="Saturday" />
            {renderCalendarBoxes()}
        </div>
    )
}
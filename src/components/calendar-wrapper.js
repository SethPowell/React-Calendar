import React from "react";
import CalendarBox from "./calendar-box";

import DayOfWeek from "./day-of-week"

export default function calendarWrapper(props) {
    const renderCalendarBoxes = () => {
        const calendarBoxesArray = []

        for (let i=1; i<=props.month.start_day; i++) {
            const date= (props.month.days_in_previous_month - props.month.start_day)+i
            calendarBoxesArray.push(
                <CalendarBox date={date} />
            )
        }

        for (let i=1; i<=props.month.days_in_month; i++) {
            calendarBoxesArray.push(
                <CalendarBox date={i} />
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
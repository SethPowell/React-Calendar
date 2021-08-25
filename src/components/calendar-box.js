import React, { Component } from "react";

export default class CalendarBox extends Component {
    render() {
        return (
            <div className="calendar-box">
                <span>{this.props.date}</span>
                <textarea></textarea>
            </div>
        )
    }
}
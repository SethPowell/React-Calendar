import React, { Component } from "react";

export default class CalendarBox extends Component {
    constructor() {
        super();

        this.state={
            reminderExists: false,
            textInput: ""
        }

        this.handleReminderChange = this.handleReminderChange.bind(this)
    }

    componentDidMount() {
        if (!this.props.overflow) {
            fetch(`http://127.0.0.1:5000/reminder/get/${this.props.month.id}/${this.props.date}`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.setState({
                        reminderExists: true,
                        textInput: data.text
                    })
                }
            })
            .catch(error => console.log("Error in reminder get request: ", error))
        }
    }

    handleReminderChange() {
        if (!this.state.reminderExists && this.state.textInput !== "") {
            // post request id, month, date
            fetch("http://127.0.0.1:5000/reminder/add", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    text: this.state.textInput,
                    date: this.props.date,
                    month_id: this.props.month.id
                })
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data === "string") {
                    console.log("Error in reminder post request: ", data)
                }
                else {
                    this.setState({ reminderExists: true })
                }
            })
            .catch(error => console.log("Error in reminder post request: ", error))
        }
        else if (this.state.reminderExists && this.state.textInput !== "") {
            //put request
            fetch(`http://127.0.0.1:5000/reminder/update/${this.props.month.id}/${this.props.date}`, {
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({text: this.state.textInput})
            })
            .then(response => response.json())
            .then(data => {
                if (typeof data === "string") {
                    console.log("Error in reminder put request: ", data)
                }
            })
            .catch(error => console.log("Error in reminder put request: ", error))
        }
        else if (this.state.reminderExists && this.state.textInput === "") {
            // delete request
            fetch(`http://127.0.0.1:5000/reminder/delete/${this.props.month.id}/${this.props.date}`, {method: "DELETE"})
            .then(response => response.json())
            .then(data => {this.setState({ reminderExists: false })})
            .catch(error => console.log("Error deleting reminder: ", error))
        }
    }

    render() {
        return (
            <div className="calendar-box">
                <span>{this.props.date}</span>
                <textarea value={this.state.textInput} onBlur={this.handleReminderChange} onChange={(event => this.setState({ textInput: event.target.value })).bind(this)}></textarea>
            </div>
        )
    }
}
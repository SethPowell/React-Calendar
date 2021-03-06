import React, { Component } from "react";

export default class CalendarBox extends Component {
    constructor(props) {
        super();

        const reminder = props.month ? props.month.reminders.filter(reminder => reminder.date === props.date)[0] : false

        this.state={
            reminderExists: reminder ? true : false,
            textInput: reminder ? reminder.text : ""
        }

        this.handleReminderChange = this.handleReminderChange.bind(this)
    }

    // componentDidMount() {
    //     if (!this.props.overflow) {
    //         fetch(`https://calendar-api-swp.herokuapp.com/reminder/get/${this.props.month.id}/${this.props.date}`, {method: "GET"})
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.id) {
    //                 this.setState({
    //                     reminderExists: true,
    //                     textInput: data.text
    //                 })
    //             }
    //         })
    //         .catch(error => console.log("Error in reminder get request: ", error))
    //     }
    // }

    handleReminderChange() {
        if (!this.state.reminderExists && this.state.textInput !== "") {
            // post request id, month, date
            fetch("https://calendar-api-swp.herokuapp.com/reminder/add", {
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
            fetch(`https://calendar-api-swp.herokuapp.com/reminder/update/${this.props.month.id}/${this.props.date}`, {
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
            fetch(`https://calendar-api-swp.herokuapp.com/reminder/delete/${this.props.month.id}/${this.props.date}`, {method: "DELETE"})
            .then(response => response.json())
            .then(data => {this.setState({ reminderExists: false })})
            .catch(error => console.log("Error deleting reminder: ", error))
        }
    }

    render() {
        return (
            <div className={`calendar-box ${this.props.overflow ? "overfolw" : null}`}>
                <span>{this.props.date}</span>
                <textarea 
                    value={this.state.textInput} 
                    onBlur={this.handleReminderChange} 
                    onChange={(event => this.setState({ textInput: event.target.value })).bind(this)}
                    disabled={this.props.overflow}
                ></textarea>
            </div>
        )
    }
}
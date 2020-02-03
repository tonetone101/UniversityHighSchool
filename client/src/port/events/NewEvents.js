import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiEvent";
import { Redirect } from "react-router-dom";

class NewEvent extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            time: "",
            date: "",
            where: "",
            body: "",
            url: "",
            url2: "",
            url3: "",
            url4: "",
            url5: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToEvents: false
        };
    }

    componentDidMount() {
        this.eventData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, time, date, where, body, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0 || time.length === 0 || date.length === 0 || where.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.eventData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.eventData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        date: "",
                        time:"",
                        where: "",
                        body: "",
                        url: "",
                        url2: "",
                        url3: "",
                        url4: "",
                        url5: "",
                        redirectToEvents: true
                    });
                }
            });
        }
    };

    newEventForm = (title, date, time, where, body, url, url2, url3, url4, url5) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Event Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Date</label>
                <input
                    onChange={this.handleChange("date")}
                    type="text"
                    className="form-control"
                    value={date}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Time</label>
                <input
                    onChange={this.handleChange("time")}
                    type="text"
                    className="form-control"
                    value={time}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Location</label>
                <input
                    onChange={this.handleChange("where")}
                    type="text"
                    className="form-control"
                    value={where}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link1</label>
                <input
                    onChange={this.handleChange("url")}
                    type="text"
                    className="form-control"
                    value={url}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link2</label>
                <input
                    onChange={this.handleChange("url2")}
                    type="text"
                    className="form-control"
                    value={url2}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link3</label>
                <input
                    onChange={this.handleChange("url3")}
                    type="text"
                    className="form-control"
                    value={url3}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link4</label>
                <input
                    onChange={this.handleChange("url4")}
                    type="text"
                    className="form-control"
                    value={url4}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link5</label>
                <input
                    onChange={this.handleChange("url5")}
                    type="text"
                    className="form-control"
                    value={url5}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Add Event
            </button>
        </form>
    );

    render() {
        const {
            title,
            time,
            date,
            where,
            body,
            url,
            url2,
            url3,
            url4,
            url5,
            user,
            error,
            loading,
            redirectToEvents
        } = this.state;

        if (redirectToEvents) {
            return <Redirect to={`/port/events`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">Add new event</h2>
                            <div
                                className="alert alert-danger"
                                style={{ display: error ? "" : "none" }}
                            >
                                {error}
                            </div>

                            {loading ? (
                                <div className="jumbotron text-center">
                                    <h2>Loading...</h2>
                                </div>
                            ) : (
                                ""
                            )} 
            

                            {this.newEventForm(title, date, time, where, body, url, url2, url3, url4, url5 )}
                       
            </div>
        );
    }
}

export default NewEvent;
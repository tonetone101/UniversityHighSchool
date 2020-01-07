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
        if (fileSize > 10000000) {
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
                        redirectToEvents: true
                    });
                }
            });
        }
    };

    newEventForm = (title, date, time, where, body) => (
        <form >
            <div className="form-group">
                <label className="text-muted">រូបភាពព្រឹត្តិការណ៍</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">ចំណងជើង</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">កាលបរិច្ឆេទ</label>
                <input
                    onChange={this.handleChange("date")}
                    type="text"
                    className="form-control"
                    value={date}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">ពេលវេលា</label>
                <input
                    onChange={this.handleChange("time")}
                    type="text"
                    className="form-control"
                    value={time}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">ទីតាំង</label>
                <input
                    onChange={this.handleChange("where")}
                    type="text"
                    className="form-control"
                    value={where}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">រាងកាយ</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                បន្ថែមព្រឹត្តិការណ៍
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
            user,
            error,
            loading,
            redirectToEvents
        } = this.state;

        if (redirectToEvents) {
            return <Redirect to={`/khmerevents`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">បន្ថែមព្រឹត្តិការណ៍ថ្មី</h2>
                            <div
                                className="alert alert-danger"
                                style={{ display: error ? "" : "none" }}
                            >
                                {error}
                            </div>

                            {loading ? (
                                <div className="jumbotron text-center">
                                    <h2>កំពុងផ្ទុក...</h2>
                                </div>
                            ) : (
                                ""
                            )} 
            

                            {this.newEventForm(title, date, time, where, body)}
                       
            </div>
        );
    }
}

export default NewEvent;
import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiApplication";
import { Redirect } from "react-router-dom";

class NewApplication extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            name: "",
            about: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToFaculties: false
        };
    }

    componentDidMount() {
        this.applicationData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const {name, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "Please enter student's name", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.applicationData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.applicationData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        name: "",
                        about:"",
                        redirectToFaculties: true
                    });
                }
            });
        }
    };

    newapplicationForm = (name) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Application form</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Student's Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Add application
            </button>
        </form>
    );

    render() {
        const {
            name,
            error,
            loading,
            redirectToFaculties
        } = this.state;

        if (redirectToFaculties) {
            return <Redirect to={`/application`} />;
        }

        return (
            <div className='container'>
                            <h3>
                                Please Upload copy of your Student's application
                                and enter the student's name
                            </h3>
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
            

                            {this.newapplicationForm(name)}
                       
            </div>
        );
    }
}

export default NewApplication;
import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { createLink } from "./apiAcademics";
import { Redirect } from "react-router-dom";

class NewAcademics extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToFaculties: false
        };
    }

    componentDidMount() {
        this.academicsData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, name, about, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0 ) {
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
        this.academicsData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            createLink(userId, token, this.academicsData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        body: "",
                        redirectToFaculties: true
                    });
                }
            });
        }
    };

    newacademicsForm = (title, body) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Content Photo</label>
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
                <label className="text-muted">body</label>
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
                Add content
            </button>
        </form>
    );

    render() {
        const {
            title,
            body,
            user,
            error,
            loading,
            redirectToFaculties
        } = this.state;

        if (redirectToFaculties) {
            return <Redirect to={`/academics`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">Add new academics content</h2>
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
            

                            {this.newacademicsForm(title, body)}
                       
            </div>
        );
    }
}

export default NewAcademics;
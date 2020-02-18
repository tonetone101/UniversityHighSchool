import React, { Component } from "react";
import { isAuthenticated, signout } from "../../auth";
import { create } from "./apiHr";
import { Redirect } from "react-router-dom";

class Newhr extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            url: "",
            docUrl:"",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToFaculties: false
        };
    }

    componentDidMount() {
        this.hrData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { title, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0) {
            this.setState({ error: "Title is required", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.hrData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.hrData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title:"",
                        url: "",
                        docUrl:"",
                        redirectToFaculties: true
                    });
                }
            });
        }
    };

    newhrForm = (title, url, docUrl) => (
        <form >
            <div className="form-group">
                <label className="text-muted">PDF file</label>
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
                <label className="text-muted">Website url</label>
                <input
                    onChange={this.handleChange("url")}
                    placeholder='optional'
                    type="text"
                    className="form-control"
                    value={url}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Google doc url</label>
                <input
                    onChange={this.handleChange("docUrl")}
                    placeholder='optional'
                    type="text"
                    className="form-control"
                    value={docUrl}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Add 
            </button>
        </form>
    );

    render() {
        const {
            title,
            url,
            docUrl,
            user,
            error,
            loading,
            redirectToFaculties
        } = this.state;

        if (redirectToFaculties) {
            return <Redirect to={`/khmer/hr`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">Add new hr link</h2>
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
            

                            {this.newhrForm(title, url, docUrl)}
                       
            </div>
        );
    }
}

export default Newhr;
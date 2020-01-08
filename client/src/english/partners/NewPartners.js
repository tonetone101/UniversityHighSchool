import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiPartners";
import { Redirect } from "react-router-dom";

class NewPartners extends Component {
    constructor() {
        super();
        this.state = {
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
        this.partnersData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { name, about, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (name.length === 0 || about.length === 0) {
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
        this.partnersData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.partnersData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        name: "",
                        about:"",
                        redirectToFaculties: true
                    });
                }
            });
        }
    };

    newPartnersForm = (name, about) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Partner Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">About</label>
                <input
                    onChange={this.handleChange("about")}
                    type="text"
                    className="form-control"
                    value={about}
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
            name,
            about,
            user,
            error,
            loading,
            redirectToFaculties
        } = this.state;

        if (redirectToFaculties) {
            return <Redirect to={`/partners`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">Add new partners</h2>
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
            

                            {this.newPartnersForm(name, about)}
                       
            </div>
        );
    }
}

export default NewPartners;
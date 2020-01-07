import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiPhoto";
import { Redirect } from "react-router-dom";

class NewPhoto extends Component {
    constructor() {
        super();
        this.state = {
            caption: "",
            photo: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToFaculties: false
        };
    }

    componentDidMount() {
        this.photoData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { caption, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (caption.length === 0) {
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
        this.photoData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.photoData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        caption: "",
                        redirectToGallery: true
                    });
                }
            });
        }
    };

    newPhotoForm = (caption) => (
        <form >
            <div className="form-group">
                <label className="text-muted">Foto</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Subtítulo</label>
                <input
                    onChange={this.handleChange("caption")}
                    type="text"
                    className="form-control"
                    value={caption}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Añadir foto
            </button>
        </form>
    );

    render() {
        const {
            caption,
            user,
            error,
            loading,
            redirectToGallery
        } = this.state;

        if (redirectToGallery) {
            return <Redirect to={`/spanish/images`} />;
        }

        return (
            <div className='container'>
                            <h2 className="mt-5 mb-5">Añadir foto</h2>
                            <div
                                className="alert alert-danger"
                                style={{ display: error ? "" : "none" }}
                            >
                                {error}
                            </div>

                            {loading ? (
                                <div className="jumbotron text-center">
                                    <h2>Cargando...</h2>
                                </div>
                            ) : (
                                ""
                            )} 
            

                            {this.newPhotoForm(caption)}
                       
            </div>
        );
    }
}

export default NewPhoto
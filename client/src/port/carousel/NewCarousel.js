import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create } from "./apiCarousel";
import { Redirect } from "react-router-dom";

class NewCarousel extends Component {
    constructor() {
        super();
        this.state = {
            caption1: "",
            caption2: "",
            caption3: "",
            missionStatement: "",
            photo1: "",
            photo2: "",
            photo3: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToHome: false
        };
    }

    componentDidMount() {
        this.carouselData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { caption1, caption2, caption3, fileSize } = this.state;
        if (fileSize > 1000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo1" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo1" ? event.target.files[0].size : 0;
        this.carouselData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.carouselData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        caption1: "",
                        caption2: "",
                        caption3:"",
                        photo1: "",
                        photo2: "",
                        photo3: "",
                        missionStatement:"",
                        redirectToHome: true
                    });
                }
            });
        }
    };

    newCarouselForm = (caption1, caption2, caption3, missionStatement) => (
        <form className='container'>
            <div className="form-group">
                <label className="text-muted">Photo 1</label>
                <input
                    onChange={this.handleChange("photo1")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Photo 2</label>
                <input
                    onChange={this.handleChange("photo2")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Photo 3</label>
                <input
                    onChange={this.handleChange("photo3")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Caption 1</label>
                <input
                    onChange={this.handleChange("caption1")}
                    type="text"
                    className="form-control"
                    value={caption1}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">caption2</label>
                <textarea
                    onChange={this.handleChange("caption2")}
                    type="text"
                    className="form-control"
                    value={caption2}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">caption3</label>
                <textarea
                    onChange={this.handleChange("caption3")}
                    type="text"
                    className="form-control"
                    value={caption3}
                />
            </div>


            <div className="form-group">
                <label className="text-muted">Mission Statement</label>
                <textarea
                    onChange={this.handleChange("missionStatement")}
                    type="text"
                    className="form-control"
                    value={missionStatement}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Create Carousel
            </button>
        </form>
    );

    render() {
        const {
            caption1,
            caption2,
            caption3,
            missionStatement,
            user,
            error,
            loading,
            redirectToHome
        } = this.state;

        if (redirectToHome) {
            return <Redirect to='/port' />;
        }

        return (
            <div >
                <h2 className="mt-5 mb-5">Create a carousel</h2>
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


                {this.newCarouselForm(caption1, caption2, caption3, missionStatement)}
    
            </div>
        );
    }
}

export default NewCarousel;
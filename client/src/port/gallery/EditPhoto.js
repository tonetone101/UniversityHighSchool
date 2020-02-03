import React, {Component} from 'react'
import { singlePhoto, update } from './apiPhoto';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditPhoto extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            caption: '',
            redirectToGallery: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (photoId) => {
        singlePhoto(photoId).then(data => {
            if (data.error) {
                this.setState({redirectToGallery: true})
            } else {
                this.setState({id: data._id, caption: data.caption, error: ''})
            }
        })
    }

    componentDidMount() {
        this.photoData = new FormData()
        const imageId = this.props.match.params.imageId
        this.init(imageId)
    }

    isValid = () => {
        const { caption, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (caption.length === 0 ) {
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
            const photoId = this.state.id
            const token = isAuthenticated().token;

            update(photoId, token, this.photoData).then(data => {
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

    editPhotoForm = (caption) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Caption</label>
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
                Edit Photo
            </button>
        </form>
    );


    render() {
        const {id, caption, redirectToGallery, error, loading} = this.state

        if (redirectToGallery) {
            return <Redirect to={`/port/image/${id}`} />;
        }

        return (
            <div className='container'>
                        <div className='alert alert-danger' style={{display: error ? "" : "none"}}>
                            {error}
                        </div>

                        {loading ? ( 
                        <div className='jumbotron text-center'>
                            <h2>Loading....</h2>
                        </div>
                        ) : (
                            ""
                        )
                    }

                        {this.editPhotoForm(caption)}
            </div>
        )
    }
}

export default EditPhoto
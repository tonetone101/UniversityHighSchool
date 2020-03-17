import React, {Component} from 'react'
import { singleLink, edit} from './apiAcademics';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class UpdateAcademicsContent extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            body: '',
            photo: '',
            redirectToHome: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (linkId) => {
        singleLink(linkId).then(data => {
            if (data.error) {
                this.setState({redirectToHome: true})
            } else {
                this.setState({
                    id: data._id, 
                    title: '',
                    body: '', 
                    error: ''
                })
            }
        })
    }

    componentDidMount() {
        this.linkData = new FormData()
        const linkId = this.props.match.params.linkId
        this.init(linkId)
    }

    isValid = () => {
        const { link, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.linkData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const linkId = this.state.id
            const token = isAuthenticated().token;

            edit(linkId, token, this.linkData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: '',
                        body: '',
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editlinkForm = (title, body) => (
        <form className='container'>
            <div className="form-group">
                <label className="text-muted">Content Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>

            <div>
                <div className="form-group" >
                    <label className="text-muted">Title</label>
                    <textarea
                        onChange={this.handleChange("title")}
                        type="text"
                        className="form-control"
                        value={title}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Body</label>
                    <textarea
                        onChange={this.handleChange("body")}
                        type="text"
                        className="form-control"
                        value={body}
                    />
                </div>
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Edit
            </button>
        </form>
    );


    render() {
        const {title, body, redirectToHome, error, loading} = this.state

        if (redirectToHome) {
            return <Redirect to={`/link`} />;
        }

        return (
            <div>
              
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


                        {this.editlinkForm(title, body)}
             
            </div>
        )
    }
}

export default UpdateAcademicsContent
import React, {Component} from 'react'
import { singlehr, update } from './apiHr';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class Edithr extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            url: '',
            docUrl: '',
            redirectTohr: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (hrId) => {
        singlehr(hrId).then(data => {
            if (data.error) {
                this.setState({redirectTohr: true})
            } else {
                this.setState({id: data._id, title: data.title, url: data.url, docUrl: data.docUrl, error: ''})
            }
        })
    }

    componentDidMount() {
        this.hrData = new FormData()
        const hrId = this.props.match.params.hrId
        this.init(hrId)
    }

    isValid = () => {
        const { title, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (title.length === 0 ) {
            this.setState({ error: "Title required", loading: false });
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
            const hrId = this.state.id
            const token = isAuthenticated().token;

            update(hrId, token, this.hrData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        url: "",
                        docUrl: "",
                        redirectTohr: true
                    });
                }
            });
        }
    };

    edithrForm = (title, url, docUrl) => (
        <form>
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
                <label className="text-muted">Website Url</label>
                <textarea
                    onChange={this.handleChange("url")}
                    placeholder='optional'
                    type="text"
                    className="form-control"
                    value={url}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Google Doc Url</label>
                <textarea
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
                Edit hr
            </button>
        </form>
    );


    render() {
        const {id, title, url, docUrl, redirectTohr, error, loading} = this.state

        if (redirectTohr) {
            return <Redirect to={`/hrd`} />;
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
                        <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`/hr/photo/${id}`} onError={i => (i.target.src = ``)} alt='' />


                        {this.edithrForm(title, url, docUrl)}
            </div>
        )
    }
}

export default Edithr
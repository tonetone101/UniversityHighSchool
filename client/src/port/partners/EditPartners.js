import React, {Component} from 'react'
import { singlePartner, update } from './apiPartners';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditPartners extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            name: '',
            about: '',
            redirectTopartners: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (partnersId) => {
        singlePartner(partnersId).then(data => {
            if (data.error) {
                this.setState({redirectTopartners: true})
            } else {
                this.setState({id: data._id, title: data.title, name: data.name, about: data.about, error: ''})
            }
        })
    }

    componentDidMount() {
        this.partnersData = new FormData()
        const partnersId = this.props.match.params.partnersId
        this.init(partnersId)
    }

    isValid = () => {
        const { name, about, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (name.length === 0 || about.length ===0) {
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
            const partnersId = this.state.id
            const token = isAuthenticated().token;

            update(partnersId, token, this.partnersData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        name: "",
                        about: "",
                        redirectTopartners: true
                    });
                }
            });
        }
    };

    editpartnersForm = (title, name, about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">partners Photo</label>
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
                <textarea
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
                Edit partners
            </button>
        </form>
    );


    render() {
        const {id, name, about, redirectTopartners, error, loading} = this.state

        if (redirectTopartners) {
            return <Redirect to={`/partners/${id}`} />;
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
                        <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`/partners/photo/${id}`} onError={i => (i.target.src = ``)} alt='' />


                        {this.editpartnersForm(about, name)}
            </div>
        )
    }
}

export default EditPartners
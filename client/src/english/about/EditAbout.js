import React, {Component} from 'react'
import { singleAbout, update } from './apiAbout';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditAbout extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            body: "",
            paragraph2: '',
            paragraph3: '',
            paragraph4: '',
            paragraph5: '',
            redirectToHome: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (aboutId) => {
        singleAbout(aboutId).then(data => {
            if (data.error) {
                this.setState({redirectToHome: true})
            } else {
                this.setState({
                    id: data._id, 
                    body: data.body, 
                    paragraph2: data.paragraph2,
                    paragraph3: data.paragraph3,
                    paragraph4: data.paragraph4,
                    paragraph5: data.paragraph5,
                    error: ''
                })
            }
        })
    }

    componentDidMount() {
        this.aboutData = new FormData()
        const aboutId = this.props.match.params.aboutId
        this.init(aboutId)
    }

    isValid = () => {
        const { about, fileSize } = this.state;
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
        this.aboutData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const aboutId = this.state.id
            const token = isAuthenticated().token;

            update(aboutId, token, this.aboutData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        about: "",
                        paragraph2: '',
                        paragraph3: '',
                        paragraph4: '',
                        paragraph5: '',
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editaboutForm = (body, paragraph2, paragraph3, paragraph4, paragraph5 ) => (
        <form className='container'>
            <div className="form-group" >
                <label className="text-muted">Paragraph1</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group" >
                <label className="text-muted">paragraph2</label>
                <textarea
                    onChange={this.handleChange("paragraph2")}
                    type="text"
                    className="form-control"
                    value={paragraph2}
                />
            </div>

            <div className="form-group" >
                <label className="text-muted">paragraph3</label>
                <textarea
                    onChange={this.handleChange("paragraph3")}
                    type="text"
                    className="form-control"
                    value={paragraph3}
                />
            </div>

            <div className="form-group" >
                <label className="text-muted">paragraph4</label>
                <textarea
                    onChange={this.handleChange("paragraph4")}
                    type="text"
                    className="form-control"
                    value={paragraph4}
                />
            </div>

            <div className="form-group" >
                <label className="text-muted">paragraph5</label>
                <textarea
                    onChange={this.handleChange("paragraph5")}
                    type="text"
                    className="form-control"
                    value={paragraph5}
                />
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
        const {id, body, paragraph2, paragraph3, paragraph4, paragraph5, redirectToHome, error, loading} = this.state

        if (redirectToHome) {
            return <Redirect to={`/about`} />;
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


                        {this.editaboutForm(body, paragraph2, paragraph3, paragraph4, paragraph5)}
             
            </div>
        )
    }
}

export default EditAbout
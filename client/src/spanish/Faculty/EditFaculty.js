import React, {Component} from 'react'
import { singleFaculty, update } from './apiFaculty';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditFaculty extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            name: '',
            about: '',
            redirectTofaculty: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (facultyId) => {
        singleFaculty(facultyId).then(data => {
            if (data.error) {
                this.setState({redirectToFaculty: true})
            } else {
                this.setState({id: data._id, title: data.title, name: data.name, about: data.about, error: ''})
            }
        })
    }

    componentDidMount() {
        this.facultyData = new FormData()
        const facultyId = this.props.match.params.facultyId
        this.init(facultyId)
    }

    isValid = () => {
        const { title, name, about, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || name.length === 0 || about.length === 0) {
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
        this.facultyData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const facultyId = this.state.id
            const token = isAuthenticated().token;

            update(facultyId, token, this.facultyData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        name: "",
                        about: "",
                        redirectToFaculty: true
                    });
                }
            });
        }
    };

    editFacultyForm = (title, name, about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Foto de la facultad</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept=".xlsx, .xls, image/*, .doc, .docx,.ppt, .pptx, .txt, .pdf" 
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Título</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Nombre</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Acerca de</label>
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
                Editar facultad
            </button>
        </form>
    );


    render() {
        const {id, title, name, about, redirectToFaculty, error, loading} = this.state

        if (redirectToFaculty) {
            return <Redirect to={`/spanish/faculty/${id}`} />;
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
                        <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/spanishfaculty/photo/${id}`} onError={i => (i.target.src = ``)} alt='' />


                        {this.editFacultyForm(title, name, about)}
            </div>
        )
    }
}

export default EditFaculty
import React, {Component} from 'react'
import { singleschoolBoardMember, update } from './apiSchoolBoardMember';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class EditSchoolBoardMember extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            name: '',
            about: '',
            redirectToschoolBoardMember: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (schoolBoardMemberId) => {
        singleschoolBoardMember(schoolBoardMemberId).then(data => {
            if (data.error) {
                this.setState({redirectToschoolBoardMember: true})
            } else {
                this.setState({id: data._id, title: data.title, name: data.name, about: data.about, error: ''})
            }
        })
    }

    componentDidMount() {
        this.schoolBoardMemberData = new FormData()
        const schoolBoardMemberId = this.props.match.params.schoolBoardMemberId
        this.init(schoolBoardMemberId)
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
        if (title.length === 0 || name.length === 0 || about.length ===0) {
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
        this.schoolBoardMemberData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const schoolBoardMemberId = this.state.id
            const token = isAuthenticated().token;

            update(schoolBoardMemberId, token, this.schoolBoardMemberData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        name: "",
                        about: "",
                        redirectToschoolBoardMember: true
                    });
                }
            });
        }
    };

    editschoolBoardMemberForm = (title, name, about) => (
        <form>
            <div className="form-group">
                <label className="text-muted">schoolBoardMember Photo</label>
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
                Edit schoolBoardMember
            </button>
        </form>
    );


    render() {
        const {id, title, name, about, redirectToschoolBoardMember, error, loading} = this.state

        if (redirectToschoolBoardMember) {
            return <Redirect to={`/schoolBoardMember/${id}`} />;
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
                        <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/schoolBoardMember/photo/${id}`} onError={i => (i.target.src = ``)} alt='' />


                        {this.editschoolBoardMemberForm(title, name, about)}
            </div>
        )
    }
}

export default EditSchoolBoardMember
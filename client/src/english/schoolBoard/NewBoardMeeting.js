import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { create} from "./apiSchoolBoardMeeting";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class NewschoolBoardMeeting extends Component {
    constructor() {
        super();
        this.state = {
            body: '',
            url: '',
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToschoolBoardMeetings: false,
           // events: []
        };
        this.onChange = editorState => this.setState({editorState})

    }

    componentDidMount() {
        this.schoolBoardMeetingData = new FormData();
        this.setState({ user: isAuthenticated().user});
    }

    isValid = () => {
        const { body, url, fileSize } = this.state;
        if (fileSize > 100000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (body.length === 0 || url.length === 0) {
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
        this.schoolBoardMeetingData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.schoolBoardMeetingData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    
                    this.setState({
                        loading: false,
                        body: "",
                        url:"",
                        redirectToschoolBoardMeetings: true,
                   });
                }
            });
        }
    };

    newschoolBoardMeetingForm = (body, url) => (
        <form>       

            <div className="form-group">
                <label className="text-muted">schoolBoardMeeting explanation</label>
                <input
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Google Doc url of schoolBoardMeeting</label>
                <input
                    onChange={this.handleChange("url")}
                    type="text"
                    className="form-control"
                    value={url}
                />
            </div>                                

            <div className='row'>
                <button
                    onClick={this.clickSubmit}
                    className="btn btn-raised btn-primary"
                    style={{'marginLeft': '10px'}}
                >
                    Post schoolBoardMeeting
                </button>
                <Link className='btn btn-raised ml-5' to={'/schoolBoardMeeting'}>Back</Link>

               
            </div>
        </form>
    );

    render() {
        const {
            body,
            url,
            error,
            loading,
            redirectToschoolBoardMeetings
        } = this.state;
       

        if (redirectToschoolBoardMeetings) {
            return <Redirect to={'/schoolBoardMeeting'} />;
            
        }

        return (
            <div className='container'>
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
        

                        {this.newschoolBoardMeetingForm(body, url)}
                        
            </div>
        );
    }
}

export default NewschoolBoardMeeting;
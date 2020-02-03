import React, {Component} from 'react'
import { singleEvent, update } from './apiEvent';
import { isAuthenticated } from "../../auth";
import { Redirect, Link} from "react-router-dom";


class EditEvent extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            title: '',
            time:'',
            date:'',
            body: '',
            url: '',
            url2: "",
            url3: "",
            url4: "",
            url5: "",
            redirectToEvent: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (eventId) => {
        singleEvent(eventId).then(data => {
            if (data.error) {
                this.setState({redirectToEvent: true})
            } else {
                this.setState({
                    id: data._id, 
                    title: data.title, 
                    time: data.time, 
                    date: data.date, 
                    body: data.body, 
                    url: data.url, 
                    url2: data.url2,
                    url3: data.url3,
                    url4: data.url4,
                    url5: data.url5,
                    error: ''})
            }
        })
    }

    componentDidMount() {
        this.eventData = new FormData()
        const eventId = this.props.match.params.eventId
        this.init(eventId)
    }

    isValid = () => {
        const { title, time, date, body, fileSize } = this.state;
        if (fileSize > 10000000) {
            this.setState({
                error: "File size to large",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || time.length === 0 || date.length === 0 || body.length === 0) {
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
        this.eventData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const eventId = this.state.id
            const token = isAuthenticated().token;

            update(eventId, token, this.eventData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        time: "",
                        date: "",
                        body: "",
                        url: "",
                        url2: "",
                        url3: "",
                        url4: "",
                        url5: "",
                        redirectToEvent: true
                    });
                }
            });
        }
    };

    editEventForm = (title, time, date, body, url, url2, url3, url4, url5 ) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Event Photo</label>
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
                <label className="text-muted">Time</label>
                <input
                    onChange={this.handleChange("time")}
                    type="text"
                    className="form-control"
                    value={time}
                />
            </div>


            <div className="form-group">
                <label className="text-muted">Date</label>
                <input
                    onChange={this.handleChange("date")}
                    type="text"
                    className="form-control"
                    value={date}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Body</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link1</label>
                <input
                    onChange={this.handleChange("url")}
                    type="text"
                    className="form-control"
                    value={url}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link2</label>
                <input
                    onChange={this.handleChange("url2")}
                    type="text"
                    className="form-control"
                    value={url2}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link3</label>
                <input
                    onChange={this.handleChange("url3")}
                    type="text"
                    className="form-control"
                    value={url3}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link4</label>
                <input
                    onChange={this.handleChange("url4")}
                    type="text"
                    className="form-control"
                    value={url4}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Link5</label>
                <input
                    onChange={this.handleChange("url5")}
                    type="text"
                    className="form-control"
                    value={url5}
                />
            </div>

            <div>
                <button
                    onClick={this.clickSubmit}
                    className="btn btn-raised btn-primary mr-5"
                >
                    Edit Event
                </button>
                <Link  to={`/event/${this.state.id}`}><button className='btn btn-warning'>Cancel</button></Link>
            </div>

           
        </form>
    );


    render() {
        const {id, title, time, date, body, url, url2,
            url3,
            url4,
            url5, redirectToEvent, error, loading} = this.state

        if (redirectToEvent) {
            return <Redirect to={`/event/${id}`} />;
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
                        {/* <img style={{height: '200px', width: 'auto'}} className='img-thumbnail' src={`${process.env.REACT_APP_API_URL}/event/photo/${id}`} onError={i => (i.target.src = ``)} alt='' /> */}


                        {this.editEventForm(title, time, date, body, url, url2, url3, url4, url5 )}
            </div>
        )
    }
}

export default EditEvent
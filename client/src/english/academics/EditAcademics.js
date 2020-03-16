import React, {Component} from 'react'
import { singleAcademics, update } from './apiAcademics';
import { isAuthenticated } from "../../auth";
import { Redirect} from "react-router-dom";

class Editacademics extends Component {
    constructor() {
        super()
        this.state = { 
            id: '',
            intro: "",
            paragraph1: '',
            paragraph2: '',
            paragraph3: '',
            paragraph4: '',
            grade9Expect: '',
            grade9Curric: '',
            grade10Expect: '',
            grade10Curric: '',
            grade11Expect: '',
            grade11Curric: '',
            grade12Expect: '',
            grade12Curric: '',
            redirectToHome: false,
            error: '',
            filesize: 0,
            loading: false
        }
    }

    init = (academicsId) => {
        singleAcademics(academicsId).then(data => {
            if (data.error) {
                this.setState({redirectToHome: true})
            } else {
                this.setState({
                    id: data._id, 
                    intro: data.intro, 
                    paragraph1: data.paragraph1,
                    paragraph2: data.paragraph2,
                    paragraph3: data.paragraph3,
                    paragraph4: data.paragraph4,
                    grade9Expect: data.grade9Expect,
                    grade9Curric: data.grade9Curric,
                    grade10Expect: data.grade10Expect,
                    grade10Curric: data.grade10Curric,
                    grade11Expect: data.grade11Expect,
                    grade11Curric: data.grade11Curric,
                    grade12Expect: data.grade12Expect,
                    grade12Curric: data.grade12Curric, 
                    error: ''
                })
            }
        })
    }

    componentDidMount() {
        this.academicsData = new FormData()
        const academicsId = this.props.match.params.academicsId
        this.init(academicsId)
    }

    isValid = () => {
        const { academics, fileSize } = this.state;
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
        this.academicsData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const academicsId = this.state.id
            const token = isAuthenticated().token;

            update(academicsId, token, this.academicsData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        intro: "",
                        paragraph1: '',
                        paragraph2: '',
                        paragraph3: '',
                        paragraph4: '',
                        grade9Expect: '',
                        grade9Curric: '',
                        grade10Expect: '',
                        grade10Curric: '',
                        grade11Expect: '',
                        grade11Curric: '',
                        grade12Expect: '',
                        grade12Curric: '',
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editacademicsForm = (intro, paragraph1, paragraph2, paragraph3, paragraph4, grade9Expect, grade9Curric, grade10Expect, grade10Curric, grade11Expect, grade11Curric) => (
        <form className='container'>
            <div>
                <h3>Academics page</h3>
                <div className="form-group" >
                    <label className="text-muted">Paragraph1</label>
                    <textarea
                        onChange={this.handleChange("intro")}
                        type="text"
                        className="form-control"
                        value={intro}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">paragraph2</label>
                    <textarea
                        onChange={this.handleChange("paragraph1")}
                        type="text"
                        className="form-control"
                        value={paragraph1}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">paragraph3</label>
                    <textarea
                        onChange={this.handleChange("paragraph2")}
                        type="text"
                        className="form-control"
                        value={paragraph2}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">paragraph4</label>
                    <textarea
                        onChange={this.handleChange("paragraph3")}
                        type="text"
                        className="form-control"
                        value={paragraph3}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">paragraph5</label>
                    <textarea
                        onChange={this.handleChange("paragraph4")}
                        type="text"
                        className="form-control"
                        value={paragraph4}
                    />
                </div>
            </div>

            <div>
                <h3> 9th Grade</h3>
                <div className="form-group" >
                    <label className="text-muted">Grade9 Expectation</label>
                    <textarea
                        onChange={this.handleChange("grade9Expect")}
                        type="text"
                        className="form-control"
                        value={grade9Expect}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Grade9 Curriculum explanation</label>
                    <textarea
                        onChange={this.handleChange("grade9Curric")}
                        type="text"
                        className="form-control"
                        value={grade9Curric}
                    />
                </div>
            </div>

            <div>
                <h3> 10th Grade</h3>
                <div className="form-group" >
                    <label className="text-muted">Grade10 Expectation</label>
                    <textarea
                        onChange={this.handleChange("grade10Expect")}
                        type="text"
                        className="form-control"
                        value={grade10Expect}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Grade10 Curriculum explanation</label>
                    <textarea
                        onChange={this.handleChange("grade10Curric")}
                        type="text"
                        className="form-control"
                        value={grade10Curric}
                    />
                </div>
            </div>

            <div>
                <h3> 11th Grade</h3>
                <div className="form-group" >
                    <label className="text-muted">Grade11 Expectation</label>
                    <textarea
                        onChange={this.handleChange("grade11Expect")}
                        type="text"
                        className="form-control"
                        value={grade11Expect}
                    />
                </div>

                <div className="form-group" >
                    <label className="text-muted">Grade11 Curriculum explanation</label>
                    <textarea
                        onChange={this.handleChange("grade11Curric")}
                        type="text"
                        className="form-control"
                        value={grade11Curric}
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
        const {id, intro, paragraph1, paragraph2, paragraph3, paragraph4, grade9Expect, grade9Curric, grade10Expect, grade10Curric, grade11Expect, grade11Curric, grade12Expect, grade12Curric , redirectToHome, error, loading} = this.state

        if (redirectToHome) {
            return <Redirect to={`/academics`} />;
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


                        {this.editacademicsForm(intro, paragraph1, paragraph2, paragraph3, paragraph4, grade9Expect, grade9Curric, grade10Expect, grade10Curric, grade11Expect, grade11Curric )}
             
            </div>
        )
    }
}

export default Editacademics
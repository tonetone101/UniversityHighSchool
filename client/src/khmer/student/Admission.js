import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { getAdmission } from "./apiStudent";
import { Link } from "react-router-dom";
import AdmissionNews from './AdmissionNews'
import { ListGroup } from 'react-bootstrap';
import Header from '../header/Header'

class Admission extends Component {
        state = {
            error: "",
            user: {},
            admission: '',
            fileSize: 0,
            comments: [],
            loading: false,
            redirectToProfile: false,
        };


    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    updateComments = comments => {
        this.setState({comments})
        console.log(comments)
    }

    componentDidMount() {
        this.renderUser()
        const admissionId = this.props.match.params.admissionId
        getAdmission(admissionId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({
                    admission: data,
                    comments: data.comments,
                    loading: true

              }, () => {
                    console.log(this.state.comments)
              })
              
            }
        }) 
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.renderUser()
    }

    renderContact = () => {
        return (
            <div>
                <p style={{fontWeight: 'bold'}}>ទំនាក់ទំនង</p>
                <p> ទូរស័ព្ទ: (401) 254- 4829</p>
                <p> អ៊ីមែល: admissions@uhschool.org</p>
                <p>1 Empire Plaza | Providence, RI 02903</p>
            </div>
        )
    }

    renderRequirements = (admission) => {
        const {comments} = this.state
        return (
            <div>
                <h3>{admission.title}</h3>
                <div className='mt-5'>
                    {this.state.loading &&
                        <AdmissionNews admissionId={admission._id} comments={comments.reverse()} updateComments={this.updateComments} />
                    }
                </div>
            </div>
        )
    }

    renderAppLinks = () => {
        return (
            <div>
                <h4 style={{fontWeight: 'bold'}}>
                ការចុះឈ្មោះ
                </h4>
                 <ListGroup variant="flush">
                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំជាភាសាអង់គ្លេស
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំជាភាសាអេស្ប៉ាញ
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item> 
                            <Link onClick={() => { 
                                            window.open(`https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/view?usp=sharing`) 
                                            }} >
                                មើលពាក្យសុំព័រទុយហ្កាល់
                            </Link>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Link to='/khmer/new/application'>
                                បញ្ជូនពាក្យសុំនិស្សិត
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
            </div>
        )
    }
    
    render() {
        const {
            admission, comments,
        } = this.state;

        return (
            <div>
                <Header history={this.props.history} />

                <div className='container mt-3' >
                    <p className='text-center'> 
                        សូមស្វាគមន៍ចំពោះផ្នែកចូលរៀនរបស់យើង។
                        នៅទីនេះអ្នកអាចមើលនិងទាញយកច្បាប់ចម្លងនៃពាក្យសុំរបស់យើងក៏ដូចជាបញ្ជូនសំណុំបែបបទដែលបានបំពេញជូនយើង។
                    </p>
                    
                    <div className='row mt-5'>
                        <div className='col-md-3 mt-4'>
                                {this.renderAppLinks()}
                            
                            <div className='mt-4'>
                                {this.renderContact()}
                            </div>  
                        </div>
                            
                        <div className='col-md-6'>
                            {this.renderRequirements(admission)}
                           
                        </div>

                                     
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Admission;
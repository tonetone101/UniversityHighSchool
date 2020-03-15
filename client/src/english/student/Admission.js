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
                <p style={{fontWeight: 'bold'}}>Contact</p>
                <p> Phone: (401) 254- 4829</p>
                <p> Email: admissions@uhschool.org</p>
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
        const englishApp = 'https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/preview?usp=sharing'

        const spanishApp = 'https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/preview?usp=sharing'

        const portApp = 'https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/preview?usp=sharing'

        return (
            <div className='text-center'>
                <h4 style={{fontWeight: 'bold'}} className='mb-5'>
                    Registration
                </h4>
                
                <div>
                    <div className='mb-5'>
                        <iframe height='500' width='500' src={englishApp}></iframe>
                    </div>

                    <div className='mb-5'>
                        <iframe height='500' width='500' src={spanishApp}></iframe>
                    </div>

                    <div className='mb-5'>
                        <iframe height='500' width='500' src={portApp}></iframe>
                    </div>
                    
                </div>
            </div>
        )
    }
    

    // renderAppLinks = () => {
    //     return (
    //         <div style={{background: '#b7b7b7'}}>
    //             <h4 style={{fontWeight: 'bold'}}>
    //                 Registration
    //             </h4>
    //              <ListGroup variant="flush">
    //                     <ListGroup.Item style={{background: '#b7b7b7'}}> 
    //                         <Link onClick={() => { 
    //                                         window.open(`https://drive.google.com/file/d/1zkxOP_gez1IsVi7YPnH7DF5KjAZn7e8-/view?usp=sharing`) 
    //                                         }} >
    //                                 View English application form
    //                         </Link>
    //                     </ListGroup.Item>

    //                     <ListGroup.Item style={{background: '#b7b7b7'}}> 
    //                         <Link onClick={() => { 
    //                                         window.open(`https://drive.google.com/file/d/17Vya9qqFuHaAbH5KrDdO0rRXZi9cbYQP/view?usp=sharing`) 
    //                                         }} >
    //                             View Spanish application form
    //                         </Link>
    //                     </ListGroup.Item>

    //                     <ListGroup.Item style={{background: '#b7b7b7'}}> 
    //                         <Link onClick={() => { 
    //                                         window.open(`https://drive.google.com/file/d/14nIKl8FHPsXm3nq0D0hcAEmbAFP5EPbY/view?usp=sharing`) 
    //                                         }} >
    //                             View Portuguese application form
    //                         </Link>
    //                     </ListGroup.Item>

    //                     <ListGroup.Item style={{background: '#b7b7b7'}} >
    //                         <Link to='/new/application'>
    //                             Submit Student application
    //                         </Link>
    //                     </ListGroup.Item>
    //                 </ListGroup>
    //         </div>
    //     )
    // }
    
    render() {
        const {
            admission
        } = this.state;


        return (
            <div>
                <Header history={this.props.history} />
                <div className='container mt-3' >
                    <p className='text-center'> 
                        Welcome to our Admissions section. 
                        Here you can view and download a copy of our application as well as submit a completed form to us. 
                    </p>

                    {this.renderAppLinks()}
                    
                    {/* <div className='row mt-5'>
                        <div className='col-md-3 mt-4'>
                                {this.renderAppLinks()}
                            
                            <div className='mt-4'>
                                {this.renderContact()}
                            </div>  
                        </div>

                            

                        <div className='col-md-9'>
                            {this.renderRequirements(admission)}
                           
                        </div>

                                     
                        
                    </div> */}
                </div>
            </div>
        );
    }
}

export default Admission;
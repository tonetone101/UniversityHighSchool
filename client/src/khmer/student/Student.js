import React, { Component } from "react";
import { isAuthenticated } from "../../auth";
import { Link } from "react-router-dom";
import Links from './Links'
import Header from '../header/Header'

class Student extends Component {
    constructor() {
        super();
        this.state = {
            parent: "",
            student: "",
            birthday: "",
            contact: "",
            error: "",
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false,
        };
    }

    renderUser = () => {
        this.setState({user: isAuthenticated().user })
    }

    componentDidMount() {
        this.renderUser()
    }

    componentWillReceiveProps() {
        this.renderUser()
    }

    render() {

        return (
            <div>
                 <Header history={this.props.history} />
              
                <div className='container mt-4' >
                    <h3 className='text-center'>សូមស្វាគមន៍ចំពោះផ្នែកនិស្សិតរបស់យើង</h3>
                    <p className='text-center'>ខាងក្រោមនេះអ្នកនឹងឃើញបញ្ជីមាតិកាអំពីគោលនយោបាយរបស់យើងនិងបណ្តាញភ្ជាប់សំខាន់ៗផ្សេងទៀតដែលយើងជឿថានឹងផ្តល់ផលប្រយោជន៍ដល់សិស្សរបស់យើង។.</p>
                <ul>
                    <li>
                        <Link to='/khmer/bully'>
                        គោលនយោបាយសម្លុត
                        </Link>
                    </li>

                    <li>
                        <Link  onClick={() => { window.open('https://docs.google.com/document/d/1jlafDy_caOu5EjBXnyKkk9eZIkKYJOgiocmEsYWtIM8/edit?usp=sharing', '_blank') }} >
                        សៀវភៅណែនាំការសម្លុត
                        </Link>
                    </li>

                    <li>
                        <Link to='/khmer/genderpolicy'>
                        គោលនយោបាយយេនឌ័ររបស់និស្សិត
                        </Link>
                    </li>
                    
                    
                </ul>
                <Links />
                </div>
            </div>
        );
    }
}

export default Student;
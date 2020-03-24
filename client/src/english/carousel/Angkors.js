import React, {Component} from 'react'
import { Carousel } from 'react-bootstrap';
import {list} from './apiCarousel'
import {Link } from 'react-router-dom'
import { isAuthenticated} from '../../auth'
import {Animated} from 'react-animated-css'
import { Card, Button } from 'react-bootstrap'
import Header from '../header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAnchor } from '@fortawesome/free-solid-svg-icons'

class Carol extends Component {
    state = {
        showRestorive: true,
        showCB: true,
        showLa: true,
        hide: false
    }

    renderUser = () => {
        this.setState({
            user: isAuthenticated().user
        })
    } 

    renderRestorive = () => {
        this.setState({
            showRestorive: true,
            showLa: false,
            showCB: false
        })
    }

    renderLa = () => {
        this.setState({
            showRestorive: false,
            showLa: true,
            showCB: false
        })
    }

    renderCb = () => {
        this.setState({
            showRestorive: false,
            showLa: false,
            showCB: true
        })
    }

    renderAll = () => {
        this.setState({
            showRestorive: true,
            showLa: true,
            showCB: true
        })
    }

    hiderCB = () => {
        const {showCB} = this.state
        if (showCB === false) return {
            display: 'none'
        }
        
       
    }

    hiderLA = () => {
        const {showLa, } = this.state
        if (showLa === false) return {
            display: 'none'
        }
      
    }

    hiderRestorative = () => {
        const {showRestorive} = this.state
        if (showRestorive === false) return {
            display: 'none'
        }
    }

    renderAnkors = () => {
        return (
            <div className='container' id='projects'>
                <div className="row title mb-5">
                <div className="col text-center">
                  <h1 className="text-uppercase">Anchors</h1>
                  <div className='icon'>
                    <FontAwesomeIcon  icon ={faAnchor} />
                  </div>                  
                  <div className="title-underline"></div>
        
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                  <div className="btn-group btn-group-lg mb-5 button-group filter-button-group" role="group">
                    <button type="button" onClick={this.renderAll} className="btn text-uppercase" data-filter="*">all</button>
                    <button type="button" onClick={this.renderRestorive} className="btn text-uppercase" data-filter=".restorative">Restorative</button>
                    <button type="button" onClick={this.renderCb} className="btn text-uppercase" data-filter=".compatencyBased">Compatency Based</button>
                    <button type="button" onClick={this.renderLa} className="btn text-uppercase" data-filter=".languageAcquisition">Language Acquisition</button>
                  </div>
                </div>
            </div>

            <div className="row grid projects">
                <div className="col-sm-6 col-md-4 my-3 restorative" style={this.hiderCB}>
                  <div className="img-container">
                    <img src="https://i.imgur.com/YYcwrfXm.png" className="img-fluid rounded project-image" />
                    <a href="https://antkeo1.github.io/myTicTacToe/" className="search-link"><FontAwesomeIcon  icon ={faSearch} /></a>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 my-3 compatencyBased" style={this.hiderLA}>
                  <div className="img-container">
                    <img src="https://i.imgur.com/1mh5Gvhm.png" className="img-fluid rounded project-image" />
                    <a href="https://floating-gorge-22160.herokuapp.com/" className="search-link"><FontAwesomeIcon  icon ={faSearch} /></a>
                  </div>
                 
                </div>

                <div className="col-sm-6 col-md-4 my-3 languageAcquisition" style={this.hiderRestorative}>
                  <div className="img-container">
                    <img src="https://i.imgur.com/FPS8bBnm.png" className="img-fluid rounded project-image" />
                    <a href="https://pvd04-squad06.github.io/Squad-project-client/" className="search-link"><FontAwesomeIcon  icon ={faSearch} /></a>
                  </div>
                </div>
                
            </div>

            </div>
        )
    }



    render() {

        return (
            <div>             
                        
                        {
                            this.renderAnkors()
                        }
                    
                                
                        
            </div>
        )
    }
}

export default Carol


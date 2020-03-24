import React, {Component} from 'react'
import Isotope from 'isotope-layout/js/isotope'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAnchor } from '@fortawesome/free-solid-svg-icons'
import {Link } from 'react-router-dom'
var classNames = require('classnames');

class Angkors extends Component {
    constructor(props) {
        super(props);
        this.onFilterChange = this.onFilterChange.bind(this);
        this.state = {
            laText: false,
            cbText: false,
            resText: false
          };
      }
    
      // isotope
    onFilterChange = (newFilter) => {
        if (this.iso === undefined) {
          this.iso = new Isotope('#filter-container', {
            itemSelector: '.filter-item',
            layoutMode: "fitRows"
          });
        }
        if(newFilter === '*') {
          this.iso.arrange({ filter: `*` });
        } else {
          this.iso.arrange({ filter: `.${newFilter}` });
        }

        if(`.${newFilter}` === 'restorative') {
            this.setState({resText: true})
        } else if (`.${newFilter}` === '.compatencyBased') {
            this.setState({cbText: true})
        } else if (`.${newFilter}` === '.languageAcquisition') {
            this.setState({
                laText: true
            })
        }
      }

    renderAnkors = () => {
        return (
            <div className='container' id='projects'>
                <div className="row title mb-5">
                <div className="col text-center">
                  <h1 className="text-uppercase" style={{fontWeight: 'bold'}}>Anchors</h1>
                  <div className='icon'>
                    <FontAwesomeIcon  icon ={faAnchor} />
                  </div>                  
                  <div className="title-underline"></div>
        
                </div>
            </div>

            <div className="row">
                <div className="col text-center">
                  <div className="btn-group btn-group-lg mb-5 button-group filter-button-group" role="group">
                    <button type="button" onClick={() => {this.onFilterChange('*')}} className="btn text-uppercase" data-filter="*">all</button>
                    <button type="button" onClick={() => {this.onFilterChange('restorative')}} className="btn text-uppercase" data-filter=".restorative">Restorative</button>
                    <button type="button" onClick={() => {this.onFilterChange('compatencyBased')}} className="btn text-uppercase" data-filter=".compatencyBased">Compatency Based</button>
                    <button type="button" onClick={() => {this.onFilterChange('languageAcquisition')}} className="btn text-uppercase" data-filter=".languageAcquisition">Language Acquisition</button>
                  </div>
                </div>
            </div>

            <div className="row grid projects" id="filter-container">
                
                <div className="col-sm-6 col-md-4 my-3 filter-item restorative" >
                  <div className="img-container row">
                    <img src="https://i.imgur.com/YYcwrfXm.png" className={this.state.resText ? classNames("img-fluid", "rounded", "project-image", "col-md-6") : "img-fluid", "rounded", "project-image"} />
                    <Link to='/' className="search-link"><FontAwesomeIcon  icon ={faSearch} /></Link>
                    {
                        this.state.resText && this.state.resText === true(
                            <p className='col-md-6'>
                                something
                            </p>
                        )
                    }
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 my-3 filter-item compatencyBased" >
                  <div className="img-container ">
                    <img src="https://i.imgur.com/1mh5Gvhm.png" className={this.state.cbText ? classNames("img-fluid", "rounded", "project-image", "col-md-6") : "img-fluid", "rounded", "project-image"} />
                    {
                        this.state.cbText && this.state.cbText === true(
                            <p className='col-md-6'>
                                nothing
                            </p>
                        )
                    }                  </div>
                 
                </div>

                <div className="col-sm-6 col-md-4 my-3 filter-item languageAcquisition" >
                  <div className="img-container">
                    <img src="https://i.imgur.com/FPS8bBnm.png" className={this.state.laText ? classNames("img-fluid", "rounded", "project-image", "col-md-6") : "img-fluid", "rounded", "project-image"} />
                    {
                        this.state.laText && this.state.laText === true(
                            <p className='col-md-6'>
                                anything
                            </p>
                        )
                    }                  </div>
                </div>
                
            </div>

            </div>
        )
    }



    render() {
        console.log(this.state)

        return (
            <div>             
                        
                        {
                            this.renderAnkors()
                        }
                    
                                
                        
            </div>
        )
    }
}

export default Angkors


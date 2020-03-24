import React, {Component} from 'react'
import Isotope from 'isotope-layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAnchor } from '@fortawesome/free-solid-svg-icons'

class Angkors extends Component {
    state = {
        showRestorive: true,
        showCB: true,
        showLa: true,
        hide: false
    }

    onFilterChange = (newFilter) => {
        if (this.iso === undefined) {
          this.iso = new Isotope('#grid-container', {
            itemSelector: '.grid-item',
            layoutMode: "fitRows",
            percentPosition: true,
            fitRows: {
              gutter: '.gutter-sizer'
            }
          });
        }
        if(newFilter === '*') {
          this.iso.arrange({ filter: `*` });
        } else {
          this.iso.arrange({ filter: `.${newFilter}` });
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
                    <button type="button" onClick={this.onFilterChange('*')} className="btn text-uppercase" data-filter="*">all</button>
                    <button type="button" onClick={this.onFilterChange('restorative')} className="btn text-uppercase" data-filter=".restorative">Restorative</button>
                    <button type="button" onClick={this.onFilterChange('compatencyBased')} className="btn text-uppercase" data-filter=".compatencyBased">Compatency Based</button>
                    <button type="button" onClick={this.onFilterChange('languageAcquisition')} className="btn text-uppercase" data-filter=".languageAcquisition">Language Acquisition</button>
                  </div>
                </div>
            </div>

            <div className="row grid projects" id="grid-container">
                <div className="col-sm-6 col-md-4 my-3 restorative" >
                  <div className="img-container grid-item">
                    <img src="https://i.imgur.com/YYcwrfXm.png" className="img-fluid rounded project-image" />
                    <a href="https://antkeo1.github.io/myTicTacToe/" className="search-link"><FontAwesomeIcon  icon ={faSearch} /></a>
                  </div>
                </div>

                <div className="col-sm-6 col-md-4 my-3 compatencyBased" >
                  <div className="img-container grid-item">
                    <img src="https://i.imgur.com/1mh5Gvhm.png" className="img-fluid rounded project-image" />
                    <a href="https://floating-gorge-22160.herokuapp.com/" className="search-link"><FontAwesomeIcon  icon ={faSearch} /></a>
                  </div>
                 
                </div>

                <div className="col-sm-6 col-md-4 my-3 languageAcquisition" >
                  <div className="img-container grid-item">
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

export default Angkors


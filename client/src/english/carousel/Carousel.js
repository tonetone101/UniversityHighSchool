import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { list } from "./apiCarousel";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { Card } from "react-bootstrap";
import Header from "../header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faUniversity } from "@fortawesome/free-solid-svg-icons";

class Carol extends Component {
  state = {
    user: "",
    carousel: [],
    redirectToSignin: false,
  };

  renderUser = () => {
    this.setState({
      user: isAuthenticated().user,
    });
  };

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          carousel: data.find((d) => {
            if (d._id == "5e21c9ab9195bc7dc99dcfb3") {
              return d;
            }
          }),
        });
      }
    });
    this.renderUser();
    console.log(isAuthenticated().user);
  }

  componentWillReceiveProps() {
    this.renderUser();
  }

  renderNews = () => {
    return (
      <div className="text-center mt-5">
        <Link to="nws">
          <img
            id="homeImg"
            style={{ height: "400px", width: "400px" }}
            src={require("../../images/NewsIcon.png")}
          />
          <figcaption className="lead">Click to read more</figcaption>
        </Link>
      </div>
    );
  };

  renderMission = () => {
    return (
      <div id="vision">
        <div className="container">
          <div className="text-center">
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              OUR MISSION AND VISION
            </h3>
            <div className="icon">
              <FontAwesomeIcon icon={faCheckSquare} />
            </div>
            <div className="title-underline text-center"></div>
          </div>

          <div className="row text-center mt-5">
            <img
              id="homeImage"
              style={{ height: "300px", width: "200px" }}
              className="col-md-6"
              src={require("../../images/uhsMission.png")}
            />
            <img
              id="homeImage"
              style={{ height: "300px", width: "200px" }}
              className="col-md-6"
              src={require("../../images/uhsVision.png")}
            />
          </div>
        </div>
      </div>
    );
  };

  renderFooter = () => {
    return (
      <div>
        <footer id="footer" className="mt-5">
          <div class="text-center row ml-5">
            <img
              className="col-md-6 mb-4"
              style={{ height: "150px", marginTop: "10px" }}
              src={require("../../images/uhsBanner.png")}
            />
            <div className="col-md-6 d-flex justify-content-around align-items-baseline">
              <div className="mt-3">
                <p>1 Empire Plaza | Providence, RI 02903</p>
                <p>Phone: (401) 254- 4829 | somaly@uhschool.org</p>
                <h5 className="text-capitalize">
                  &copy; {new Date().getFullYear()} copyright :{" "}
                  <a href="/">www.uhSchool.org </a>
                </h5>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  renderVideo = () => {
    const uhsVideo =
      "https://drive.google.com/file/d/1O6So7c58o-HuQwCVPAeY4Y_yNkLbz06Z/preview?ts=sharing";

    return (
      <div>
        <iframe
          width="100%"
          height="430"
          src={uhsVideo}
          allow="autoplay"
        ></iframe>
      </div>
    );
  };

  renderLearningStage = () => {
    return (
      <div>
        <div className="container">
          <div className="text-center">
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              ACADEMICS AT UHS
            </h3>
            <div className="icon">
              <FontAwesomeIcon icon={faUniversity} />
            </div>
            <div className="title-underline text-center"></div>
          </div>

          <div className="row text-center mt-5">
            <Link className="col-md-6" to="aca">
              <img
                id="homeImage"
                style={{ height: "500px", width: "500px" }}
                src={require("../../images/LearningStage.png")}
              />
              <figcaption className="lead">Click to learn more</figcaption>
            </Link>

            <Link className="col-md-6" to="/achorpage">
              <img
                id="homeImage"
                style={{ height: "500px", width: "500px" }}
                src={require("../../images/anchors.png")}
              />
              <figcaption className="lead">Click to learn more</figcaption>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { carousel } = this.state;

    return (
      <div>
        <Header history={this.props.history} />
        <div>
          <div style={{ backgroundColor: "white" }}>
            {!carousel ? (
              <div className="jumbotron text-center ">
                <h2>Loading....</h2>
              </div>
            ) : (
              <div>
                {this.renderVideo()}
                {this.renderNews()}
              </div>
            )}
          </div>
        </div>
        {this.renderMission()}

        {/* Learning stage */}
        {this.renderLearningStage()}

        {/* Footer */}
        {this.renderFooter()}
      </div>
    );
  }
}

export default Carol;

import React, { Component } from "react";
import { list, listContent } from "./apiAcademics";
import { Link, Redirect, withRouter } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { isAuthenticated } from "../../auth";
import Header from "../header/Header";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faUniversity } from "@fortawesome/free-solid-svg-icons";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {
      color: "#ff9900",
    };
};

class Academics extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      academics: [],
      contents: [],
      url: "",
      docUrl: "",
      redirectToacademics: false,
      redirectToSignIn: false,
    };
  }

  renderUser = () => {
    this.setState({ user: isAuthenticated().user });
  };

  loadacademics = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          academics: data.find((d) => {
            if (d._id == "5e59194d4465c2d4a3afa744") {
              return d;
            }
          }),
        });
      }
    });
  };

  loadContent = () => {
    listContent().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ contents: data });
      }
    });
  };

  componentDidMount() {
    this.loadContent();
    this.loadacademics();
    this.renderUser();
  }

  componentWillReceiveProps() {
    this.renderUser();
  }

  renderContent = (contents) => {
    return (
      <div className="container">
        {contents.map((link, i) => {
          const linkPhoto = link._id ? `/link/photo/${link._id}` : "";

          return (
            <div className="row mb-5" key={i}>
              <div className="col-md-6 ">
                <h2 style={{ fontWeight: "bold" }}>{link.title}</h2>
                <p>{link.body}</p>
                {isAuthenticated().user &&
                isAuthenticated().user.code === 8290 ? (
                  <Link to={`/aca/${link._id}`}>View</Link>
                ) : null}
              </div>

              <div className="col-md-6">
                <img id="acaImg" src={linkPhoto} height="500" width="500" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderCards = () => {
    return (
      <div className="row mb-5 mt-5" style={{ backgroundColor: "white" }}>
        <div className="col-sm-4">
          <Link to={`/rsr`}>
            <Card style={{ width: "18rem" }} id="academicCards">
              <Card.Img
                variant="top"
                id="imgCard"
                style={{ height: "200px", width: "" }}
                src={require("../../images/risers.png")}
              />
              <Card.Header
                id="title"
                className="font-italic mark mt-4"
                style={{ fontWeight: "bold" }}
              >
                RISERS
              </Card.Header>

              <Card.Body id="body">
                <Card.Text id="text">Click here to LEARN more...</Card.Text>
                <Link
                  to={`/rsr`}
                  className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                >
                  Read more
                </Link>
              </Card.Body>
              {/* <Card.Header>
                            <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/RISERLOGO.png")} />
                        </Card.Header> */}
            </Card>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to={`/ivg`}>
            <Card style={{ width: "18rem" }} id="academicCards">
              {/* <Card.Header>
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/invest.png")} />
                    </Card.Header> */}

              <Card.Img
                variant="top"
                id="imgCard"
                style={{ height: "200px", width: "" }}
                src={require("../../images/Investigators.png")}
              />
              <Card.Header
                id="title"
                className="font-italic mark mt-4"
                style={{ fontWeight: "bold" }}
              >
                INVESTIGATORS
              </Card.Header>
              <Card.Body id="body">
                <Card.Text id="text">Click here to LEARN more...</Card.Text>
                <Link
                  to={`/ivg`}
                  className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                >
                  Read more
                </Link>
              </Card.Body>
            </Card>
          </Link>
        </div>

        <div className="col-md-4">
          <Link to={`/nvg`}>
            <Card style={{ width: "18rem" }} id="academicCards">
              {/* <Card.Header>
                        <img id='imgCard' className='text-center' style={{height: '200px', width: '250px'}} src={require("../../images/navi.png")} />
                    </Card.Header> */}

              <Card.Img
                variant="top"
                id="imgCard"
                style={{ height: "200px", width: "" }}
                src={require("../../images/Navigators.png")}
              />
              <Card.Header
                id="title"
                className="font-italic mark mt-4"
                style={{ fontWeight: "bold" }}
              >
                NAVIGATORS
              </Card.Header>

              <Card.Body id="body">
                <Card.Text id="text">Click here to LEARN more...</Card.Text>
                <Link
                  to={`/grade11`}
                  className="btn btn-raised btn-primary btn-sm mb-4 ml-5"
                >
                  Read more
                </Link>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { academics, contents, redirectToSignIn } = this.state;
    const { history } = this.props;

    if (redirectToSignIn) {
      return <Redirect to={`/signin`} />;
    }

    const uhsVideo =
      "https://drive.google.com/file/d/1DmGcmLu_RUtge8SajCu1GSKbXxTCtsoN/preview?ts=sharing";

    return (
      <div>
        <Header history={this.props.history} />
        <div>
          <div id="video">
            <iframe
              width="100%"
              height="430"
              src={uhsVideo}
              allow="autoplay"
            ></iframe>
          </div>
          <h1 style={{ fontWeight: "bold" }} className="text-center mt-5">
            Learning Stages of University High School
          </h1>
          <h4 className="text-center">
            It's more than just surviving it's about{" "}
            <h3 id="thrive">Thriving!</h3>
          </h4>
          <div className="container mb-5">{this.renderCards()}</div>

          {isAuthenticated().user && isAuthenticated().user.code === 8290 ? (
            <div className="mb-3 text-center">
              <Link to={`/content/new`} className="btn btn-raised btn-primary">
                add content
              </Link>
            </div>
          ) : null}

          {isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
            <div className="mb-3 text-center">
              <Link to={`/content/new`} className="btn btn-raised btn-primary">
                add content
              </Link>
            </div>
          ) : null}

          <div className="container mt-5">{this.renderContent(contents)}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Academics);

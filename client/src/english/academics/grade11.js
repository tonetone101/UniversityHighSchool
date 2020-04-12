import React, { Component } from "react";
import { list } from "./apiAcademics";
import { Link, Redirect, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import Header from "../header/Header";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {
      color: "#ff9900"
    };
};

class Grade11 extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      academics: [],
      url: "",
      docUrl: "",
      redirectToacademics: false,
      redirectToSignIn: false
    };
  }

  renderUser = () => {
    this.setState({ user: isAuthenticated().user });
  };

  loadacademics = () => {
    list().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          academics: data.find(d => {
            if (d._id == "5e59194d4465c2d4a3afa744") {
              return d;
            }
          })
        });
      }
    });
  };

  componentDidMount() {
    this.loadacademics();
    this.renderUser();
  }

  componentWillReceiveProps() {
    this.renderUser();
  }

  subMenu = () => {
    const { history } = this.props;

    return (
      <div className="row mt-5">
        <div className="mb-2 mr-3">
          <Link style={isActive(history, "/aca")} to="/aca">
            Academics{" "}
          </Link>
        </div>

        <p style={{ color: "black" }} className="mb-2 mr-3">
          |
        </p>

        <div className="mb-2 mr-3">
          <Link style={isActive(history, "/rsr")} to="/rsr">
            Risers{" "}
          </Link>
        </div>

        <p style={{ color: "black" }} className="mb-2 mr-3">
          |
        </p>

        <div className="mb-2 mr-3">
          <Link style={isActive(history, "/ivg")} className="mt-4" to="/ivg">
            Investigators{" "}
          </Link>
        </div>

        <p style={{ color: "black" }} className="mb-2 mr-3">
          |
        </p>

        <div className="mb-2">
          <Link style={isActive(history, "/nvg")} className="mt-4" to="/nvg">
            Navigators
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { academics, redirectToSignIn } = this.state;
    const { history } = this.props;

    if (redirectToSignIn) {
      return <Redirect to={`/signin`} />;
    }

    return (
      <div id="navigators">
        <Header history={this.props.history} />
        <div className="container">{this.subMenu()}</div>
        <div className="container mt-4">
          <div className="row">
            <img
              className="col-6"
              style={{ height: "500px", width: "500px" }}
              src={require("../../images/Navigators.png")}
            />

            <div className="col-6">
              <h1 style={{ fontWeight: "bold" }}>
                Learning Profile: <h1 style={{ color: "red" }}>Navigators</h1>
              </h1>
              <div id="title" className="container">
                <div className="mt-4">
                  <h3 className="mb-3" style={{ fontWeight: "bold" }}>
                    Our Goal
                  </h3>
                  <p className="mb-3">{academics.grade11Expect}</p>

                  <h3 className="mb-3" style={{ fontWeight: "bold" }}>
                    Our Curriculum
                  </h3>
                  <p className="mb-3">{academics.grade11Curric}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {isAuthenticated().user && isAuthenticated().user.code === 8290 ? (
              <div>
                <Link
                  to={`/update/academics/${academics._id}`}
                  className="btn btn-raised btn-primary"
                >
                  Update Learning Stages
                </Link>
              </div>
            ) : null}

            {isAuthenticated().user && isAuthenticated().user.code === 2609 ? (
              <div>
                <Link
                  to={`/update/academics/${academics._id}`}
                  className="btn btn-raised btn-primary"
                >
                  Update Learning Stages
                </Link>
              </div>
            ) : null}
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(Grade11);

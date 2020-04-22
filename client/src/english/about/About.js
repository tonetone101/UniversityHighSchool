import React, { Component } from "react";
import { list } from "./apiAbout";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated } from "../../auth";
import { Card } from "react-bootstrap";
import Header from "../header/Header";
import SideBar from "../sideBar/SideBar";
import Layout from "./Layout";

class About extends Component {
  state = {
    user: "",
    about: [],
    redirectToHome: false,
    redirectToSignIn: false,
  };

  renderUser = () => {
    this.setState({ user: isAuthenticated().user });
  };

  componentDidMount() {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          about: data.find((d) => {
            if (d._id == "5e8e446fdbe0ea5a89b75411") {
              return d;
            }
          }),
        });
      }
    });
    this.renderUser();
  }

  componentWillReceiveProps() {
    this.renderUser();
  }

  renderAbout = (about) => {
    const photoUrl = about.postedBy
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          about._id
        }?${new Date().getTime()}`
      : "";

    return (
      <div className="container" id="aboutContent">
        <div className="mt-4">
          <h4 id="aboutHeader" style={{ fontWeight: "bold" }}>
            {about.header1}
          </h4>
        </div>

        <div className="mt-4">{about.body}</div>

        <div className="mt-4">
          <h4 id="aboutHeader" style={{ fontWeight: "bold" }}>
            {about.header2}
          </h4>
        </div>

        <div className="mt-4">{about.paragraph2}</div>

        <div className="mt-4">
          <h4 id="aboutHeader" style={{ fontWeight: "bold" }}>
            {about.header3}
          </h4>
        </div>

        <div className="mt-4">{about.paragraph3}</div>

        <div className="mt-4">
          <h4 id="aboutHeader" style={{ fontWeight: "bold" }}>
            {about.header4}
          </h4>
        </div>

        <div className="mt-4">{about.paragraph4}</div>

        <div className="mt-4">
          <h4 id="aboutHeader" style={{ fontWeight: "bold" }}>
            {about.header5}
          </h4>
        </div>

        <div className="mt-4">{about.paragraph5}</div>
      </div>
    );
  };

  render() {
    const { about } = this.state;
    const { history } = this.props;

    return (
      <div>
        <Header history={this.props.history} />
        <Layout
          title="We BELIEVE"
          description="Productive behaviors are the catalyst that forges positive change!"
          className="container-fluid"
        >
          <div className="row container">
            <SideBar />

            <div className="col-md-8">
              {!about ? (
                <div className="jumbotron ">
                  <h2>Loading....</h2>
                </div>
              ) : (
                this.renderAbout(about)
              )}

              <div className="text-center">
                {isAuthenticated() && isAuthenticated().user.code === 8290 && (
                  <Link
                    to={`/edit/about/${about._id}`}
                    className="btn btn-primary mt-4 mb-4"
                  >
                    Update
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default withRouter(About);

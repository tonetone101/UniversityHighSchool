import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Angkors = () => {
  const renderAnkors = () => {
    // const {achor} = this.props

    return (
      <div className="container" id="projects">
        <div className="title text-center mb-5">
          <div>
            <h1 className="text-uppercase" style={{ fontWeight: "bold" }}>
              Learning Anchors
            </h1>
            <div className="icon">
              <FontAwesomeIcon icon={faAnchor} />
            </div>
            <div className="title-underline"></div>
          </div>

          <Link to="/achorpage">
            <img
              className="mb-4 mt-4"
              id="anchor-img"
              style={{ height: "500px", width: "800px", marginTop: "10px" }}
              src={require("../../images/anchors.png")}
            />
            <figcaption>Click to learn more</figcaption>
          </Link>
        </div>
      </div>
    );
  };

  return <div>{renderAnkors()}</div>;
};

export default Angkors;

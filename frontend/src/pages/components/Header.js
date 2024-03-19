import React from "react";
import { Nav } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "../../style/home.scss";
import image from "../assets/images/logo3.png";
function Header() {
  return (
    <div className="containerHeaderHome">
      <Nav defaultActiveKey="/home">
        <Link to="/home">
          <img src={image} alt="Logo de l'application" className="imgHome" />
        </Link>
        <Card.Title className="titleHome">CaloriesC</Card.Title>
      </Nav>
    </div>
  );
}

export default Header;

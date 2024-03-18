import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../style/admin.scss";
import image from "../../assets/images/logo3.png";

function HeaderAuth() {
  return (
    <div className="containerHeaderAuth">
      <Nav defaultActiveKey="/">
        <div className="containerTitle">
          <Link to="/">
            <img src={image} alt="Logo de l'application" className="imgAdmin" />
          </Link>
          <div className="titleHeaderAuth">
            <h1>CaloriesC</h1>
          </div>
        </div>
        <div>
          <span>
            Compter vos nombres de calorie à la journée pour perdre du poids ou
            simplement resterà un poids stable.
          </span>
        </div>
      </Nav>
    </div>
  );
}

export default HeaderAuth;

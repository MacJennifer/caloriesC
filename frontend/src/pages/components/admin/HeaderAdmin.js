import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../../style/admin.scss";
import image from "../../assets/images/logo3.png";

function HeaderAdmin() {
  return (
    <div className="containerHeaderAdmin">
      <Nav defaultActiveKey="/home">
        <Link to="/admin">
          <img src={image} alt="Logo de l'application" className="imgAdmin" />
        </Link>
      </Nav>
    </div>
  );
}

export default HeaderAdmin;

import React from "react";
import { Nav } from "react-bootstrap";
// import "../../styles/style.sccs";

function Sidebar() {
  return (
    <div className="containerSideBar">
      <div className="sidebar">
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link href="/home" className="navBar">
            Accueil
          </Nav.Link>
          <Nav.Link href="/admin/foods" className="navBar">
            Foods
          </Nav.Link>
          <Nav.Link href="/admin/sports" className="navBar">
            Sports
          </Nav.Link>
          <Nav.Link href="/admin/contacts" className="navBar">
            Contacts
          </Nav.Link>
          <Nav.Link href="/admin/users" className="navBar">
            Users
          </Nav.Link>
        </Nav>
      </div>
      <div className="imgBackground">
        <div className="background-image"></div>
      </div>
    </div>
  );
}

export default Sidebar;

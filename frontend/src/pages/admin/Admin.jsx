import React from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import SiderBarAdmin from "../components/admin/SideBarAdmin";
const Admin = () => {
  return (
    <div className="containerAdmin">
      <div>
        <h1>Page Admin</h1>
        <HeaderAdmin />
      </div>

      <SiderBarAdmin />
    </div>
  );
};

export default Admin;

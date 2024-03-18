import React from "react";
import HeaderAdmin from "../components/admin/HeaderAdmin";
import SiderBarAdmin from "../components/admin/SideBarAdmin";
const Admin = () => {
  return (
    <div className="containerAdminAll">
      <div className="containerAdmin">
        <div>
          <HeaderAdmin />
          <div className="containerSideBarAdmin">
            <SiderBarAdmin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;

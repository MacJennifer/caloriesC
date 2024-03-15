// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import AddFoodAdmin from "./pages/admin/foods/AddFoodAdmin";
import EditFoodAdmin from "./pages/admin/foods/EditFoodAdmin";
import FoodsAdmin from "./pages/admin/foods/FoodsAdmin";
import Login from "./pages/auth/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/foods" element={<FoodsAdmin />} />
        <Route
          path="/admin/editFoodAdmin/:foodId"
          element={<EditFoodAdmin />}
        />
        <Route path="/admin/addFoodAdmin" element={<AddFoodAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

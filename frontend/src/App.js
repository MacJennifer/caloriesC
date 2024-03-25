// import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/admin/Admin";
import ContactsAdmin from "./pages/admin/contacts/ContactsAdmin";
import AddFoodAdmin from "./pages/admin/foods/AddFoodAdmin";
import EditFoodAdmin from "./pages/admin/foods/EditFoodAdmin";
import FoodsAdmin from "./pages/admin/foods/FoodsAdmin";
import AddSportAdmin from "./pages/admin/sports/AddSportAdmin";
import EditSportAdmin from "./pages/admin/sports/EditSportAdmin";
import SportsAdmin from "./pages/admin/sports/SportsAdmin";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AddMeal from "./pages/utilisateur/meals/AddMeal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/addMeal/:typeMeal" element={<AddMeal />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/contacts" element={<ContactsAdmin />} />
        <Route path="/admin/users" element={<UsersAdmin />} />
        <Route path="/admin/foods" element={<FoodsAdmin />} />
        <Route
          path="/admin/editFoodAdmin/:foodId"
          element={<EditFoodAdmin />}
        />
        <Route path="/admin/addFoodAdmin" element={<AddFoodAdmin />} />
        <Route path="/admin/sports" element={<SportsAdmin />} />
        <Route
          path="/admin/editSportAdmin/:sportId"
          element={<EditSportAdmin />}
        />
        <Route path="/admin/addSportAdmin" element={<AddSportAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

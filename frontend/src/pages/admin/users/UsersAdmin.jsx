import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Sidebar from "../../components/admin/SideBarAdmin";
import ButtonDelete from "../../components/admin/buttons/ButtonDeleteAdmin";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(
          "http://127.0.0.1:8000/api/users"
        );
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${userId}`);
      // Supprimer l'utilisateur
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  return (
    <div className="containerAdminAll">
      <div className="containerAdmin">
        <HeaderAdmin />
        <div className="containerFoodSideBar">
          <div className="containerSideBarAdmin">
            <Sidebar />
          </div>

          <div className="row">
            {users.map((user) => (
              <div className="col-md-3" key={user.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <p>Pseudo : {user.pseudo}</p>
                    <p>Email : {user.email}</p>
                    <ButtonDelete onClick={() => handleDelete(user.id)} />
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Sidebar from "../../components/admin/SideBarAdmin";

import ButtonDelete from "../../components/admin/buttons/ButtonDeleteAdmin";

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const sportsResponse = await axios.get(
          "http://127.0.0.1:8000/api/contacts"
        );
        setContacts(sportsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:8000/api/contacts/${contactId}`);
      // Supprimer le message
      setContacts(contacts.filter((contact) => contact.id !== contactId));
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
            {contacts.map((contact) => (
              <div className="col-md-3" key={contact.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <p>Nom : {contact.lastname}</p>
                    <p>Prénom : {contact.firstname}</p>
                    <p>Email : {contact.emailContact}</p>
                    <p>Message : {contact.message}</p>
                    <ButtonDelete onClick={() => handleDelete(contact.id)} />
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

export default ContactsAdmin;

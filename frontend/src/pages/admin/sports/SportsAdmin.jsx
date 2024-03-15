import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Sidebar from "../../components/admin/SideBarAdmin";
import ButtonAdd from "../../components/admin/buttons/ButtonAddAdmin";
import ButtonDelete from "../../components/admin/buttons/ButtonDeleteAdmin";
import ButtonEdit from "../../components/admin/buttons/ButtonEditAdmin";

const SportsAdmin = () => {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportsResponse = await axios.get(
          "http://127.0.0.1:8000/api/sports"
        );
        setSports(sportsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchSports();
  }, []);

  const handleDelete = async (sportId) => {
    try {
      await axios.delete(`http://localhost:8000/api/sports/${sportId}`);
      // Supprimer le sport
      setSports(sports.filter((sport) => sport.id !== sportId));
    } catch (error) {
      console.error("Error deleting sport:", error);
    }
  };
  return (
    <div className="containerAdminAll">
      <div className="containerAdmin">
        <HeaderAdmin />
        <div className="containerSportsSideBar">
          <div className="containerSideBarAdmin">
            <Sidebar />
          </div>

          <div className="row">
            <ButtonAdd go={`/admin/addSportAdmin/`} />
            {sports.map((sport) => (
              <div className="col-md-3" key={sport.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="nameSports">
                      {sport.nameSports}
                    </Card.Title>
                    <p>Met : {sport.met}</p>
                    <ButtonEdit go={`/admin/editSportAdmin/${sport.id}`} />
                    <ButtonDelete onClick={() => handleDelete(sport.id)} />
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

export default SportsAdmin;

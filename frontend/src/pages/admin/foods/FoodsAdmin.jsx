import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import HeaderAdmin from "../../components/admin/HeaderAdmin";
import Sidebar from "../../components/admin/SideBarAdmin";
import ButtonAdd from "../../components/admin/buttons/ButtonAddAdmin";
import ButtonDelete from "../../components/admin/buttons/ButtonDeleteAdmin";
import ButtonEdit from "../../components/admin/buttons/ButtonEditAdmin";

const FoodsAdmin = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsResponse = await axios.get(
          "http://127.0.0.1:8000/api/foods"
        );
        setFoods(foodsResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchFoods();
  }, []);

  const handleDelete = async (foodId) => {
    try {
      await axios.delete(`http://localhost:8000/api/foods/${foodId}`);
      // Supprimer l'aliment
      setFoods(foods.filter((food) => food.id !== foodId));
    } catch (error) {
      console.error("Error deleting food:", error);
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
            <ButtonAdd go={`/admin/addFoodAdmin/`} />
            {foods.map((food) => (
              <div className="col-md-3" key={food.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="titleCard">
                      {food.nameFoods}
                    </Card.Title>
                    <p>Gras : {food.fats}</p>
                    <p>Glucides : {food.carbohydrates}</p>
                    <p>Fibres : {food.fibers}</p>
                    <p>Proteines: {food.proteins}</p>
                    <p>Sel : {food.salts}</p>
                    <p>Pour 100gr</p>
                    <ButtonEdit go={`/admin/editFoodAdmin/${food.id}`} />
                    <ButtonDelete onClick={() => handleDelete(food.id)} />
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

export default FoodsAdmin;

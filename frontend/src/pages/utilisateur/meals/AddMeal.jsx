import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
const AddMeal = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});
  const [quantity, setQuantity] = useState("");
  const [food_id, setFoodId] = useState("");
  const [foods, setFoods] = useState([]);
  const [calories, setCalories] = useState(0);

  const handleChange = (event) => {
    setFoodId(event.target.value);
  };

  useEffect(() => {
    getFoods();
  }, []);
  useEffect(() => {
    if (quantity && food_id) {
      calculateCalories();
    }
  }, [quantity, food_id]);

  const getFoods = async () => {
    await axios.get("http://127.0.0.1:8000/api/foods").then((res) => {
      console.log(res.data);
      setFoods(res.data);
    });
  };

  const calculateCalories = async () => {
    // Récupérer les détails de l'aliment depuis l'API
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/foods/${food_id}`
      );
      const selectedFood = response.data;

      // Obtenir la valeur de quantityDefault
      const fats = selectedFood.fats;
      const carbohydrates = selectedFood.carbohydrates;
      const proteins = selectedFood.proteins;
      const calculCalorieFats = fats * 9;
      const calculCalorieCarbohydrates = carbohydrates * 4;
      const calculCalorieProteins = proteins * 4;
      const totalCalorie =
        calculCalorieFats + calculCalorieCarbohydrates + calculCalorieProteins;
      let calculatedCalories = (totalCalorie * parseInt(quantity)) / 100;
      console.log("resultat calcul", calculatedCalories);
      calculatedCalories = Math.round(calculatedCalories);

      // Mettre à jour l'état des calories
      setCalories(calculatedCalories);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'aliment :",
        error
      );
    }
  };

  const addMeals = async (e) => {
    e.preventDefault();

    // Appeler calculateCalories pour mettre à jour les calories
    await calculateCalories();
    console.log("Form data:", { quantity, food_id, calories });
    const formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("calories", calories);
    formData.append("food_id", food_id);

    // Obtenir l'id de l'utilisateur à partir des données de l'aliment
    const selectedFood = foods.find((food) => food.id === parseInt(food_id));
    const userId = selectedFood.user_id;
    formData.append("user_id", userId);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Creation d'un nouvel aliment
      await axios.post(`http://127.0.0.1:8000/api/meals`, formData, config);
      // création validée on retourne à la page foods
      navigate("/home");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <div className="containerAddGame">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body ">
                <h4 className="card-title">Ajouter un aliment </h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={addMeals}>
                    <Row>
                      <Col>
                        <Form.Group controlId="quantity">
                          <Form.Label>Quantité (en grammes)</Form.Label>
                          <Form.Control
                            type="text"
                            value={quantity}
                            onChange={(event) => {
                              setQuantity(event.target.value);
                              setCalories(0);
                            }}
                            onBlur={calculateCalories}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="foods">
                          <Form.Label>Aliment</Form.Label>
                          <Form.Control
                            as="select"
                            value={food_id}
                            onChange={handleChange}
                          >
                            <option value="">Sélectionnez un aliment</option>
                            {foods.map((food) => (
                              <option key={food.id} value={food.id}>
                                {food.nameFoods}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="calories">
                          <Form.Label>Calories</Form.Label>
                          <Form.Control type="text" value={calories} readOnly />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;

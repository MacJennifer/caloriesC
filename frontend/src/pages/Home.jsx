import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import TraitOrange from "./components/TraitOrange";
const Home = () => {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [breakfastMeals, setBreakfastMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [snackMeals, setSnackMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsResponse = await axios.get(
          "http://127.0.0.1:8000/api/meals"
        );
        const mealsData = mealsResponse.data;

        // Récupérer les informations sur les aliments associés à chaque repas
        const foodIds = mealsData.map((meal) => meal.food_id);
        const foodsResponse = await axios.get(
          `http://127.0.0.1:8000/api/foods?ids=${foodIds.join(",")}`
        );
        const foodsData = foodsResponse.data;

        // Créer un objet indexé par l'ID de l'aliment pour faciliter l'accès
        const foodsById = {};
        foodsData.forEach((food) => {
          foodsById[food.id] = food;
        });

        // Mettre à jour les repas avec les informations sur les aliments
        const mealsWithFoodInfo = mealsData.map((meal) => ({
          ...meal,
          food: foodsById[meal.food_id] || null, // Assigner les informations sur l'aliment, ou null si non trouvé
        }));

        setMeals(mealsWithFoodInfo);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    // Filtrer les repas par type et les stocker dans les états appropriés
    const breakfast = filteredMeals.filter(
      (meal) => meal.typeMeals === "breakfast"
    );
    const lunch = filteredMeals.filter((meal) => meal.typeMeals === "lunch");
    const dinner = filteredMeals.filter((meal) => meal.typeMeals === "dinner");
    const snack = filteredMeals.filter((meal) => meal.typeMeals === "snack");

    setBreakfastMeals(breakfast);
    setLunchMeals(lunch);
    setDinnerMeals(dinner);
    setSnackMeals(snack);
  }, [filteredMeals]);

  // Filtrer les repas en fonction de la date sélectionnée
  useEffect(() => {
    const filtered = meals.filter((meal) => {
      const mealDate = new Date(meal.mealDate);
      return mealDate.toDateString() === selectedDate.toDateString();
    });
    setFilteredMeals(filtered);
  }, [meals, selectedDate]);

  // Fonction de gestion du changement de date
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="containerHome">
      <Header />
      <Navigation />
      <Calendar onDateChange={handleDateChange} />
      <Card.Title className="titleMeals">Les Repas</Card.Title>
      <div className="meals">
        <div className="breakfast">
          <Link to="/addMeal/breakfast">
            <h3>Petit déjeuner</h3>
          </Link>
          <TraitOrange width="180px" height="2px" margin="10px auto" />
          {breakfastMeals.map((meal) => (
            <div key={meal.id} className="mealBreakfast">
              <p>{meal.food ? meal.food.nameFoods : "N/A"}</p>
              <p>{meal.quantity} gr</p>
              <p>{meal.calories} calories</p>
            </div>
          ))}
        </div>
        <div className="lunch">
          <Link to="/addMeal/lunch">
            <h3>Déjeuner</h3>
          </Link>
          <TraitOrange width="120px" height="2px" margin="10px auto" />
          {lunchMeals.map((meal) => (
            <div key={meal.id} className="mealLunch">
              <p>{meal.food ? meal.food.nameFoods : "N/A"}</p>
              <p>{meal.quantity} gr</p>
              <p>{meal.calories} calories</p>
            </div>
          ))}
        </div>
        <div className="snack">
          <Link to="/addMeal/snack">
            <h3>Encas</h3>
          </Link>
          <TraitOrange width="70px" height="2px" margin="10px auto" />
          {snackMeals.map((meal) => (
            <div key={meal.id} className="mealSnack">
              <p>{meal.food ? meal.food.nameFoods : "N/A"}</p>
              <p>{meal.quantity} gr</p>
              <p>{meal.calories} calories</p>
            </div>
          ))}
        </div>
        <div className="dinner">
          <Link to="/addMeal/dinner">
            <h3>Dîner</h3>
          </Link>
          <TraitOrange width="70px" height="2px" margin="10px auto" />
          {dinnerMeals.map((meal) => (
            <div key={meal.id} className="mealDinner">
              <p>{meal.food ? meal.food.nameFoods : "N/A"}</p>
              <p>{meal.quantity} gr</p>
              <p>{meal.calories} calories</p>
            </div>
          ))}
        </div>
      </div>
      <Card.Title className="titleActivity">Activité Physique</Card.Title>
      <Footer />
    </div>
  );
};

export default Home;

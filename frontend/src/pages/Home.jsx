import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import auth from "../pages/services/token";
import Calendar from "./components/Calendar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import TraitOrange from "./components/TraitOrange";
const Home = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [breakfastMeals, setBreakfastMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [dinnerMeals, setDinnerMeals] = useState([]);
  const [snackMeals, setSnackMeals] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [duration, setDuration] = useState("");
  const [calculatedResult, setCalculatedResult] = useState(0);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (!auth.isLoggedIn()) {
          navigate("/login");
          return;
        }

        const userId = auth.getDecodedToken().sub; // Récupérer l'ID de l'utilisateur connecté
        console.log(userId);
        const mealsResponse = await axios.get(
          `http://127.0.0.1:8000/api/meals?userId=${userId}`
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

  ////////////////////////SPORT
  const handleSportChange = (event) => {
    setSelectedSport(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = auth.getToken();
    if (!token) {
      // Gérer le cas où l'utilisateur n'est pas connecté
      console.log("L'utilisateur n'est pas connecté.");
      // Rediriger l'utilisateur vers la page de connexion
      navigate("/login");
      return;
    }

    const userId = auth.getDecodedToken().sub;

    // Récupérer le poids de l'utilisateur depuis l'API
    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}`)
      .then((response) => {
        console.log("Réponse de l'API :", response);
        const weight = response.data.user.weight;
        console.log(weight);
        // Récupérer le MET du sport sélectionné depuis l'API
        axios
          .get(`http://127.0.0.1:8000/api/sports/${selectedSport}`)
          .then((sportResponse) => {
            const met = sportResponse.data.met;

            // Calculer le résultat
            const result = weight * met * duration;
            console.log(weight, met, duration);
            console.log(result);
            setCalculatedResult(result);
            // Envoi des données au backend Laravel
            axios
              .post("http://127.0.0.1:8000/api/useractivity", {
                user_id: userId,
                sport_id: selectedSport,
                duration: duration,
                caloriesburned: calculatedResult,
              })
              .then((response) => {
                console.log(
                  "Activité physique enregistrée avec succès :",
                  response.data
                );
              })
              .catch((error) => {
                console.error(
                  "Erreur lors de l'enregistrement de l'activité physique :",
                  error
                );
              });
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération du MET du sport :",
              error
            );
          });
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération du poids de l'utilisateur :",
          error
        );
      });
  };
  useEffect(() => {
    // Récupération des sports depuis l'API
    axios
      .get("http://127.0.0.1:8000/api/sports")
      .then((response) => {
        setSports(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des sports :", error);
      });
  }, []);
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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sportSelect">Sport :</label>
          <select
            id="sportSelect"
            className="form-control"
            value={selectedSport}
            onChange={handleSportChange}
          >
            <option value="">Sélectionnez un sport</option>

            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.nameSports}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="durationInput">Durée (en minutes) :</label>
          <input
            type="number"
            id="durationInput"
            className="form-control"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        <div>
          <p>Calories brûlées : {calculatedResult}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Valider
        </button>
      </form>
      <Footer />
    </div>
  );
};
export default Home;

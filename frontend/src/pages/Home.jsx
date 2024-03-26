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
  const [userActivity, setUserActivity] = useState([]);
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        if (!auth.isLoggedIn()) {
          navigate("/login");
          return;
        }

        const userId = auth.getDecodedToken().sub; // Récupérer l'ID de l'utilisateur connecté

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

    if (duration && event.target.value) {
      calculateAndSetResult(event.target.value, duration);
    }
  };

  const handleDurationChange = (event) => {
    const durationValue = event.target.value;
    setDuration(durationValue);

    // durée vide mettre à jour les calories brûlées à 0
    if (!durationValue || durationValue === "") {
      setCalculatedResult(0);
      return;
    }

    // durée et le sport sélectionnés, calculer et mettre à jour les calories brûlées
    if (selectedSport && durationValue) {
      calculateAndSetResult(selectedSport, durationValue);
    }
  };

  const calculateResult = (weight, met, duration) => {
    return weight * met * duration;
  };
  const calculateAndSetResult = (sport, duration) => {
    const userId = auth.getDecodedToken().sub;

    axios
      .get(`http://127.0.0.1:8000/api/users/${userId}`)
      .then((response) => {
        const weight = response.data.user.weight;

        axios
          .get(`http://127.0.0.1:8000/api/sports/${sport}`)
          .then((sportResponse) => {
            const met = sportResponse.data.met;

            // Calculer le résultat en utilisant la fonction calculateResult
            const result = calculateResult(weight, met, duration);
            setCalculatedResult(result);
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = auth.getToken();
    if (!token) {
      console.log("L'utilisateur n'est pas connecté.");
      navigate("/login");
      return;
    }

    const userId = auth.getDecodedToken().sub;

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
        console.log(response.data);
        setUserActivity([
          ...userActivity,
          {
            ...response.data,
            duration: duration,
            caloriesburned: calculatedResult,
            sport: selectedSport,
          },
        ]);
        setSelectedSport("");
        setDuration("");
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'enregistrement de l'activité physique :",
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
      <form onSubmit={handleSubmit} className="userActivity">
        <div className="sport">
          <label htmlFor="sportSelect">Sport :</label>
          <select
            id="sportSelect"
            className="selectSports"
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
        <div className="duration">
          <label htmlFor="durationInput">Durée (en minutes) :</label>
          <input
            type="number"
            id="durationInput"
            className="inputDuration"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        <button type="submit" className="btn">
          Valider
        </button>
      </form>
      <div className="totalUserActivity">
        {userActivity.map((activity, index) => {
          // Convertir activity.sport_id en nombre
          const sportId = parseInt(activity.sport, 10);

          // Recherchez le sport dans le tableau `sports` en comparant les IDs
          const sport = sports.find((sport) => sport.id === sportId);
          console.log("Sport trouvé :", sport.nameSports);
          return (
            <div className="sportActivity">
              <p>{sport ? sport.nameSports : "Sport inconnu"}</p>
              <p>{activity.duration} minutes</p>

              <p>{activity.caloriesburned} Calories brûlées</p>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
export default Home;

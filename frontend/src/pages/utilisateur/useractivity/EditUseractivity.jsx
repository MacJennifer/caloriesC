import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../services/token";
const EditUseractivity = () => {
  const { userActivityId } = useParams();

  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [duration, setDuration] = useState("");
  const [caloriesburned, setCaloriesburned] = useState("");
  // const [user_id, setUserId] = useState("");
  const [sport_id, setSportId] = useState("");
  const [sports, setSports] = useState([]);
  const calculateResult = (weight, met, duration) => {
    return weight * met * duration;
  };
  useEffect(() => {
    getUseractivity();
    getSports();
  }, []);

  useEffect(() => {
    if (duration && sport_id) {
      calculateAndSetResult(sport_id, duration);
    }
  }, [duration, sport_id]);

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
            setCaloriesburned(result);
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
  const getUseractivity = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/useractivity/${userActivityId}`
      );
      console.log("Response data:", response.data);
      if (response.data.length > 0) {
        const { duration, caloriesburned, sport_id } = response.data[0];
        setDuration(duration);
        setCaloriesburned(caloriesburned);
        // setUserId(user_id);
        setSportId(sport_id);
      }
    } catch (error) {
      console.error("Error fetching userActivity:", error);
    }
  };
  const handleChange = (event) => {
    setSportId(event.target.value);
  };
  const getSports = async () => {
    await axios.get("http://127.0.0.1:8000/api/sports").then((res) => {
      setSports(res.data);
    });
  };

  const updateUseractivity = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("duration", duration);
    formData.append("caloriesburned", caloriesburned);
    formData.append("sports", sports);
    formData.append("sport_id", sport_id);
    // formData.append("user_id", user_id);

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/useractivity/${userActivityId}`,
        formData
      );

      navigate("/home");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Error updating userActivity:", error);
      }
    }
  };

  return (
    <div>
      <div className="containerEditUserActivity">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h4 className="card-title">Modifier une activité</h4>
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
                  <Form onSubmit={updateUseractivity}>
                    <Row>
                      <Col>
                        <Form.Group controlId="duration">
                          <Form.Label>Durée</Form.Label>
                          <Form.Control
                            type="text"
                            value={duration}
                            onChange={(event) => {
                              setDuration(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="useractivity">
                          <Form.Control
                            as="select"
                            value={sport_id}
                            onChange={handleChange}
                          >
                            <option value="">
                              Veuillez sélectionner un sport
                            </option>
                            {sports.map((sport) => (
                              <option key={sport.id} value={sport.id}>
                                {sport.nameSports}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="caloriesburned">
                          <Form.Label>Calories brûlées</Form.Label>
                          <p>{caloriesburned}</p>
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
                      Modifier
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

export default EditUseractivity;

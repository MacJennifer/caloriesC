import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import auth from "../../services/token";

const AddSportAdmin = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [nameSports, setNameSports] = useState("");
  const [met, setMet] = useState("");

  const addSports = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nameSports", nameSports);
    formData.append("met", met);

    try {
      // Récupérer le token JWT de l'utilisateur connecté
      const token = auth.getToken();

      // Vérifier si l'utilisateur est connecté
      if (!token) {
        // Gérer le cas où l'utilisateur n'est pas connecté
        console.log("L'utilisateur n'est pas connecté.");
        // Rediriger l'utilisateur vers la page de connexion
        navigate("/login");
        return;
      }

      // Configurer les en-têtes de la requête avec le token JWT
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      //Creation d'un nouvel aliment
      await axios.post(`http://127.0.0.1:8000/api/sports`, formData, config);
      //création validé on retour à la page sports
      navigate("/admin/sports");
    } catch (error) {
      // Si une erreur
      console.log(error.response);
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      }
    }
  };
  return (
    <div>
      <div className="containerAddSportAdmin">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body ">
                <h4 className="card-title">Ajout d'un aliment</h4>
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

                  <Form onSubmit={addSports}>
                    <Row>
                      <Col>
                        <Form.Group controlId="nameSports">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameSports}
                            onChange={(event) => {
                              setNameSports(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="met">
                          <Form.Label>Met : </Form.Label>
                          <Form.Control
                            type="text"
                            value={met}
                            onChange={(event) => {
                              setMet(event.target.value);
                            }}
                          />
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

export default AddSportAdmin;

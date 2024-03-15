import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";

const EditFoodAdmin = () => {
  const { foodId } = useParams();

  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [nameFoods, setNameFoods] = useState("");
  const [fats, setFats] = useState("");
  const [carbohydrates, setCarbohydrate] = useState("");
  const [fibers, setFibers] = useState("");
  const [proteins, setProteins] = useState("");
  const [salts, setSalts] = useState("");

  useEffect(() => {
    getFood();
  }, []);

  const getFood = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/foods/${foodId}`
      );
      const { nameFoods, fats, carbohydrates, fibers, proteins, salts } =
        response.data;
      setNameFoods(nameFoods);
      setFats(fats);
      setCarbohydrate(carbohydrates);
      setFibers(fibers);
      setProteins(proteins);
      setSalts(salts);
    } catch (error) {
      console.error("Error fetching food:", error);
    }
  };

  const updatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("nameFoods", nameFoods);
    formData.append("fats", fats);
    formData.append("carbohydrates", carbohydrates);
    formData.append("fibers", fibers);
    formData.append("proteins", proteins);
    formData.append("salts", salts);

    try {
      await axios.post(`http://127.0.0.1:8000/api/foods/${foodId}`, formData);
      navigate("/admin/foods");
    } catch (error) {
      if (error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Error updating food:", error);
      }
    }
  };

  return (
    <div>
      <div className="containerEditFoodAdmin">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h4 className="card-title">Modifier un aliment</h4>
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
                  <Form onSubmit={updatePlace}>
                    <Row>
                      <Col>
                        <Form.Group controlId="nameFoods">
                          <Form.Label>Titre</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameFoods}
                            onChange={(event) => {
                              setNameFoods(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="fats">
                          <Form.Label>Gras</Form.Label>
                          <Form.Control
                            type="text"
                            value={fats}
                            onChange={(event) => {
                              setFats(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="carbohydrates">
                          <Form.Label>Glucides</Form.Label>
                          <Form.Control
                            type="text"
                            value={carbohydrates}
                            onChange={(event) => {
                              setCarbohydrate(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="fibers">
                          <Form.Label>Fibres</Form.Label>
                          <Form.Control
                            type="text"
                            value={fibers}
                            onChange={(event) => {
                              setFibers(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="proteins">
                          <Form.Label>Proteines</Form.Label>
                          <Form.Control
                            type="text"
                            value={proteins}
                            onChange={(event) => {
                              setProteins(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="salts">
                          <Form.Label>Sel</Form.Label>
                          <Form.Control
                            type="text"
                            value={salts}
                            onChange={(event) => {
                              setSalts(event.target.value);
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

export default EditFoodAdmin;

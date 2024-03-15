import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";

const EditSportAdmin = () => {
  const { sportId } = useParams();

  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const [nameSports, setNameSports] = useState("");
  const [met, setMet] = useState("");

  useEffect(() => {
    getSport();
  }, []);

  const getSport = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/sports/${sportId}`
      );
      const { nameSports, met } = response.data;
      setNameSports(nameSports);
      setMet(met);
    } catch (error) {
      console.error("Error fetching sport:", error);
    }
  };

  const updatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("_method", "PATCH");
    formData.append("nameSports", nameSports);
    formData.append("met", met);

    try {
      await axios.post(`http://127.0.0.1:8000/api/sports/${sportId}`, formData);
      navigate("/admin/sports");
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
      <div className="containerEditSportAdmin">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <h4 className="card-title">Modifier un sport</h4>
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
                        <Form.Group controlId="nameSports">
                          <Form.Label>Titre</Form.Label>
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
                          <Form.Label>Gras</Form.Label>
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

export default EditSportAdmin;

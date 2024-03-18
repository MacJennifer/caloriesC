import axios from "axios";
import { useState } from "react";
// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
import { Button, Col, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  document.title = "Inscription au site";

  let navigate = useNavigate();

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const pseudo = watch("pseudo", "");
  const email = watch("email", "");
  const password = watch("password", "");
  const sexe = watch("sexe", "");
  const age = watch("age", "");
  const size = watch("size", "");
  const weight = watch("weight", "");
  const objective = watch("objective", "");
  const activity = watch("activity", "");
  const role_id = watch("role_id", "1");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e) => registerForm();

  let registerForm = async () => {
    try {
      // console.log("Valeurs des champs :", email, pseudo);
      let formData = new FormData();
      formData.append("pseudo", pseudo);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("sexe", sexe);
      formData.append("age", age);
      formData.append("size", size);
      formData.append("weight", weight);
      formData.append("objective", objective);
      formData.append("activity", activity);
      formData.append("role_id", role_id);

      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      let res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Réponse du serveur :", res);
      if (res.status === 200) {
        localStorage.setItem("access_token", res.data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 422) {
        setError("Email déjà utilisé.");
      } else {
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerRegister">
      <div className="formRegister">
        <Card.Body>
          <Card.Title className="titleRegister">Incription</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/*********************************************** section email ********************************************************/}
            <Form.Group controlId="formBasicEmail">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Adresse mail obligatoire" }}
                render={({ field }) => (
                  <Form.Control
                    type="email"
                    placeholder="johndoe@unknown.fr"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  {errors.email.message}
                </Form.Text>
              )}
            </Form.Group>
            {/****************************************** section password ********************************************************/}
            <Form.Group>
              <InputGroup>
                <InputGroup.Text>
                  <i onClick={handleClickShowPassword}>
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiTwotoneEyeInvisible />
                    )}
                  </i>
                </InputGroup.Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Mot de passe est obligatoire",
                    minLength: {
                      value: 8,
                      message: "Longueur minimale de 8 caractères",
                    },
                    pattern: {
                      value:
                        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#:$%^&])/,
                      message:
                        "Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et un caractère spécial",
                    },
                  }}
                  render={({ field }) => (
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Mot de passe"
                      {...field}
                    />
                  )}
                />
              </InputGroup>
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            {/************************************** section sexe ********************************************************/}

            <Form.Group>
              <Row>
                <Col>
                  <Controller
                    name="sexe"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="homme"
                        label="Homme"
                        value="homme"
                        checked={field.value === "homme"}
                        onChange={() => field.onChange("homme")}
                      />
                    )}
                  />
                </Col>
                <Col>
                  <Controller
                    name="sexe"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="femme"
                        label="Femme"
                        value="femme"
                        checked={field.value === "femme"}
                        onChange={() => field.onChange("femme")}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            {/*************************************************** section age ********************************************************/}
            <Form.Group>
              <Controller
                name="age"
                control={control}
                defaultValue=""
                rules={{ required: "age obligatoire" }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Votre âge"
                    {...field}
                  />
                )}
              />
              {errors.age && (
                <Form.Text className="text-danger">
                  {errors.age.message}
                </Form.Text>
              )}
            </Form.Group>
            {/************************************************* section size ********************************************************/}
            <Form.Group>
              <Row>
                <Col>
                  <Controller
                    name="size"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Taille obligatoire" }}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder=" Taille"
                        {...field}
                      />
                    )}
                  />
                  {errors.size && (
                    <Form.Text className="text-danger">
                      {errors.size.message}
                    </Form.Text>
                  )}
                </Col>
                {/*********************************************** section weight ********************************************************/}
                <Col>
                  <Controller
                    name="weight"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Poids obligatoire" }}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder=" Poids"
                        {...field}
                      />
                    )}
                  />
                  {errors.weight && (
                    <Form.Text className="text-danger">
                      {errors.weight.message}
                    </Form.Text>
                  )}
                </Col>
              </Row>
            </Form.Group>
            {/****************************************** section objective ********************************************************/}
            <Form.Group>
              <Row>
                <Col>
                  <Controller
                    name="objective"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="perte de poids"
                        label="perte de poids"
                        value="perte de poids"
                        checked={field.value === "perte de poids"}
                        onChange={() => field.onChange("perte de poids")}
                      />
                    )}
                  />
                </Col>
                <Col>
                  <Controller
                    name="objective"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="stabilite du poids"
                        label="stabilite du poids"
                        value="stabilite du poids"
                        checked={field.value === "stabilite du poids"}
                        onChange={() => field.onChange("stabilite du poids")}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>

            {/*********************************************** section activity ********************************************************/}
            <Form.Group>
              <Form.Label>Votre activité de base</Form.Label>
              <Row>
                <Col>
                  <Controller
                    name="activity"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="pas-actif"
                        label="pas actif"
                        value="pas actif"
                        checked={field.value === "pas actif"}
                        onChange={() => field.onChange("pas actif")}
                      />
                    )}
                  />
                </Col>
                <Col>
                  <Controller
                    name="activity"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="peu-actif"
                        label="peu actif"
                        value="peu actif"
                        checked={field.value === "peu actif"}
                        onChange={() => field.onChange("peu actif")}
                      />
                    )}
                  />
                </Col>
                <Col>
                  <Controller
                    name="activity"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Form.Check
                        type="radio"
                        id="actif"
                        label="actif"
                        value="actif"
                        checked={field.value === "actif"}
                        onChange={() => field.onChange("actif")}
                      />
                    )}
                  />
                </Col>
              </Row>
            </Form.Group>
            {/*********************************************** section pseudo ********************************************************/}
            <Form.Group>
              <Controller
                name="pseudo"
                control={control}
                defaultValue=""
                rules={{ required: "Pseudo obligatoire" }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Votre pseudo"
                    {...field}
                  />
                )}
              />
              {errors.pseudo && (
                <Form.Text className="text-danger">
                  {errors.pseudo.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="dark" type="submit" className="w-100 mt-3">
              Créer un compte
            </Button>
          </Form>
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Card.Body>
      </div>
    </div>
  );
}

export default RegisterForm;

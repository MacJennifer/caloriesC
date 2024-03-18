import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "../../../style/auth.scss";
import auth from "../../services/token";
import HeaderAuth from "./HeaderAuth";

function LoginForm() {
  document.title = "Connexion au site";

  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      let formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      let res = await axios.post("http://127.0.0.1:8000/api/login/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // console.log(res);
      if (res.status === 200) {
        auth.saveToken(res.data.data.auth.token);

        navigate("/home", { replace: true });
      }
    } catch (err) {
      // Gérer les erreurs
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="containerLogin">
      <HeaderAuth />
      <div className="formLogin">
        <Card.Body>
          <Card.Title className="titleLogin">Connexion</Card.Title>
          <Form onSubmit={handleSubmit(login)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="labelLogin">Adresse mail</Form.Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: "Mail obligatoire" }}
                render={({ field }) => (
                  <>
                    <Form.Control
                      type="email"
                      placeholder="johndoe@unknown.fr"
                      {...field}
                    />
                    {errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email.message}
                      </Form.Text>
                    )}
                  </>
                )}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="labelLogin">Mot de passe</Form.Label>
              <InputGroup>
                <InputGroup.Text onClick={handleClickShowPassword}>
                  {showPassword ? <AiOutlineEye /> : <AiTwotoneEyeInvisible />}
                </InputGroup.Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Mot de passe est obligatoire" }}
                  render={({ field }) => (
                    <>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        {...field}
                      />
                      {errors.password && (
                        <Form.Text className="text-danger">
                          {errors.password.message}
                        </Form.Text>
                      )}
                    </>
                  )}
                />
              </InputGroup>
            </Form.Group>

            <Button variant="dark" type="submit" className="w-100">
              Se connecter
            </Button>
            <div>
              <Link to="/register" className="createAccountLogin">
                Créer un compte
              </Link>
            </div>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}

export default LoginForm;

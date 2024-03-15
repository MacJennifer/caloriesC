import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function ButtonAdd({ go }) {
  return (
    <>
      <Link to={go}>
        <Button variant="primary">Créer</Button>
      </Link>{" "}
    </>
  );
}

export default ButtonAdd;

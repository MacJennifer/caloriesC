import Button from "react-bootstrap/Button";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function ButtonEdit({ go }) {
  return (
    <>
      <Link to={go}>
        <Button className="buttonEdit">
          <FaEdit />
        </Button>
      </Link>{" "}
    </>
  );
}

export default ButtonEdit;

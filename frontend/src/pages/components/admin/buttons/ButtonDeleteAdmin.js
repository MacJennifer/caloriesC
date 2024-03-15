import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";

const ButtonDelete = ({ onClick }) => {
  return (
    <Button className="buttonDelete" onClick={onClick}>
      <FaTrash />
    </Button>
  );
};

export default ButtonDelete;

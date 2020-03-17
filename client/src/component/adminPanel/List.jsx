import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAnimal} from "../../Redux/animal/animalAction";

const List = ({ deleteAnimal, name, id,callBack }) => {

const change = (id) => {
  deleteAnimal(id)
  callBack(true)
}
  return (
    <tr>
      <td>{name}</td>
      <td>
        <Link to={`/update/${id}`}  className="btn btn-primary">
          Edit
        </Link>
      </td>
      <td>
        <button onClick={() => change(id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default connect(null, { deleteAnimal })(List);

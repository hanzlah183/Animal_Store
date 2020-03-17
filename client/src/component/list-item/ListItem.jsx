import React from "react";

const List = ({ result }) => {
  return (
    <ul className="list-group mb-4">
      {result.map((animal, i) => (
        <li key={i} className="list-group-item">
          {animal}
        </li>
      ))}
    </ul>
  );
};

export default List;

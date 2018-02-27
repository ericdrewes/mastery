import React from "react";
import handleSide from "../favorites"

const ChooseSide = props => {
  console.log(props)
  return (
    <div>
      <button onClick={() => props.handleSide("dark")}>Dark Side</button>
      <button onClick={() => props.handleSide("light")}>Light Side</button>
    </div>
  );
};

export default ChooseSide;
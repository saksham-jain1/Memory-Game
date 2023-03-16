import React from "react";
import './Tile.css'

const Tile = (props) => {
  return (
    <div className={"card "+props.status} onClick={()=>props.handleClick(props.index)}>
      {props.value}
    </div>
  );
};

export default Tile;

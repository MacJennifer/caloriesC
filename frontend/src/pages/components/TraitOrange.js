import PropTypes from "prop-types";
import React from "react";

const TraitOrange = ({ width, height, margin }) => {
  const style = {
    backgroundColor: "#FF914D",
    width: width,
    height: height,
    margin: margin,
  };

  return <div style={style}></div>;
};

TraitOrange.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
};

export default TraitOrange;

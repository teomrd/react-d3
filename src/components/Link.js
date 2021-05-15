import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";

let diagonal = d3.svg.diagonal().projection((d) => [d.x, d.y]);

const getDiagonal = (source, target) => diagonal({ source, target });

const Link = ({ source, target }) => {
  return <path className="link" d={getDiagonal(source, target)}></path>;
};

Link.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default Link;

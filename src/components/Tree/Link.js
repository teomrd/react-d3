import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import { motion } from "framer-motion";

let diagonal = d3.svg.diagonal().projection((d) => [d.x, d.y]);

const getDiagonal = (source, target) => diagonal({ source, target });

const Link = ({ source, target }) => {
  const o = { x: source.x0, y: source.y0 };
  return (
    <motion.path
      initial={{ d: getDiagonal(o, o) }}
      animate={{ d: getDiagonal(source, target) }}
      transition={{ duration: 0.75 }}
      className="link"
    ></motion.path>
  );
};

Link.propTypes = {
  source: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default Link;

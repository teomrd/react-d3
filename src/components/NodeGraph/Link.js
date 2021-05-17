import React from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import { motion } from "framer-motion";

const diagonal = d3.svg.diagonal().projection((d) => [d.x, d.y]);

const getDiagonal = (source, target) => diagonal({ source, target });

const Link = ({ source, target, duration }) => (
  <motion.path
    initial={{ d: getDiagonal(source, source), opacity: 0 }}
    animate={{ d: getDiagonal(source, target), opacity: 1 }}
    exit={{ d: getDiagonal(source, source), opacity: 0 }}
    transition={{ duration }}
    className="link"
  ></motion.path>
);

Link.propTypes = {
  source: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  duration: PropTypes.number,
};

Link.defaultProps = {
  source: {
    x: 0,
    y: 0,
  },
  target: {
    x: 0,
    y: 0,
  },
  duration: 0.75,
};

export default Link;

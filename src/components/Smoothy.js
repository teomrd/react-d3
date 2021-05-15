import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Smoothy = ({ r, color, text }) => {
  return (
    <Fragment>
      <motion.div style={{ x: 0 }} animate={{ x: 100 }}>
        mpampis
      </motion.div>
      <svg>
        <motion.g style={{ x: 0 }} animate={{ x: 100 }}>
          <circle r={r} style={{ fill: color }}></circle>
          <text x="0" dy="-1.6em" textAnchor="middle" fillOpacity={1}>
            analytics
          </text>
        </motion.g>
      </svg>
    </Fragment>
  );
};

Smoothy.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string,
};

Smoothy.defaultProps = {
  x: 0,
  y: 0,
  r: 20,
  duration: 750,
  color: "rgb(176, 196, 222)",
  text: "",
  isClickable: false,
};

export default Smoothy;

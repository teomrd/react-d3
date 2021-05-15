import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const SmoothySubText = ({ children }) => {
  return (
    <motion.div style={{ x: -200 }} animate={{ x: 0 }}>
      {children}
    </motion.div>
  );
};

SmoothySubText.propTypes = {
  children: PropTypes.node,
};

export default SmoothySubText;

import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Link from "./Link";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";

const Tree = ({
  nodes,
  links,
  width,
  height,
  onNodeClick,
  sourcePosition,
  id,
  transitionDuration,
  nodeSize,
}) => {
  return (
    <motion.svg
      id={id}
      animate={{ width, height: height + nodeSize * 2 }}
      transition={{ duration: transitionDuration }}
    >
      <g transform={`translate(0, ${nodeSize / 2 + 20})`}>
        <AnimatePresence>
          {links.map(({ source, target }) => (
            <Link
              key={target.id}
              source={source}
              target={target}
              sourcePosition={sourcePosition}
              duration={transitionDuration}
            />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {nodes.map((node) => {
            const { id, name, hasChildren, hasUnfoldChildren, x, y, parent } =
              node;
            return (
              <Node
                key={id}
                position={{
                  x,
                  y,
                }}
                enterPosition={sourcePosition}
                exitPosition={parent}
                text={name}
                isClickable={hasChildren}
                color={hasUnfoldChildren ? "rgb(176, 196, 222)" : "#fff"}
                onNodeClick={() => onNodeClick(node)}
                duration={transitionDuration}
                nodeSize={nodeSize}
              />
            );
          })}
        </AnimatePresence>
      </g>
    </motion.svg>
  );
};

Tree.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  nodes: PropTypes.array,
  links: PropTypes.array,
  onNodeClick: PropTypes.func.isRequired,
  sourcePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  transitionDuration: PropTypes.number,
  nodeSize: PropTypes.number,
};

Tree.defaultProps = {
  width: 0,
  height: 0,
  nodes: [],
  links: [],
  transitionDuration: 0.75,
};

export default Tree;

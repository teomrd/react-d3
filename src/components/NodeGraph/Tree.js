import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Link from "./Link";
import "./style.css";
import { AnimatePresence } from "framer-motion";

const Tree = ({ nodes, links, width, height, onNodeClick, sourcePosition }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 50)">
        <AnimatePresence>
          {links.map(({ source, target }) => (
            <Link key={target.id} source={source} target={target} />
          ))}
        </AnimatePresence>
        <AnimatePresence>
          {nodes.map((node) => {
            const { id, x, y, name, _children, children, parent } = node;
            const isParent = !!(_children || children);
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
                isClickable={isParent}
                color={_children ? "rgb(176, 196, 222)" : "#fff"}
                onNodeClick={() => onNodeClick(node)}
              />
            );
          })}
        </AnimatePresence>
      </g>
    </svg>
  );
};

Tree.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  nodes: PropTypes.array,
  links: PropTypes.array,
  onNodeClick: PropTypes.func.isRequired,
  sourcePosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};

Tree.defaultProps = {
  width: 0,
  height: 0,
  nodes: [],
  links: [],
};

export default Tree;

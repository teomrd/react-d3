import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Link from "./Link";
import "./style.css";
import { AnimatePresence } from "framer-motion";

const Tree = ({
  nodes,
  links,
  width,
  height,
  onNodeClick,
  sourcePosition,
  id,
}) => {
  return (
    <svg width={width} height={height} id={id}>
      <g transform="translate(0, 50)">
        <AnimatePresence>
          {links.map(({ source, target }) => (
            <Link
              key={target.id}
              source={source}
              target={target}
              sourcePosition={sourcePosition}
            />
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
  id: PropTypes.string,
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
  id: "node-graph-svg",
  width: 0,
  height: 0,
  nodes: [],
  links: [],
};

export default Tree;

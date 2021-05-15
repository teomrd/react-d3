import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Link from "./Link";
import "./style.css";

const Tree = ({ nodes, links, width, height, onNodeClick, sourcePosition }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 50)">
        {links.map((link) => {
          const { source, target } = link;
          return (
            <Link
              key={target.id}
              source={source}
              target={target}
              sourcePosition={sourcePosition}
            />
          );
        })}
        {nodes.map((node) => {
          const { id, x, y, name, _children, children } = node;
          const isClickable = !!(_children || children);

          return (
            <Node
              key={id}
              x={x}
              y={y}
              sourcePosition={sourcePosition}
              text={name}
              isClickable={isClickable}
              color={_children ? "rgb(176, 196, 222)" : "#fff"}
              onNodeClick={() => onNodeClick(node)}
            />
          );
        })}
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
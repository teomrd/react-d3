import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";
import Link from "./Link";
import "./style.css";

const Tree = ({ nodes, links, width, height, onNodeClick }) => {
  return (
    <svg width={width} height={height}>
      <g transform="translate(50, 50)">
        {links.map((link, i) => {
          const { source, target } = link;

          return <Link key={i} source={source} target={target} />;
        })}
        {nodes.map((node, i) => {
          const { x, y, name, _children, children } = node;
          const isClickable = !!(_children || children);

          return (
            <Node
              isClickable={isClickable}
              color={_children ? "rgb(176, 196, 222)" : "#fff"}
              key={i}
              id={i}
              x={x}
              y={y}
              text={name}
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
};

Tree.defaultProps = {
  width: 0,
  height: 0,
  nodes: [],
  links: [],
};

export default Tree;

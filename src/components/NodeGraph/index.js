import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import data from "../../data/flare-2.json";
import Tree from "./Tree";
import { idifyTree } from "../../utils/treeStructures";
import { useAvailableWidth } from "./useWindowSize";

const toggleChildren = (self) => {
  if (self.children) {
    self._children = self.children;
    self.children = null;
  } else {
    self.children = self._children;
    self._children = null;
  }
};
const collapseChildrenToTheEnd = (d) => {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapseChildrenToTheEnd);
    d.children = null;
  }
};
const fullyCollapseTreeOrNodes = (d) =>
  Array.isArray(d)
    ? d.forEach(collapseChildrenToTheEnd)
    : collapseChildrenToTheEnd(d);

const root = idifyTree(data);

const NodeGraph = ({ fixedDepth }) => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const width = useAvailableWidth("#node-graph-svg");
  const [sourcePosition, setSourcePosition] = useState({});

  const height = 800;

  const update = (source) => {
    const tree = d3.layout.tree().size([width, height]);

    setSourcePosition({
      x: source.x,
      y: source.y,
    });
    const nodes = tree.nodes(root).reverse();
    const links = tree.links(nodes);

    nodes.forEach((d) => {
      d.y = d.depth * fixedDepth;
    });

    setLinks(links);
    setNodes(nodes);
  };

  const handleNodeClick = (self) => {
    toggleChildren(self);
    update(self);
  };

  useEffect(() => {
    update(root);
  }, [width]);

  useEffect(() => {
    fullyCollapseTreeOrNodes(root.children);
    update(root);
  }, [root]);

  return (
    <Tree
      width={width}
      height={height}
      nodes={myNodes}
      links={myLinks}
      sourcePosition={sourcePosition}
      onNodeClick={handleNodeClick}
    />
  );
};

NodeGraph.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  fixedDepth: PropTypes.number,
};

NodeGraph.defaultProps = {
  width: 960,
  height: 800,
  fixedDepth: 200,
};

export default NodeGraph;

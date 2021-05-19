import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import d3 from "d3";
import Tree from "./Tree";
import { idifyTree } from "../../utils/treeStructures";
import { useAvailableWidth } from "./useAvailableWidth";

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

const NodeGraph = ({ id, data, fixedDepth }) => {
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const [root, setRoot] = useState(idifyTree({}));
  const width = useAvailableWidth(`#${id}`);
  const [sourcePosition, setSourcePosition] = useState({});

  const height = 800;

  useEffect(() => {
    const root = idifyTree(data);
    fullyCollapseTreeOrNodes(root.children);
    setRoot(root);
  }, [data]);

  useEffect(() => {
    update(root);
  }, [width]);

  const handleNodeClick = (self) => {
    toggleChildren(self);
    update(self);
  };

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

  return (
    <Tree
      id={id}
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
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.array,
  }),
  fixedDepth: PropTypes.number,
};

NodeGraph.defaultProps = {
  id: "node-graph-svg",
  fixedDepth: 200,
};

export default NodeGraph;

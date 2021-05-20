import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3-hierarchy";
import Tree from "./Tree";
import {
  idifyTree,
  toggleNodeChildren,
  traverse,
} from "../../utils/treeStructures";
import { useAvailableWidth } from "./useAvailableWidth";

const buildTree = (data, w, fixedDepth = 180) => {
  const dataWithIds = idifyTree(data);
  const root = d3.hierarchy(dataWithIds);
  const height = root.height * fixedDepth;
  return {
    root: d3.tree().size([w, height])(root),
    height,
  };
};

const getNode = ({ data, x, y, height, depth, parent }) => ({
  id: data.id,
  name: data.name,
  hasChildren: !!(data.children || data._children),
  hasUnfoldChildren: !!data._children,
  x,
  y,
  height,
  depth,
  ...(parent ? { parent: getNode(parent) } : {}),
});

const getNodes = (root) => {
  const descendants = root.descendants();
  const nodes = descendants.map((d) => getNode(d));

  return nodes;
};

const getLinks = (root) => {
  const links = root.links();
  return links.map(({ source, target }) => ({
    source: getNode(source),
    target: getNode(target),
  }));
};

const NodeGraph = ({ id, data, nodeSize, transitionDuration, fixedDepth }) => {
  const [myData, setData] = useState({});
  const [myNodes, setNodes] = useState([]);
  const [myLinks, setLinks] = useState([]);
  const width = useAvailableWidth(`#${id}`);
  const [height, setHeight] = useState(0);
  const [sourcePosition, setSourcePosition] = useState({});

  useEffect(() => {
    const dataWithIds = idifyTree(data);
    const { id: rootNodeId } = dataWithIds;

    const toggleDeepNodes = (node) =>
      node.id !== rootNodeId ? toggleNodeChildren(node) : node;

    const foldedTree = traverse(dataWithIds, toggleDeepNodes);
    return setData(foldedTree);
  }, [data]);

  useEffect(() => {
    const update = () => {
      const { root, height } = buildTree(myData, width, fixedDepth);

      const nodes = getNodes(root);
      const links = getLinks(root);

      setHeight(height);
      setNodes(nodes);
      setLinks(links);
    };
    update();
  }, [myData, width, fixedDepth]);

  const handleNodeClick = ({ id, x, y }) => {
    const toggleIfNodeWithId = (id) => (node) =>
      node.id === id ? toggleNodeChildren(node) : node;

    const updatedData = traverse(myData, toggleIfNodeWithId(id));
    setData(updatedData);

    setSourcePosition({
      x: x,
      y: y,
    });
  };

  return (
    <Tree
      id={id}
      width={width}
      height={height}
      nodeSize={nodeSize}
      nodes={myNodes}
      links={myLinks}
      sourcePosition={sourcePosition}
      onNodeClick={handleNodeClick}
      transitionDuration={transitionDuration}
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
  nodeSize: PropTypes.number,
  transitionDuration: PropTypes.number,
};

NodeGraph.defaultProps = {
  id: "node-graph-svg",
  fixedDepth: 180,
  nodeSize: 30,
  transitionDuration: 0.75,
};

export default NodeGraph;

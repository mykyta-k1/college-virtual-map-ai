declare module 'ngraph.graph' {
  export interface Node<Data = any> {
    id: string | number;
    data: Data;
    links: Link[];
  }

  export interface Link<Data = any> {
    fromId: string | number;
    toId: string | number;
    data: Data;
  }

  export interface Graph<NodeData = any, LinkData = any> {
    addNode(id: string | number, data?: NodeData): Node<NodeData>;
    addLink(fromId: string | number, toId: string | number, data?: LinkData): Link<LinkData>;
    getNode(id: string | number): Node<NodeData> | undefined;
    getLink(fromId: string | number, toId: string | number): Link<LinkData> | undefined;
    forEachNode(callback: (node: Node<NodeData>) => void): void;
    forEachLink(callback: (link: Link<LinkData>) => void): void;
  }

  export default function createGraph<NodeData = any, LinkData = any>(): Graph<NodeData, LinkData>;
}

declare module 'ngraph.path' {
  import { Graph, Node } from 'ngraph.graph';

  export interface PathFinderOptions<NodeData = any, LinkData = any> {
    distance?: (fromNode: Node<NodeData>, toNode: Node<NodeData>, link: LinkData) => number;
    heuristic?: (fromNode: Node<NodeData>, toNode: Node<NodeData>) => number;
  }

  export interface PathFinder<NodeData = any> {
    find(fromId: string | number, toId: string | number): Node<NodeData>[];
  }

  export function aStar<NodeData = any, LinkData = any>(
    graph: Graph<NodeData, LinkData>,
    options?: PathFinderOptions<NodeData, LinkData>,
  ): PathFinder<NodeData>;
}

import Dagre from "@dagrejs/dagre";
import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// Инициализация QueryClient
const queryClient = new QueryClient();

// Получение данных с API
const useFetchPrettyData = () => {
  return useQuery({
    queryKey: ["prettyData"], // Ключ для кэширования
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/terms/pretty");
      if (!response.ok) {
        throw new Error("Ошибка при получении данных с API");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
};

const getLayoutedElements = (nodes, edges, options) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? 0) / 2;
      const y = position.y - (node.measured?.height ?? 0) / 2;

      return { ...node, position: { x, y } };
    }),
    edges,
  };
};

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const { data, isLoading, isError } = useFetchPrettyData();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Обновляем состояние узлов и связей при загрузке данных
  React.useEffect(() => {
    if (data) {
      const { nodes, edges } = getLayoutedElements(
        data.initialNodes,
        data.initialEdges,
        {
          direction: "TB",
        },
      );
      setNodes(nodes);
      setEdges(edges);
    }
  }, [data]);

  const onLayout = useCallback(
    (direction) => {
      console.log(nodes);
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    >
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>Расставить</button>
      </Panel>
    </ReactFlow>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlowProvider>
          <LayoutFlow />
        </ReactFlowProvider>
      </div>
    </QueryClientProvider>
  );
}

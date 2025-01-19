import { useQuery } from "@tanstack/react-query";
import { Edge, Node } from "@xyflow/react";

type TPrettyNodesAndEdges = {
  edges: Edge[];
  nodes: Node[];
};

export default function useFetchPrettyData() {
  return useQuery<TPrettyNodesAndEdges>({
    queryKey: ["prettyData"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/terms/pretty");
      if (!response.ok) {
        throw new Error("Ошибка при получении данных из API");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

import { useQuery } from "@tanstack/react-query";
import { Edge, Node } from "@xyflow/react";
import { API_BASE_URL } from "../const/apiBaseUrl.ts";

type TPrettyNodesAndEdges = {
  edges: Edge[];
  nodes: Node[];
};

export default function useFetchPrettyData() {
  return useQuery<TPrettyNodesAndEdges>({
    queryKey: ["prettyData"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/terms/pretty`);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных из API");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

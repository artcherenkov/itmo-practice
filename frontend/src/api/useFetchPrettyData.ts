import { useQuery } from "@tanstack/react-query";

export default function useFetchPrettyData() {
  return useQuery({
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

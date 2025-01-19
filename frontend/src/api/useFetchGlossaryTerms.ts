import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../const/apiBaseUrl.ts";

type TGlossaryTerm = {
  id: string;
  title: string;
  description: string;
};

export default function useFetchGlossaryTerms() {
  return useQuery<TGlossaryTerm[]>({
    queryKey: ["glossaryTerms"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/api/terms/glossary`);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных из API");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

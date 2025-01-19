import { useQuery } from "@tanstack/react-query";

type TGlossaryTerm = {
  id: string;
  title: string;
  description: string;
};

export default function useFetchGlossaryTerms() {
  return useQuery<TGlossaryTerm[]>({
    queryKey: ["glossaryTerms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/terms/glossary");
      if (!response.ok) {
        throw new Error("Ошибка при получении данных из API");
      }
      return response.json();
    },
    refetchOnWindowFocus: false,
  });
}

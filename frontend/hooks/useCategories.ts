import { HttpClient } from "@/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const { data: categories, ...categoriesQuery } = useQuery({
    queryKey: HttpClient.ItemApi.indexCategories.key(),
    queryFn: HttpClient.ItemApi.indexCategories.exec,
  });

  return {
    categories,
    categoriesQuery,
  };
};

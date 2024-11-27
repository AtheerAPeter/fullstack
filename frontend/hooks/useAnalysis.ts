import { HttpClient } from "@/httpClient";
import { useQuery } from "@tanstack/react-query";

export const useAnalysis = () => {
  const { data: inventoryAnalysis, ...inventoryAnalysisQuery } = useQuery({
    queryFn: HttpClient.ItemApi.indexInventoryAnalysis.exec,
    queryKey: HttpClient.ItemApi.indexInventoryAnalysis.key(),
  });

  return { inventoryAnalysis, inventoryAnalysisQuery };
};

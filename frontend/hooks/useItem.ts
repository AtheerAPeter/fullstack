import { HttpClient } from "@/httpClient";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useItem = () => {
  //  not enough time to implement pagination
  const { data: list, ...listQuery } = useQuery({
    queryFn: HttpClient.ItemApi.index.exec,
    queryKey: HttpClient.ItemApi.index.key(),
  });

  const updateStockQuantityMutation = useMutation({
    mutationFn: HttpClient.ItemApi.updateStockQuantity,
  });

  const updatePriceByCategoryMutation = useMutation({
    mutationFn: HttpClient.ItemApi.updatePriceByCategory,
  });

  return {
    list,
    listQuery,
    updateStockQuantityMutation,
    updatePriceByCategoryMutation,
  };
};

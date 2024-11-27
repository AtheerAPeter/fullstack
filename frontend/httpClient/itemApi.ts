import {
  IInventoryAnalysis,
  IItem,
  IUpdatePriceByCategoryInputs,
  IUpdateStockQuantityInputs,
} from "@/interfaces/IItem";
import { Axios } from "axios";

const indexKey = (): [string] => ["index-items"];
const indexInventoryAnalysisKey = (): [string] => ["index-inventory-analysis"];
const indexCategoriesKey = (): [string] => ["index-categories"];

export const itemApi = (request: Axios) => ({
  index: {
    exec: async () => {
      const response = await request.get<IItem[]>("/v1/items");
      return response.data;
    },
    key: indexKey,
  },

  updateStockQuantity: async (inputs: IUpdateStockQuantityInputs) => {
    const response = await request.put(`/v1/items/${inputs.id}/stock`, {
      stock_quantity: inputs.stock_quantity,
    });
    return response.data;
  },

  updatePriceByCategory: async (inputs: IUpdatePriceByCategoryInputs) => {
    const response = await request.post(`/v1/items/price`, {
      category: inputs.category,
      price: inputs.price,
    });
    return response.data;
  },
  indexInventoryAnalysis: {
    exec: async () => {
      const response = await request.get<IInventoryAnalysis>(
        "/v1/items/analytics"
      );
      return response.data;
    },
    key: indexInventoryAnalysisKey,
  },

  indexCategories: {
    exec: async () => {
      const response = await request.get<{ category: string }[]>(
        "/v1/items/categories"
      );
      return response.data;
    },
    key: indexCategoriesKey,
  },
});

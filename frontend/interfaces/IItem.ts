export interface IItem {
  id: number;
  item_name: string;
  category: string;
  price: number;
  stock_quantity: number;
}

export interface IUpdateStockQuantityInputs {
  id: number;
  stock_quantity: number;
}

export interface IUpdatePriceByCategoryInputs {
  price: number;
  category: string;
}

export interface IInventoryAnalysis {
  totalItems: number;
  totalValue: number;
  lowStock: number;
  categoryBreakdown: Record<string, number>;
  averagePrice: number;
}

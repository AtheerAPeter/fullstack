export interface IAnalysis {
  totalItems: number;
  totalValue: number;
  lowStock: number;
  categoryBreakdown: Record<string, number>;
  averagePrice: number;
}

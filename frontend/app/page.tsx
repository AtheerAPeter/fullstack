"use client";

import { SummaryStats } from "@/components/summary-stats";
import { CategoryBreakdownChart } from "@/components/category-breakdown-chart";

import { useAnalysis } from "@/hooks/useAnalysis";

export default function Dashboard() {
  const { inventoryAnalysis } = useAnalysis();

  if (!inventoryAnalysis) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Inventory Analysis Dashboard</h1>

      <div className="mb-8">
        <SummaryStats
          totalItems={inventoryAnalysis.totalItems}
          totalValue={inventoryAnalysis.totalValue}
          lowStock={inventoryAnalysis.lowStock}
          averagePrice={inventoryAnalysis.averagePrice}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CategoryBreakdownChart
          categoryBreakdown={inventoryAnalysis.categoryBreakdown}
        />
      </div>
    </div>
  );
}

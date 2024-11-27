"use client";
import CategoryPriceUpdater from "@/components/category-price-updater";
import { TableItem } from "@/components/table-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useItem } from "@/hooks/useItem";
import { RefreshCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function InventoryPage() {
  const { list, listQuery, updateStockQuantityMutation } = useItem();

  const onUpdateQuantity = async (id: number, quantity: number) => {
    try {
      await toast.promise(
        updateStockQuantityMutation.mutateAsync({
          id,
          stock_quantity: quantity,
        }),
        {
          loading: "Updating quantity...",
          success: "Quantity updated successfully",
          error: "Failed to update quantity",
        }
      );
      listQuery.refetch();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 w-full ">
      <h1 className="text-3xl font-bold">Inventory</h1>
      <Separator />
      <div className="my-4">
        <h2 className="mb-2">Update Category Prices</h2>
        <CategoryPriceUpdater onFinishUpdate={listQuery.refetch} />
      </div>
      <Separator />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list?.map((item) => (
            <TableItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

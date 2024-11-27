"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/hooks/useCategories";
import { useItem } from "@/hooks/useItem";
import toast from "react-hot-toast";

interface Props {
  onFinishUpdate: () => void;
}

export default function CategoryPriceUpdater(props: Props) {
  const { categories } = useCategories();
  const { updatePriceByCategoryMutation } = useItem();

  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [newPrice, setNewPrice] = useState("");

  const handleUpdatePrice = async () => {
    if (selectedCategory === "" || newPrice === "") return;

    try {
      await toast.promise(
        updatePriceByCategoryMutation.mutateAsync({
          category: selectedCategory,
          price: Number(newPrice || 0),
        }),
        {
          loading: "Updating prices...",
          success: "Prices updated successfully",
          error: "Failed to update prices",
        }
      );

      props.onFinishUpdate();
    } catch (error) {
      console.error("Error updating prices:", error);
    }

    setNewPrice("");
  };

  return (
    <div className="w-full space-y-4">
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category) => (
            <SelectItem key={category.category} value={category.category}>
              {category.category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex w-full space-x-2">
        <Input
          type="number"
          placeholder="Enter new price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <Button
          onClick={handleUpdatePrice}
          disabled={selectedCategory === "" || newPrice === ""}
        >
          Update Price
        </Button>
      </div>
    </div>
  );
}

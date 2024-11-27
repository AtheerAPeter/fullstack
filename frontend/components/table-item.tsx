import { useState } from "react";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { TableCell } from "./ui/table";

import { TableRow } from "./ui/table";
import { IItem } from "@/interfaces/IItem";

interface Props {
  item: IItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

export const TableItem = (props: Props) => {
  const [input, setInput] = useState(props.item.stock_quantity);

  const handleUpdateQuantity = () => {
    props.onUpdateQuantity(props.item.id, input);
  };

  return (
    <TableRow key={props.item.id}>
      <TableCell>{props.item.id}</TableCell>
      <TableCell>{props.item.item_name}</TableCell>
      <TableCell>{props.item.category}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Input
            className="w-24"
            type="number"
            value={input}
            onChange={(e) => setInput(Number(e.target.value))}
          />
          <Button variant="outline" size="sm" onClick={handleUpdateQuantity}>
            Update
          </Button>
        </div>
      </TableCell>
      <TableCell>${props.item.price.toFixed(2)}</TableCell>
    </TableRow>
  );
};

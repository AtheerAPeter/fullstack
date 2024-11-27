import { Hono } from "hono";
import ItemController from "../controllers/item.controller.js";

const v1 = new Hono();

// Get all items
v1.get("/items", ItemController.getAllItems);

// Update price by category
v1.post("/items/price", ItemController.updatePriceByCategory);

// Update stock quantity for an item
v1.put("/items/:id/stock", ItemController.updateStockQuantity);

// Get inventory analytics
v1.get("/items/analytics", ItemController.getInventoryAnalytics);

// Get all categories
v1.get("/items/categories", ItemController.indexCategories);

export default v1;

import type { Context } from "hono";
import { z } from "zod";
import { resError, resData } from "../utils/tools.js";
import { prisma } from "../index.js";

const updateStockSchema = z.object({
  stock_quantity: z.number().int().positive("Stock quantity must be positive"),
});

const updatePriceSchema = z.object({
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
});

export default class ItemController {
  static async createItems(c: Context) {
    const body = await c.req.json();

    const bodywithoutItemId = body.reduce((acc: any, item: any) => {
      acc.push({
        item_name: item.item_name,
        category: item.category,
        price: item.price,
        stock_quantity: item.stock_quantity,
      });
      return acc;
    }, []);

    const d = await prisma.items.createManyAndReturn({
      data: bodywithoutItemId,
    });

    return resData(c, d);
  }

  static async getAllItems(c: Context) {
    try {
      const items = await prisma.items.findMany();
      return resData(c, items);
    } catch (error) {
      console.log(error);
      return resError(c, "Failed to fetch items");
    }
  }

  static async updateStockQuantity(c: Context) {
    try {
      const { id } = c.req.param();
      const body = await c.req.json();
      const validatedData = updateStockSchema.parse(body);

      const item = await prisma.items.update({
        where: { id: id },
        data: { stock_quantity: validatedData.stock_quantity },
      });

      return resData(c, item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resError(c, error.errors[0].message);
      }
      return resError(c, "Failed to update stock quantity");
    }
  }

  static async updatePriceByCategory(c: Context) {
    try {
      const body = await c.req.json();
      const validatedData = updatePriceSchema.parse(body);

      const items = await prisma.items.updateMany({
        where: { category: validatedData.category },
        data: { price: validatedData.price },
      });

      return resData(c, items);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return resError(c, error.errors[0].message);
      }
      return resError(c, "Failed to update prices");
    }
  }

  static async getInventoryAnalytics(c: Context) {
    try {
      const items = await prisma.items.findMany();

      const analytics = {
        totalItems: items.length,
        totalValue: items.reduce(
          (sum, item) => sum + item.price * item.stock_quantity,
          0
        ),
        lowStock: items.filter((item) => item.stock_quantity < 10).length,
        categoryBreakdown: items.reduce((acc: Record<string, number>, item) => {
          acc[item.category] = (acc[item.category] || 0) + 1;
          return acc;
        }, {}),
        averagePrice:
          items.reduce((sum, item) => sum + item.price, 0) / items.length,
      };

      return resData(c, analytics);
    } catch (error) {
      return resError(c, "Failed to generate analytics");
    }
  }

  static async indexCategories(c: Context) {
    const categories = await prisma.items.findMany({
      select: {
        category: true,
      },
      distinct: ["category"],
    });

    return resData(c, categories);
  }
}

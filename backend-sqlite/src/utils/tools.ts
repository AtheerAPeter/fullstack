import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

const resData = (c: Context, data: any) => {
  return c.json(data, 200);
};

const resError = (c: Context, message: any, status: number = 400) => {
  return c.json({ message, status: false }, status as StatusCode);
};

export { resData, resError };

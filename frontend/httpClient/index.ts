import axios from "axios";
import { itemApi } from "./itemApi";

export const client = axios.create({
  baseURL: "http://localhost:4000",
});

export const HttpClient = {
  ItemApi: itemApi(client),
};

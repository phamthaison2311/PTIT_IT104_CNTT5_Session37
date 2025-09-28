import axios from "axios";
import type { Book } from "./bookSlice";

// Lấy danh sách Book
export const fetchBooksAPI = async (): Promise<Book[]> => {
  const res = await axios.get("http://localhost:8080/book");
  return res.data;
};

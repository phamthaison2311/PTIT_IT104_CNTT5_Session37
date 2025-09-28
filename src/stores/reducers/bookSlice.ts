import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchBooksAPI } from "./bookAPI";
import axios from "axios";

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
}

export interface BookState {
  list: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  list: [],
  loading: false,
  error: null,
};

// Lấy danh sách Book
export const fetchBooks = createAsyncThunk("books/fetch", async () => {
  const data = await fetchBooksAPI();
  return data;
});

// Xoá Book theo id
export const removeBookById = createAsyncThunk(
  "books/remove",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/book/${id}`);
    return id;
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.list.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch error";
      })
      .addCase(removeBookById.fulfilled, (state, action) => {
        state.list = state.list.filter((b) => b.id !== action.payload);
      });
  },
});

export const { addBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;

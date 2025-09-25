import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { fetchStudentsAPI } from "./studentAPI";
import axios from "axios";

export interface Student {
  id: number;
  name: string;
  age: number;
  grade: string;
}

export interface StudentState {
  list: Student[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  const data = await fetchStudentsAPI();
  return data;
});

export const removeStudentById = createAsyncThunk(
  "students/remove",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/student/${id}`);
    return id;
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.list.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((s) => s.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Fetch error";
      })
      .addCase(removeStudentById.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      });
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;

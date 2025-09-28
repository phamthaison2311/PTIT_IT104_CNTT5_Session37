import React, { useState } from "react";
import "../AddForm.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../stores/reducers/bookSlice";
import LoadingData from "./LoadingData";
import type { RootState, AppDispatch } from "../stores/store";

type Props = { onClose: () => void };

export default function AddFormBook({ onClose }: Props) {
  const loading = useSelector((state: RootState) => state.books.loading);
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate đơn giản
    if (!title.trim()) return alert("Title không được để trống");
    if (!year || Number.isNaN(Number(year))) return alert("Year phải là số");
    if (!category.trim()) return alert("Category không được để trống");

    const newBook = {
      title: title.trim(),
      year: Number(year),
      category: category.trim(), 
    };

    try {
      await axios.post("http://localhost:8080/book", newBook);
      dispatch(fetchBooks());
      onClose();
      setTitle("");
      setYear("");
      setCategory("");
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Thêm book thất bại. Kiểm tra server ở cổng 8080.");
    }
  };

  return (
    <>
      {loading && <LoadingData />}
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add Book</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Title</label>
            </div>

            <div className="form-group">
              <input
                type="number"
                name="year"
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <label>Year</label>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <label>Category</label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={onClose}
              >
                CANCEL
              </button>
              <button type="submit" className="add-buttonn">
                ADD
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

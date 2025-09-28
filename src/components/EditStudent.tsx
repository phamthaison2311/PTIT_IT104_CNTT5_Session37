import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../stores/store";
import { fetchBooks } from "../stores/reducers/bookSlice";

interface Book {
  id: number;
  title: string;
  year: number;
  category: string; 
}

interface EditFormProps {
  onClose: () => void;
  book: Book;
}

export default function EditFormBook({ onClose, book }: EditFormProps) {
  const [title, setTitle] = useState(book.title);
  const [year, setYear] = useState<string>(book.year.toString());
  const [category, setCategory] = useState<string>(book.category.toString());
  const [error, setError] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const allBooks = useSelector((state: RootState) => state.books.list);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!title.trim()) return setError("Title không được để trống");

    // Không trùng title (trừ chính nó)
    if (allBooks.some((b) => b.title.trim() === title.trim() && b.id !== book.id)) {
      return setError("Title đã tồn tại");
    }

    const yearNum = Number(year);
    if (!year || Number.isNaN(yearNum) || yearNum <= 0) {
      return setError("Year phải là số > 0");
    }

    if (!category.toString().trim()) {
      return setError("Category không được để trống");
    }

    try {
      await axios.put(`http://localhost:8080/book/${book.id}`, {
        id: book.id,
        title: title.trim(),
        year: yearNum,
        category: category.trim(), 
      });

      await dispatch(fetchBooks());
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSave}>
          {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>

          <div className="form-group">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <label>Year</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label>Category</label>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              CANCEL
            </button>
            <button type="submit" className="add-buttonn">
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

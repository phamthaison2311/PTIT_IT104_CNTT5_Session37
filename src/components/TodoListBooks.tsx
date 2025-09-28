import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import {
  fetchBooks,
  removeBookById,
  type Book,
} from "../stores/reducers/bookSlice";
import LoadingData from "./LoadingData";
import EditFormBook from "./EditStudent"; 

export default function BookList() {
  const list = useSelector((state: RootState) => state.books.list);
  const loading = useSelector((state: RootState) => state.books.loading);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có muốn xóa sách này?")) {
      dispatch(removeBookById(id));
    }
  };

  return (
    <>
      {loading && <LoadingData />}
      <div className="book-list">
        {list.map((item) => (
          <div key={item.id} className="book-card">
            <div>
              <h3>{item.title}</h3>
              <p>
                {item.author} • {item.year} • {String(item.category)}
              </p>
            </div>
            <div className="book-actions">
              <button title="Edit" onClick={() => setEditingBook(item)}>
                ✏️
              </button>
              <button title="Delete" onClick={() => handleDelete(item.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingBook && (
        <EditFormBook
          book={editingBook}
          onClose={() => setEditingBook(null)}
        />
      )}
    </>
  );
}

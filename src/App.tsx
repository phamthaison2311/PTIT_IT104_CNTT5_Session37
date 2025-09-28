import React, { useState } from "react";
import FilterSearch from "./components/FilterSearch";
import TodoListBook from "./components/TodoListBooks";
import AddForm from "./components/AddForm";

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="container">
      <h1 className="header">
        <span role="img" aria-label="graduation-cap">
          📚
        </span>
        Book Library Manager
      </h1>

      <button className="add-button" onClick={() => setShow(true)}>
        ADD BOOK
      </button>

      {/* Tìm kiếm lọc và sắp xếp */}
      <FilterSearch />

      {/* Danh sách sinh viên */}
      <TodoListBook />

      {show && <AddForm onClose={() => setShow(false)} />}
    </div>
  );
}

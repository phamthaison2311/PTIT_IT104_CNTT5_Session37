import React, { useState } from "react";
import FilterSearch from "./components/FilterSearch";
import TodoListStudent from "./components/TodoListStudent";
import AddForm from "./components/AddForm";

export default function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="container">
      <h1 className="header">
        <span role="img" aria-label="graduation-cap">
          🎓
        </span>
        Student Manager
      </h1>

      <button className="add-button" onClick={() => setShow(true)}>
        ADD STUDENT
      </button>

      {/* Tìm kiếm lọc và sắp xếp */}
      <FilterSearch />

      {/* Danh sách sinh viên */}
      <TodoListStudent />

      {show && <AddForm onClose={() => setShow(false)} />}
    </div>
  );
}

import React from "react";

export default function FilterSearch() {
  return (
    <>
      <div className="filter-section">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm theo tên"
        />

        <div className="floating-select">
          <select required>
            <option value="all">Tất cả</option>
            <option value="10">Grade 10</option>
            <option value="11">Grade 11</option>
            <option value="12">Grade 12</option>
          </select>
          <label>Grade</label>
        </div>

        <div className="floating-select">
          <select required>
            <option value="az">Name A → Z</option>
            <option value="za">Name Z → A</option>
          </select>
          <label>Sắp xếp</label>
        </div>

        <button className="clear-button">CLEAR</button>
      </div>
    </>
  );
}

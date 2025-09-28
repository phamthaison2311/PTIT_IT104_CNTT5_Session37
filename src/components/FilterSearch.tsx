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
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="novel"></option>
          </select>
          <label>Category</label>
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

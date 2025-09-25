import React, { useState, type FormEvent } from "react";
import "../AddForm.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../stores/reducers/studentSlice";
import LoadingData from "./LoadingData";
import type { RootState } from "../stores/store";

export default function AddForm({ onClose }) {
  const loading = useSelector((state: RootState) => state.students.loading);
  const [addName, setAddName] = useState("");
  const [addAge, setAddAge] = useState("");
  const [addGrade, setAddGrade] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add Student</h2>
          <form
            action=""
            onSubmit={async (e) => {
              e.preventDefault();
              onClose();
              const newStudent = {
                name: addName,
                age: addAge.toString(),
                grade: addGrade,
              };

              try {
                await axios.post("http://localhost:8080/student", newStudent);
                onClose();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                {loading && <LoadingData />}
                dispatch(fetchStudents());
              } catch (error) {
                console.error("Lỗi khi gửi dữ liệu:", error);
              }
            }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                required
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />
              <label>Name</label>
            </div>
            <div className="form-group">
              <input
                type="number"
                name="age"
                required
                value={addAge}
                onChange={(e) => setAddAge(e.target.value)}
              />
              <label>Age</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="grade"
                required
                value={addGrade}
                onChange={(e) => setAddGrade(e.target.value)}
              />
              <label>Grade</label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => onClose()}
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../stores/store";
import {
  fetchStudents,
  removeStudentById,
  type Student,
} from "../stores/reducers/studentSlice";
import LoadingData from "./LoadingData";
import EditForm from "./EditStudent";

export default function TodoListStudent() {
  const std = useSelector((state: RootState) => state.students.list);
  const loading = useSelector((state: RootState) => state.students.loading);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có muốn xóa sinh viên này")) {
      dispatch(removeStudentById(id));
    }
  };
  return (
    <>
      {loading && <LoadingData />}
      <div className="student-list">
        {std.map((item) => (
          <div key={item.id} className="student-card">
            <div>
              <h3>{item.name}</h3>
              <p>
                Age: {item.age} • Grade: {item.grade}
              </p>
            </div>
            <div className="student-actions">
              <button title="Edit" onClick={() => setEditingStudent(item)}>
                ✏️
              </button>
              <button title="Delete" onClick={() => handleDelete(item.id)}>
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingStudent && (
        <EditForm
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}
    </>
  );
}

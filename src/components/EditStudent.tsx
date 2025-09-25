import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../stores/store";
import { fetchStudents } from "../stores/reducers/studentSlice";

interface EditFormProps {
  onClose: () => void;
  student: {
    id: number;
    name: string;
    age: number;
    grade: string;
  };
}

export default function EditForm({ onClose, student }: EditFormProps) {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age.toString());
  const [grade, setGrade] = useState(student.grade);

  const [error, setError] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const allStudents = useSelector((state: RootState) => state.students.list);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      return setError("Tên sinh viên không được để trống");
    }

    if (
      allStudents.some(
        (s) => s.name === name && s.id !== student.id
      )
    ) {
      return setError("Tên sinh viên đã tồn tại");
    }

    const ageNum = Number(age);
    if (!age || isNaN(ageNum) || ageNum <= 0) {
      return setError("Tuổi phải lớn hơn 0 và không được để trống");
    }

    if (!grade.trim()) {
      return setError("Tên lớp học không được để trống");
    }

    try {
      await axios.put(`http://localhost:8080/student/${student.id}`, {
        id: student.id,
        name,
        age: ageNum,
        grade,
      });
      dispatch(fetchStudents());
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Student</h2>
        <form onSubmit={handleSave}>
          {error && <p style={{ color: "red", marginBottom: 10 }}>{error}</p>}

          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Name</label>
          </div>

          <div className="form-group">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label>Age</label>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
            <label>Grade</label>
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

import axios from "axios"
import type { Student } from "./studentSlice";
export const fetchStudentsAPI = async (): Promise<Student[]> => {
    const res = await axios("http://localhost:8080/student");
    return res.data;
}
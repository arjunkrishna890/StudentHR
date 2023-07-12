import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await fetch('http://localhost:8000/students');
  const data = await response.json();
  return data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (studentId) => {
  await fetch(`http://localhost:8000/students/${studentId}`, {
    method: 'DELETE',
  });
  return studentId;
});

export const addStudent = createAsyncThunk('students/addStudent', async (newStudent) => {
  const studentWithId = { id: uuidv4(), ...newStudent };
  const response = await fetch('http://localhost:8000/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentWithId),
  });
  const data = await response.json();
  return data;
});

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        const deletedStudentId = action.payload;
        state.data = state.data.filter((student) => student.id !== deletedStudentId);
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        const newStudent = action.payload;
        state.data.push(newStudent);
      });
  },
});

export default studentsSlice.reducer;

export const selectStudents = (state) => state.students.data;

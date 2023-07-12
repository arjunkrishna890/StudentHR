import { useState } from 'react';
import { addStudent } from '../Store/studentsSlice';
import { deleteStudent } from '../Store/studentsSlice';

const useDashboard = (students, dispatch) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('no-sort');
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [DOB, setDateOfBirth] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleDateOfBirthChange = (event) => {
    setDateOfBirth(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newStudent = {
      name,
      place,
      DOB,
    };
    dispatch(addStudent(newStudent));
    setName('');
    setPlace('');
    setDateOfBirth('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (_, { value }) => {
    setSortOrder(value);
  };

  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId));
  };

  const filteredData = students.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedData = filteredData;

  if (sortOrder === 'asc') {
    sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.DOB);
      const dateB = new Date(b.DOB);
      return dateA - dateB;
    });
  } else if (sortOrder === 'desc') {
    sortedData = filteredData.sort((a, b) => {
      const dateA = new Date(a.DOB);
      const dateB = new Date(b.DOB);
      return dateB - dateA;
    });
  }

  return {
    searchTerm,
    sortOrder,
    sortedData,
    name,
    place,
    DOB,
    handleNameChange,
    handlePlaceChange,
    handleDateOfBirthChange,
    handleSubmit,
    handleSearch,
    handleSort,
    handleDelete,
  };
};

export default useDashboard;

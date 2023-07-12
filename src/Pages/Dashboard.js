import React, { useEffect} from 'react';
import './Dashboard.scss';
import { useDispatch } from 'react-redux';
import { fetchStudents} from '../Store/studentsSlice';
import { useSelector } from 'react-redux';
import {BsPlus} from 'react-icons/bs'
import useDashboard from '../customhooks/useDashboard';
import StudentSearch from '../Components/Search';
import StudentTable from '../Components/StudentTable';
import AddStudentCard from '../Components/AddStudemtCard';
import StudentSort from '../Components/Sort';

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const students = useSelector(state=>state.students);
  const {
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
  } = useDashboard(students, dispatch);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  
  return (
    <div className="dashboard">
      {token ? (
        <div className="content">
          <h1 className='dashboard'>Dashboard</h1>
          <div className="search-bar">
          <StudentSearch
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          handleSort={handleSort}
          sortOrder={sortOrder}
          />  
             <StudentSort sortOrder={sortOrder} handleSort={handleSort} />
          </div>
          <StudentTable students={sortedData} handleDelete={handleDelete} />
          <h4>Add More <BsPlus size={20}/></h4>
          <AddStudentCard
          name={name}
          place={place}
          DOB={DOB}
          handleNameChange={handleNameChange}
          handlePlaceChange={handlePlaceChange}
          handleDateOfBirthChange={handleDateOfBirthChange}
          handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div>Not Authenticated</div>
        )}
    </div>
  );
}

export default Dashboard;

{/* <Segment inverted style={{background:"linear-gradient(90deg, rgba(233, 30, 99, 1) 0%, rgba(63, 81, 181, 1) 48%)"}} color='violet' tertiary>
  <b>Hi, {jwt_decode(token).name}</b> 
</Segment> */}
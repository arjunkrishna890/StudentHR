import React, { useEffect, useState } from 'react';

import './Dashboard.scss';
import { useDispatch } from 'react-redux';
import { fetchStudents, selectStudents,deleteStudent,addStudent} from '../Store/studentsSlice';
import { useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import {BsPlus} from 'react-icons/bs'
import { Table, Input, Button,Card,Form,Checkbox,Segment} from 'semantic-ui-react';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Dashboard() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const students = useSelector(state=>state.students);
  const token = useSelector((state) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
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

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId));
  
  }

  if (students.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (students.status === 'failed') {
    return <div>Error: {students.error}</div>;
  }

  const filteredData = students.data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a, b) => {
    const dateA = new Date(a.DOB);
    const dateB = new Date(b.DOB);

    if (sortOrder === 'asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return (
    <div className="dashboard">
      {token ? (
        <div className="content">
          <h1>Dashboard</h1>

          <Segment inverted style={{background:"linear-gradient(90deg, rgba(233, 30, 99, 1) 0%, rgba(63, 81, 181, 1) 48%)"}} color='violet' tertiary>
            <b>Hi, {jwt_decode(token).name}</b> 
          </Segment>
          <div className="search-bar">
            <Input
              icon="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button basic color="red" onClick={handleSort}>
              {sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            </Button>
          </div>
          <Table color="red">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                <Table.HeaderCell>Place</Table.HeaderCell>
                <Table.HeaderCell>Delete</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {sortedData.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.DOB}</Table.Cell>
                  <Table.Cell>{item.place}</Table.Cell>
                  <Table.Cell>< AiFillDelete color='' onClick={()=>handleDelete(item.id)} size={15}/></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <h4>Add More <BsPlus size={20}/></h4>
          <Card fluid color='red' style={{paddingTop:"1rem",paddingLeft:"1rem"}} >
          <Form>
          <Form.Group >
          <Form.Field inline>
              <label>Name</label>
              <Input placeholder='Name' value={name} onChange={handleNameChange} />
          </Form.Field>
          <Form.Field inline>
            <label>Date Of Birth</label>
            <Input type='date' value={DOB} onChange={handleDateOfBirthChange}/>
          </Form.Field>
          
          <Form.Field inline>
            <label>Place</label>
              <Input placeholder='Place' value={place} onChange={handlePlaceChange} />
        </Form.Field>
            <Button size='mini'  basic color='red' type='submit' onClick={handleSubmit}>Submit</Button>
        </Form.Group>
       
          </Form>
          </Card>
      
        </div>
      ) : (
        <div>Not Authenticated</div>
      )}
    </div>
  );
}

export default Dashboard;

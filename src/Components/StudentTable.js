import React from 'react';
import { Table } from 'semantic-ui-react';
import { AiFillDelete } from 'react-icons/ai';

const StudentTable = ({ students, handleDelete }) => {
  return (
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
        {students.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.DOB}</Table.Cell>
            <Table.Cell>{item.place}</Table.Cell>
            <Table.Cell>
              <AiFillDelete color="" onClick={() => handleDelete(item.id)} size={15} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default StudentTable;

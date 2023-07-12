import React from 'react';
import { Card, Form, Input, Button } from 'semantic-ui-react';

const AddStudentCard = ({ name, place, DOB, handleNameChange, handlePlaceChange, handleDateOfBirthChange, handleSubmit }) => {
  return (
    <Card fluid color="red" style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>
      <Form>
        <Form.Group>
          <Form.Field inline>
            <label>Name</label>
            <Input placeholder="Name" value={name} onChange={handleNameChange} />
          </Form.Field>
          <Form.Field inline>
            <label>Date Of Birth</label>
            <Input type="date" value={DOB} onChange={handleDateOfBirthChange} />
          </Form.Field>
          <Form.Field inline>
            <label>Place</label>
            <Input placeholder="Place" value={place} onChange={handlePlaceChange} />
          </Form.Field>
          <Button size="mini" basic color="red" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Card>
  );
};

export default AddStudentCard;

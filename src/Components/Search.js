import React from 'react';
import { Input, Button } from 'semantic-ui-react';

const StudentSearch = ({ searchTerm, handleSearch, handleSort, sortOrder }) => {
  return (
    <div className="search-bar">
      <Input
        icon="search"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default StudentSearch;

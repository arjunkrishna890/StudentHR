import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const StudentSort = ({ sortOrder, handleSort }) => {
  const options = [
    { key: 'no-sort', text: 'No Sort', value: 'no-sort' },
    { key: 'asc', text: 'Sort Ascending', value: 'asc' },
    { key: 'desc', text: 'Sort Descending', value: 'desc' }
  ];

  return (
    <Dropdown
      selection
      options={options}
      value={sortOrder}
      onChange={handleSort}
    />
  );
};

export default StudentSort;

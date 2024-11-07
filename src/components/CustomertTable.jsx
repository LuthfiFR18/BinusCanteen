import React, { useState } from 'react';
import '../style/CustomerTable.css';

const CustomerTable = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-customer-container">
      <button
        className={`dropdown-customer-button ${isOpen ? 'active' : ''}`}
        onClick={toggleDropdown}
      >Customer
        {/* {isOpen ? 'Hide Table' : 'Show Table'} */}
      </button>
      <div className={`dropdown-customer-table ${isOpen ? 'open-customer-table' : 'closed-customer-table'}`}>
        <table className='customer-table'>
          <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>01</td>
                <td>Jhon</td>
                <td>jhon@gmail.com</td>
                <td>12345</td>
                <td>081112223844</td>
                <td>customer</td>
                <td>
                    <button className='customer-table-update'>Update</button>
                    <button className='customer-table-delete'>Delete</button>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
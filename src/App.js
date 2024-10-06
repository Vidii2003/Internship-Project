// src/App.js
import React, { useState } from 'react';
import './App.css'; // Optional: for custom styling

const App = () => {
  // Sample member list data with default role as 'Member'
  const [members, setMembers] = useState([
    { id: 123, name: 'Janya', phone: '9834567234', role: 'Member' },
    { id: 222, name: 'Kiran', phone: '9874567823', role: 'Member' },
    { id: 444, name: 'Joshuva', phone: '8902345678', role: 'Member' },
    { id: 544, name: 'Moses', phone: '89023456567', role: 'Member' },
    { id: 444, name: 'Johan', phone: '8911145678', role: 'Member' },
    // Add more members here
  ]);

  // State to hold filter values
  const [filter, setFilter] = useState({
    id: '',
    name: '',
    phone: ''
    // place: '',
    // email: ''
  });

  // Function to handle changes in the filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };

  // Function to handle role change
  const handleRoleChange = (e, memberId) => {
    const { value } = e.target;
    const updatedMembers = members.map((member) => {
      if (member.id === memberId) {
        if (member.role !== value) {
          alert(`${member.name} role changed from ${member.role} to ${value}`);
        }
        return { ...member, role: value }; // Update role
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  // Function to filter the member list based on input
  const filteredMembers = members.filter((member) => {
    return (
      member.id.toString().includes(filter.id) &&
      member.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      member.phone.includes(filter.phone)
      // member.place.toLowerCase().includes(filter.place.toLowerCase()) &&
      // member.email.toLowerCase().includes(filter.email.toLowerCase())
    );
  });

  return (
    <div className="App">
      <h1>Member List</h1>

      {/* Filter Inputs */}
      <div className="filter-container">
        <input
          type="text"
          name="id"
          placeholder="Filter by ID"
          value={filter.id}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Filter by Phone"
          value={filter.phone}
          onChange={handleFilterChange}
        />
        {/* <input
          type="text"
          name="place"
          placeholder="Filter by Place"
          value={filter.place}
          onChange={handleFilterChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Filter by Email"
          value={filter.email}
          onChange={handleFilterChange}
        /> */}
      </div>

      {/* Table for displaying members */}
      <table className="member-table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td>
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(e, member.id)}
                  >
                    <option value="SuperAdmin">SuperAdmin</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No members found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;

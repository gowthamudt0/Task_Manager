import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AssignList = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('assign');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const user = jwtDecode(token);
        const userid=user.userid
        console.log(userid)

        const response = await axios.get(`http://localhost:4000/get/${userid.userid}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateUser = async (taskmanagementid) => {
    try {
      const response = await axios.put(`http://localhost:4000/updateuser/${taskmanagementid}`, { status });

      if (response.status === 200) {
        alert('Update successful');
      }
    } catch (error) {
      console.error('Error updating task status:', error.message);
      alert('Failed to update task status');
    }
  };

  return (
    <div className="reg1">
    <h1>GET Task</h1>
    <table className="user-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.titlel}</td>
            <td>{user.description}</td>
            <td>
              <select id="status" onChange={handleStatusChange}>
                <option></option>
                <option value="progress">Progress</option>
                <option value="completed">Completed</option>
              </select>
            </td>
            <td>
              <button onClick={() => handleUpdateUser(user.taskmanagementid)}>Update status</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default AssignList;

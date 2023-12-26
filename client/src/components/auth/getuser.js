import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { state } = useLocation();
  const taskid = state ? state.taskid : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getuser');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching Users:', error.message);
      }
    };

    fetchData();
  }, []);

  const assigned = async (userid) => {
    try {
      const response = await axios.post('http://localhost:4000/create', {
        taskid,
        userid,
      });

      if (response.status === 200) {
        alert('Assigned');
        window.location="/taskassign"
      }
    } catch (error) {
      console.error('Error assigning task:', error.message);
      alert('Failed to assign');
    }
  };

  return (
    <div className="reg1">
      <h1>User List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
              <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.useremail}</td>
              <td>
                <button className='button1' onClick={() => assigned(user.userid)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

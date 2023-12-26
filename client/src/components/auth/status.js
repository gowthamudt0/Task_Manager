import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TakeStatus = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getalltask');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className="reg1">
      <h1>Task List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Username</th>
            <th>Status</th>
            
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.titlel}</td>
              <td>{task.description}</td>
              <td>{task.username}</td>
              <td>{task.status}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TakeStatus;

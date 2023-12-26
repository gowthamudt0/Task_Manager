import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [titlel, setTitlel] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");

  const createUser = async () => {
    try {
      
      if (!titlel|| !description || !deadline ) {
        setError("All fields are required");
        return;
      }

      const response = await axios.post('http://localhost:4000/task', {
        titlel,
        description,
        deadline,
      
      });

      if (response.status === 200) {
        alert('Task created successfully');
        setError(""); 
      } else if (response.status === 409) {
        alert('Task already exists');
        
      } else {
        alert('Failed to create user');
        setError("Failed to create user");
      }
    } catch (error) {
      console.error('Internal server error:', error);
      setError("Internal server error");
    }
  };

  return (
    <div className="reg">
      <h1>Create Task</h1>
      <label>Title:
        <input type="text" name="titlel" value={titlel} onChange={(e) => setTitlel(e.target.value)} />
      </label>
      <br />
      <label>Description:
        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <label>Deadline:
        <input type="date" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      </label>
      <br />
      
      <br />
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default CreateTask;

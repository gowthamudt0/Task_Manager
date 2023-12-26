import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const createUser = async () => {
    try {
      
      if (!useremail || !username || !userpassword) {
        setError("All fields are required");
        return;
      }

      const response = await axios.post('http://localhost:4000/insert', {
        useremail,
        username,
       userpassword,
      });

      if (response.status === 200) {
        alert('User created successfully');
        setError(""); 
      } else if (response.status === 409) {
        alert('User already exists');
        setError("User already exists. Please choose a different email or username.");
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
      <h1>Create User</h1>
      <label>Email:
        <input type="text" name="useremail" value={useremail} onChange={(e) => setUseremail(e.target.value)} />
      </label>
      <br />
      <label>Username:
        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>Password:
        <input type="password" name="userpassword" value={userpassword} onChange={(e) => setUserPassword(e.target.value)} />
      </label>
      <br />
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default CreateUser;

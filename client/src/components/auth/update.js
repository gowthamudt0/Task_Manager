import React, { useState } from 'react';
import axios from 'axios';

const EditUser = () => {
  const [useremail, setUseremail] = useState("");
  const [username, setUsername] = useState("");
  const [userpassword, setUserPassword] = useState("");

  const updateUser = async () => {
    try {
      const response = await axios.put('http://localhost:4000/update', {
        useremail,
        username,
        userpassword,
      });

      if (response.status === 200) {
        alert('Update successful');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Internal server error:', error);
    }
  };

  return (
    <div className="reg">
      <h1>Update User</h1>
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
      <button onClick={updateUser}>Update</button>
    </div>
  );
};

export default EditUser;

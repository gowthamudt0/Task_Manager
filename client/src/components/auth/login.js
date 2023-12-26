import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [useremail, setUserEmail] = useState('');
  const [userpassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
 const navigate=useNavigate()
  const handleLogin = async () => {
    try {
      if (!useremail || !userpassword) {
        setError('Please enter both email and password.');
        return;
      }

      const response = await axios.post('http://localhost:4000/login', {
        useremail,
        userpassword,
      });

      const tokens = response.data.token;
      const user = jwtDecode(tokens);
      sessionStorage.setItem('token', tokens);
      console.log(user)
      if (user.userrole === 'admin') {
        window.location = '/user';
        alert("Login sucessfully as admin")
      }else{
         window.location='/usertask'
         alert("Login sucessfully as user")
    
      }
    } catch (error) {
      alert('Invalid email or password. Please try again.');
      console.log('Error:', error.message);
    }
  };

  return (
    
    <div className="login-container">

      <h2>Login</h2>

      <form className='form1'>
        <label>Email:</label>
        <input
          type="email"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={userpassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <br />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
      
    </div>
   
  );
};

export default Login;

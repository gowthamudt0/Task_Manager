import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const AdminSidebar = (token) => {
  
  function logout(){
    sessionStorage.clear(token)
    window.location="/"
  }
  return (
    <div className="sidebar">
        <h1 className='admin'>Admin</h1>
      <ul>
        <li>
          <Link to="/user">Create Account</Link>
        </li>
        <li>
          <Link to="/edit">Edit User</Link>
        </li>
        <li>
          <Link to="/task">create a task</Link>
        </li>
        <li>
          <Link to="/taskassign">task assign</Link>
        </li>
        <li>
          <Link to="/status">check status</Link>
        </li>
        <button onClick={logout}>logout</button>
      </ul>
    </div>
  );
};

const UserSidebar = (token) => {
  function logout(){
    sessionStorage.clear(token)
    window.location="/"
  }
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/usertask">Get Task</Link>
        </li>
        <button onClick={logout}>logout</button>
      </ul>
    </div>
  );
};

const Sidebar = () => {
  const token = sessionStorage.getItem("token");
  const user1 = jwtDecode(token);
  // console.log(user1)

  return user1.userrole === "admin" ? <AdminSidebar /> : <UserSidebar />;
};

export default Sidebar;

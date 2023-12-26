
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import CreateUser from './components/auth/signup';
import UserList from './components/auth/getuser';
import Sidebar from './components/auth/navbar'; 
import EditUser from './components/auth/update';
import CreateTask from './components/auth/cratetask';
import TaskList from './components/auth/taskassign'
import AssignList from './components/auth/user';
import TakeStatus from './components/auth/status'
import "../src/style.css"

function App() {
  return (
    <>
      <Router>
        {sessionStorage.token !== null && sessionStorage.token !== undefined ? (
          <div className="app">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/getuser" element={<UserList />} />
                <Route path="/user" element={<CreateUser/>} />
                <Route path="/edit" element={< EditUser/>} />
                <Route path="/task" element={< CreateTask/>} />
                <Route path="/taskassign" element={<TaskList/>} />
                <Route path="/usertask" element={<AssignList/>} />
                <Route path="/status" element={<TakeStatus/>} />

              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route exact path="/" element={<Login />} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;

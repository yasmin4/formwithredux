import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import Navbar from './componet/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './authentication/RequireAuth';


const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          </Route>
        </Switch>
      </Router>
     
      </div>
  );
}

export default App;

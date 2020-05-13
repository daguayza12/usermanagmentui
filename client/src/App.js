import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import Home from './components/pages/Home';
import Logout from './components/pages/Logout';
import UserState from './context/user/UserState';
const App = () => {
  return (
    <UserState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/logout' component={Logout} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </UserState>
  );
};

export default App;

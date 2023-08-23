import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

// Importing all the componetns.
import AddReview from './components/add-review.js';
import Login from './components/login.js';
import RestaurantsList from './components/restaurants-list.js';
import Restaurants from './components/restaurants.js';
import Navbar from './components/Navbar.js';

function App() {

  const [user, setUser] = useState(null);

  async function login(user = null){
    setUser(user);
  }

  async function logout(){
    setUser(null);
  }

  return (
    <>
        <Router>
          <Navbar title="Restaurants Review" logout={logout} user={user}/>
          <Routes>
            <Route exact path='/' Component={RestaurantsList}/>
            <Route exact path='/restaurants' Component={RestaurantsList}/>
            <Route exact path='restaurants/:id/review' element={<AddReview user={user}/>}/>
            <Route exact path='/restaurants/:id' element = {<Restaurants user={user}/>}/>
            <Route exact path='/login' element = {<Login login={login}/>}/>
          </Routes>
        </Router>
    </>
  );
}

export default App;

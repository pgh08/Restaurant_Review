import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Buffer } from 'buffer';


// Importing all the componetns.
import AddReview from './components/add-review.js';
import Login from './components/login.js';
import RestaurantsList from './components/restaurants-list.js';
import Restaurants from './components/restaurants.js';
import Navbar from './components/Navbar.js';
import Register from './components/Register.js';
import Alert from './components/alert.js';
import Dashboard from './components/Dashboard.js';

global.Buffer = Buffer;

function App() {

  const [userEmail, setUserEmail] = useState(null);
  const [alert, setAlert] = useState(null);
  const [reviewId, setReviewId] =useState(null);
  const [userName, setUserName] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      typ: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 3000);
  }

  const handleLogin = (email, name) => {
    if(email){
      setUserEmail(email);
      setUserName(name);
    }
    else{
      setUserEmail(null);
      setUserName(null);
    }
  }

  const updateReviewId = (reviewId) => {
    if(reviewId){
      setReviewId(reviewId);
    }
    else{
      setReviewId(null);
    }
  }

  return (
    <>
        <Router>
          <Navbar title="Restaurants Review" handleLogin={handleLogin} userName={userName} showAlert={showAlert}/>
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={<RestaurantsList updateReviewId={updateReviewId} />} />
            <Route exact path='/restaurants' element={<RestaurantsList updateReviewId={updateReviewId} />} />
            <Route exact path='restaurants/:id/review' element={<AddReview userEmail={userEmail} showAlert={showAlert} updateReviewId={updateReviewId} userName={userName} />}/>
            <Route exact path='/restaurants/:id' element={<Restaurants userEmail={userEmail} showAlert={showAlert} reviewId={reviewId} updateReviewId={updateReviewId} />}/>
            <Route exact path='/restaurants/login' element={<Login handleLogin={handleLogin} userEmail={userEmail} showAlert={showAlert}/>}/>
            <Route exact path='/restaurants/register' element={<Register showAlert={showAlert} />} />
            <Route exact path='/restaurants/dashboard' element={<Dashboard userEmail={userEmail} userName={userName} showAlert={showAlert} />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;

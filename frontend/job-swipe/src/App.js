import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Swipe from './component/Swipe';
import SwipeableCards from './component/SwipeableCards';
import NewJobApplication from './component/NewJobApplication';
import Navbar from './component/Navbar';
import JobBoard from './component/JobBoard';
import JobSwipe from './component/JobSwipe';
import Header from './component/Header';
import Dashboard from './component/Dashboard';
import Register from './component/Register';
import Login from './component/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    // <Swipe></Swipe>
    // <NewJobApplication></NewJobApplication>
    // <Navbar></Navbar>
    // <JobBoard></JobBoard>
    // <Swipe></Swipe>
      // <NewJobApplication></NewJobApplication>
      // <Navbar></Navbar>
      // <JobBoard></JobBoard>
    <>
      <Router>

      <Routes>
          
          <Route exact path="/" element={<Login></Login>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
     
      </Router>
      </>
    // <JobSwipe></JobSwipe>
  );
}


export default App;

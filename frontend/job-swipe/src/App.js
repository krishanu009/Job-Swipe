import logo from "./logo.svg";
import "./App.css";
import Home from "./component/Home";
import Swipe from "./component/Swipe";
import SwipeableCards from "./component/SwipeableCards";
import NewJobApplication from "./component/NewJobApplication";
import Navbar from "./component/Navbar";
import JobBoard from "./component/JobBoard";
import JobSwipe from "./component/JobSwipe";
import Header from "./component/Header";
import Dashboard from "./component/Dashboard";
import Register from "./component/Register";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import CandidateLogin from "./component/CandidateLogin";
import RecruiterLogin from "./component/RecruiterLogin";
import RecruiterDashboard from "./component/RecruiterDashboard";
import ApplicationSwipe from "./component/ApplicationSwipe";
import ShortListed from "./component/ShortListed";
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
          <Route exact path="/" element={<LandingPage></LandingPage>} />

          <Route
            exact
            path="/candidateLogin"
            element={<CandidateLogin></CandidateLogin>}
          />
          <Route
            exact
            path="/recruiterLogin"
            element={<RecruiterLogin></RecruiterLogin>}
          />
          <Route path="/candidateRegister" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/recruiterDashboard"
            element={<RecruiterDashboard></RecruiterDashboard>}
          ></Route>
          <Route
            path="/applications"
            element={<ApplicationSwipe></ApplicationSwipe>}
          ></Route>
          <Route
            path="/shortlisted"
            element={<ShortListed></ShortListed>}
          ></Route>
        </Routes>
      </Router>
    </>
    // <JobSwipe></JobSwipe>
  );
}

export default App;

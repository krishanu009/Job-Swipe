import React, { useState } from "react";
import JobSwipe from './JobSwipe'
import Header from './Header'
import NewJobApplication from "./NewJobApplication";
import Home from "./Home";

function Dashboard() {
    const [selectedPage, setSelectedPage] = useState("home");
  return (
    <>
      <div className="sticky top-0 z-10">
        <Header selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      </div>
      <div className="p-8 relative z-0">
        {selectedPage === 'job' && <JobSwipe />}
        {selectedPage === 'profile' && <NewJobApplication></NewJobApplication>}
        {selectedPage ==='home' && <Home></Home>}
      </div>
    </>
  )
}

export default Dashboard

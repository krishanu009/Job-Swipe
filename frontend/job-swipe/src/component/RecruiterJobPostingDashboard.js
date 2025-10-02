import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PostedApplication from "./PostedApplication";
import ApplicationSwipe from "./ApplicationSwipe";
import ShortListed from "./ShortListed";
import NewJob from "./NewJob";

function RecruiterJobPostingDashboard({ userInfo }) {
  const [selectedPage, setSelectedPage] = useState("postedJobs");
  const [selectedJob, setSelectedJob] = useState([]);

  const handleBackButton = () => {
    setSelectedPage("postedJobs");
  };
  return (
    <>
      {selectedPage != "postedJobs" ? (
        <div
          className="hover:cursor-pointer pl-8 fixed z-50 "
          onClick={handleBackButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="white"
            class="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </div>
      ) : null}

      <div className="relative z-0">
        {selectedPage === "postedJobs" && (
          <PostedApplication
            userInfo={userInfo}
            setSelectedJob={setSelectedJob}
            setSelectedPage={setSelectedPage}
          ></PostedApplication>
        )}
        {selectedPage === "applicationSwipe" && (
          <ApplicationSwipe
            userInfo={userInfo}
            jobId={selectedJob}
          ></ApplicationSwipe>
        )}
        {selectedPage === "shortlisted" && (
          <ShortListed jobId={selectedJob}></ShortListed>
        )}
        {selectedPage === "newjob" && (
          <NewJob userInfo={userInfo} selectedJob={selectedJob}></NewJob>
        )}
      </div>
    </>
  );
}

export default RecruiterJobPostingDashboard;

import React, { useState, useEffect } from "react";
import "../styling/swipe.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ShortListed({jobId}) {
  const location = useLocation();

  // const { userInfo, jobId } = location.state || {};

  const [shortListedCandidates, setShortListedCandidates] = useState([]);

  useEffect(() => {
    // getMyJobs();
    getApplications();
  }, []);
  const getApplications = async () => {
    let payload = {
      applicationStatus: "shortlisted",
    };
    // console.log(
    //   "here getApplications",
    //   process.env.REACT_APP_JOB_APPLICATIONS,
    //   jobId
    // );
    await axios
      .post(process.env.REACT_APP_JOB_APPLICATIONS + "/" + jobId, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("RecruiterToken"),
        },
      })
      .then((res) => {
        console.log("getApplications", res);
        let newJobData = res.data.jobApplications;
        console.log("newJobData", newJobData);
        if (newJobData?.length) {
          setShortListedCandidates(newJobData);
//           setShortListedCandidates( [
//     {
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },
//     {
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },
//     {
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },
//     {
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },
//     {
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     },{
//         "_id": "66f0834dacb7105671917d3f",
//         "firstName": "Krishanu",
//         "lastName": "Deb",
//         "email": "krish@test.com",
//         "phone": "12345678",
     
        
//     }
// ]);
          // newJobData.splice(0, 1);
        }
      })
      .catch((e) => {
        console.log("getApplications error", e);
      });
  };

  return (
  <div className="h-screen p-16 bg-[#12121E] text-white">
  {shortListedCandidates.length === 0 ? (
    <div className="flex flex-col justify-center items-center h-full text-center text-white space-y-4">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="text-red-400"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
    />
  </svg>
  <h2 className="text-xl font-semibold">No Candidates Found</h2>
  <p className="text-gray-400 max-w-md">
    We couldn't find any shortlisted candidates. Please try again later or refine your search.
  </p>
</div>
  ) : (
    <div className="h-full overflow-y-auto pr-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shortListedCandidates.map((item, index) => (
          <div
            key={index}
            className="min-h-[150px] p-4 bg-white text-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <h5 className="mb-2 text-xl font-semibold">
              {item.firstName} {item.lastName}
            </h5>
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Email: {item.email}
              <br />
              Phone: {item.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  )}
</div>


  );
}

export default ShortListed;

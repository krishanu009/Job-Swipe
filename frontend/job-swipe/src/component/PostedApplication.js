import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PostedApplication({userInfo,setSelectedJob,setSelectedPage}) {

  console.log("PostedApplication userinfo",userInfo);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [showJobModal,setShowJobModal] = useState(false);
  useEffect(() => {
    getPostedApplication();
  }, []);

  const getPostedApplication = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_CREATED_JOB, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("RecruiterToken")}`,
        },
      });
      console.log("getPostedApplication", response.data);
      setCreatedJobs(response.data.data);
    } catch (error) {
      console.error("Error:", error.response || error.message);
      console.error("Full Error Object:", error);
    }
  };

  const updateJob = async (jobId,payload) => {
    try {
     
      const response = await axios
        .post(process.env.REACT_APP_UPDATE_JOB + "/" + jobId , payload, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("RecruiterToken"),
          },
        })
        .then((res) => {
          console.log("updateJob response data", res.data);
        })
        .catch((e) => {
          console.log("updateJob error", e);
        });
    } catch (e) {
      console.log("err@ updateJob", e);
    }
  };

  function formatDate(inputDate) {
    // Ensure the input date string is properly formatted
    const formattedDate = inputDate.replace(
      /(\d{4})-(\d{1})-(\d{2})/,
      (match, p1, p2, p3) => `${p1}-${p2.padStart(2, "0")}-${p3}`
    );

    // Create a Date object from the formatted string
    const date = new Date(formattedDate);

    // Check if the date is valid
    if (isNaN(date)) {
      return "Invalid date";
    }

    // Define options for the date format
    const options = {
      weekday: "long", // e.g., "Monday"
      year: "numeric", // e.g., "2025"
      month: "long", // e.g., "March"
      day: "numeric", // e.g., "2"
      //   hour: 'numeric', // e.g., "5"
      //   minute: 'numeric', // e.g., "25"
      //   second: 'numeric', // e.g., "50"
      //   timeZoneName: 'short', // e.g., "UTC"
    };

    // Return the formatted date string
    return date.toLocaleString("en-US", options);
  }

  const handleStatusChange = async(e, id) => {
    const isChecked = e.target.checked;
    
    let payload ={
        jobStatus: isChecked ? "active" : "inactive"
    }
   await updateJob(id,payload);
    // console.log(
    //   `Item ID: ${id}, New Status: ${isChecked ? "Active" : "Inactive"}`
    // );
    await getPostedApplication();
  };

  const handleJobSelect = (job) => {
    console.log("handleJobSelect job",job);
    setSelectedJob(job);
setSelectedPage("applicationSwipe");
  }

   const handleShortlistSelect = (job) => {
    console.log("handleJobSelect job",job);
    setSelectedJob(job);
setSelectedPage("shortlisted");
  }

 const handleNewJobModal = () => {
   setShowJobModal(!showJobModal)
 }

  return (

    <><div>

    </div>
    
    <div className="pl-16 pr-16">
        <div className="pb-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            New Job
          </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Deadline
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Applications
                </th>
                <th scope="col" className="px-6 py-3">
                  Shortlisted
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {createdJobs.map((item) => (
                <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.position}
                  </th>
                  <td className="px-6 py-4">{formatDate(item.deadline)}</td>
                  <td className="px-6 py-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        name={item._id}
                        onChange={(e) => handleStatusChange(e, item._id)}
                        checked={item.jobStatus === "active"}
                        type="checkbox"
                        className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {item.jobStatus === "active" ? "Active" : "Inactive"}
                      </span>
                    </label>
                  </td>
                  <td className="px-6 py-4 text-blue-600 dark:text-yellow-500 hover:cursor-pointer" onClick={(event) => {
                    handleJobSelect(item._id);
                  } }>
                    {/* <Link
              to={{
                pathname: `/applications`,
              }}
              state={{ userInfo: userInfo,jobId:item._id }}
            >
              {item.applicantsCount}
            </Link> */}

                    {item.applicantsCount}
                  </td>

                  <td className="px-6 py-4 text-blue-600 dark:text-green-500 hover:cursor-pointer" onClick={(e) => {
                    handleShortlistSelect(item._id);
                  } }>
                    {/* <Link
              to={{
                pathname: `/shortlisted`,
              }}
              state={{ userInfo: userInfo,jobId:item._id }}
            >
              {item.shortlisted}
            </Link> */}
                    {item.shortlisted}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div></>
  );
}

export default PostedApplication;

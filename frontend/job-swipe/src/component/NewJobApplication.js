import React, { useEffect, useState } from "react";
import "../styling/jobapplication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewJobApplication({ logout, userInfo, getUser }) {
  const navigate = useNavigate();
  const [educationData, setEducationData] = useState([]);
  const [currentEducationData, setCurrentEducationData] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [currentCompanyData, setCurrentCompanyData] = useState();
  const [companyName, setCompanyName] = useState();
  const [position, setCompanyPosition] = useState();
  const [startDate, setCompanyStartDate] = useState();
  const [endDate, setCompanyEndDate] = useState();
  const [roleDescription, setCompanyDescription] = useState();

  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [projectData, setProjectData] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [domain, setDomain] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setPojectLiveLink] = useState("");
  const [description, setPojectDescription] = useState("");
  const [errorProjectText, setProjectErrorText] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updatingUser,setUpdatingUser] = useState(false);
  useEffect(() => {
    if (!userInfo) return;
    setFirstName(userInfo.firstName);
    setLastName(userInfo.lastName);
    setPhone(userInfo.phone);
    setEmail(userInfo.email);
    setProjectData(userInfo.project);
    setCompanyData(userInfo.experiance);
  }, [userInfo]);

  const handleAddCompany = () => {
    if (!currentlyWorking && !endDate) {
      setErrorText("Please enter the end date");
      return;
    }
    if (!companyName) {
      setErrorText("Please enter company name");
      return;
    }
    if (!startDate) {
      setErrorText("Please enter start date");
      return;
    }
    if (!position) {
      setErrorText("Please enter company position");
      return;
    }

    let currCompanyData = [...companyData];

    currCompanyData.push({
      companyName,
      startDate,
      endDate,
      roleDescription,
      current: currentlyWorking,
    });

    setCompanyData(currCompanyData);
    setCompanyPosition("");
    setCompanyName("");
    setCompanyStartDate("");
    setCompanyEndDate("");
    setCompanyDescription("");
    setCurrentlyWorking(false);
    setErrorText("");
  };

  const removeCompany = (item) => {
    let currCompanyData = companyData.filter((el) => el !== item);

    setCompanyData(currCompanyData);
  };

  const handleAddProject = () => {
    if (!projectName) {
      setProjectErrorText("Please enter a project name");
      return;
    }
    if (!domain) {
      setProjectErrorText("Please enter a project domain");
      return;
    }

    if (!description) {
      setProjectErrorText("Please enter a project description");
      return;
    }

    let currentProjectData = [...projectData];

    currentProjectData.push({
      projectName,
      domain,
      githubLink,
      liveLink,
      description,
    });
    setProjectData(currentProjectData);
    setProjectName("");
    setDomain("");
    setGithubLink("");
    setPojectLiveLink("");
    setPojectDescription("");
    setProjectErrorText("");
  };

  const removeProject = (item) => {
    let currProjectData = projectData.filter((el) => el !== item);

    setProjectData(currProjectData);
  };
  const updateUser = async () => {
    let payload = {
      firstName,
      lastName,
      email,
      phone,
      experiance:companyData,
      project:projectData
    }
    setUpdatingUser(true);
    await axios.post(process.env.REACT_APP_UPDATE_USER_BY_ID + "/" + userInfo._id, payload, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
    .then((res) => {
    
      console.log("updateUser", res.data);
      getUser();
      setUpdatingUser(false);
    })
    .catch((e) => {
      console.log(e);
      setUpdatingUser(false);
    
    });
  };

  function formatDate(isoString) {
    const date = new Date(isoString);
    
    const options = { 
        month: 'short', // Short month name like 'Sep'
        day: 'numeric', // Day of the month
        year: 'numeric' // Full year
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

  return (
    <div className="h-full bg-black pt-16 main pb-[30%]">
      <form class="max-w-md mx-auto">
        {/* <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div> */}
        <h2>Basic info</h2>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First name
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last name
            </label>
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="tel"
              
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
            disabled
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
        </div>
        <h2>Experiance</h2>
        {/* company info entered */}
        <div className="overflow-auto max-h-96 space-y-2">
          {companyData.map((item) => (
            <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div
                onClick={(e) => {
                  removeCompany(item);
                }}
                className="float-right cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-x-octagon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                </svg>
              </div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.companyName}
              </h5>

              <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
                {item.position} ({formatDate(item.startDate)} -{" "}
                {item.endDate ? formatDate(item.endDate) : "Present"})
                <br />
                {item.roleDescription}
                <br />
              </p>
            </div>
          ))}
        </div>

        {/* company info entered */}
        {/* new conpany info */}
        <div class="grid md:grid-cols-2 md:gap-6 pt-16">
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              value={companyName}
              type="text"
              name="company_name"
              id="company_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="company_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Comany Name
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setCompanyPosition(e.target.value);
              }}
              value={position}
              type="text"
              name="position"
              id="position"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="position"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Position
            </label>
          </div>
        </div>

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setCompanyStartDate(e.target.value);
              }}
              value={startDate}
              type="date"
              name="start_date"
              id="start_date"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="start_date"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Start Date
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setCompanyEndDate(e.target.value);
              }}
              value={endDate}
              disabled={currentlyWorking}
              type="date"
              name="end_date"
              id="end_date"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="end_date"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              End Date
            </label>
          </div>

          <div class="flex items-center mb-4">
            <input
              onChange={(e) => {
                setCurrentlyWorking(!currentlyWorking);
              }}
              checked={currentlyWorking}
              id="currently_working"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="currently_working"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Working
            </label>
          </div>
        </div>

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="col-span-2 relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setCompanyDescription(e.target.value);
              }}
              value={roleDescription}
              type="text"
              name="role_description"
              id="role_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="role_description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Role description
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <button
              onClick={handleAddCompany}
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Add
            </button>
          </div>
        </div>
        <p className="text-red-500">{errorText}</p>
        {/* new conpany info */}
        <h2>Projects</h2>

        {/* entered projects info */}
        <div className="overflow-auto max-h-96 space-y-2">
          {projectData.map((item) => (
            <div class="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div
                onClick={(e) => {
                  removeProject(item);
                }}
                className="float-right cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-x-octagon-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                </svg>
              </div>
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.projectName}
              </h5>

              <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
                {item.domain}
                <br />
                {item.githubLink}
                <br />
                {item.liveLink}
                <br />
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* entered projects info */}
        {/* new projects info */}

        <div class="grid md:grid-cols-2 md:gap-6 pt-16">
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
              value={projectName}
              type="text"
              name="project_name"
              id="project_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="project_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project name
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setDomain(e.target.value);
              }}
              value={domain}
              type="text"
              name="domain"
              id="domain"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="position"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Domain
            </label>
          </div>
        </div>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setGithubLink(e.target.value);
              }}
              value={githubLink}
              type="text"
              name="project_github_link"
              id="project_github_link"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="start_date"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Github link
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setPojectLiveLink(e.target.value);
              }}
              value={liveLink}
              type="text"
              name="project_link"
              id="project_link"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="project_link"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Hosted live link
            </label>
          </div>
        </div>

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="col-span-2 relative z-0 w-full mb-5 group">
            <input
              onChange={(e) => {
                setPojectDescription(e.target.value);
              }}
              value={description}
              type="text"
              name="project_description"
              id="project_description"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              
            />
            <label
              for="project_description"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Project description
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <button
              onClick={handleAddProject}
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Add
            </button>
          </div>
        </div>
        <p className="text-red-500">{errorProjectText}</p>

        {/* new projects info */}

        <div class="grid md:grid-cols-3 md:gap-6">
          <div class="col-span-2 relative z-0 w-full mb-5 group space-x-4">
            <button
            disabled = {updatingUser}
            type="button"
            onClick={(e) => {updateUser()}}
             
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save changes
            </button>

            <button
            type="button"
              onClick={(e) => {
                logout();
              }}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log out
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewJobApplication;

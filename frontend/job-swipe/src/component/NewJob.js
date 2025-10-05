import React, { useEffect, useState } from "react";
import "../styling/jobapplication.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NewJob({userInfo, setSelectedPage}) {
  console.log("new job user info",userInfo)
  const [skills, setSkills] = useState([]);
  const [position, setPosition] = useState();
  const [deadline, setDeadline] = useState();
  const [roleDescription, setRoleDescription] = useState();
  const [errorText, setErrorText] = useState();
  const [skillInput, setSkillInput] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const removeSkill = (item) => {
    let findobj = skills.find((el) => el == item);

    if (findobj) {
      let newSkills = skills.filter((el) => el != item);
      setSkills(newSkills);
    }
  };

  const addNewSkill = () => {
    if (!skillInput) return;
    let findobj = skills.find((el) => el == skillInput);

    if (findobj) {
      setErrorText("Skill already added!");
      return;
    }

    let newSkills = [...skills];
    newSkills.push(skillInput);
    setSkills(newSkills);
    setSkillInput("");
    setErrorText("");
  };
  const handleAddNewJob = async () => {

    if(!position || !deadline || !roleDescription || !skills.length)
    {
      setErrorText("All the fields are required!")
      return;
    }
    setErrorText("");
    let payload = {
      position,
      deadline,
      hrId:userInfo._id,
      company:userInfo.company,
      roleDescription,
     applicantsCount:"0",
     jobDescription:"",
      skillsRequired:skills,
      jobStatus:"active",
      postingDate:new Date(),
      companyImage:userInfo.companyImage

    };
    console.log("API", process.env.REACT_APP_CREATE_NEW_JOB);
   console.log("payload", payload);
    setDisableButton(true);

    await axios.post(process.env.REACT_APP_CREATE_NEW_JOB,payload,{
      headers:{Authorization:"Bearer "+localStorage.getItem("RecruiterToken"),
         "Content-Type": "application/json"
      }
    }).then((res)=>{
      console.log("new job", res.data);
      setSelectedPage('postedJobs');
    }).catch((e) => {
      console.log("err@ handleAddNewJob", e);
      setErrorText("Error in creating new job!");
    })

    setDisableButton(false);
  };
  return (
    <div className="h-full bg-black pt-16 main pb-[30%]">
      <form class="max-w-md mx-auto">
        <h2>New Job</h2>
        <div class="grid md:grid-cols-1 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
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
              Position
            </label>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
              }}
              type="date"
              name="floating_last_name"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Deadline
            </label>
          </div>

          <div class="relative z-0 w-full mb-5 group">
            <input
              value={roleDescription}
              onChange={(e) => {
                setRoleDescription(e.target.value);
              }}
              type="textarea"
              rows="4"
              cols="50"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Role Description
            </label>
          </div>

          {/* skills entered */}
          <div className="overflow-auto max-h-96 space-y-2">
            {skills.map((item) => (
              <div class="max-w-sm p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div
                  onClick={(e) => {
                    removeSkill(item);
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
                  {item}
                </h5>
              </div>
            ))}
          </div>

          {/* new skills to add */}

          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="col-span-2 relative z-0 w-full mb-5 group">
              <input
                onChange={(e) => {
                  setSkillInput(e.target.value);
                }}
                value={skillInput}
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
                Skill
              </label>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <button
                onClick={addNewSkill}
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Add
              </button>
            </div>
          </div>
          <p className="text-red-500">{errorText}</p>

          {/* new skills to add */}

          {/* <div class="relative z-0 w-full mb-5 group">
            <input
              // value={firstName}
              // onChange={(e) => {
              //   setFirstName(e.target.value);
              // }}
              type="textarea"
              rows="4"
              cols="50"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Job Description
            </label>
          </div> */}

          <div class="grid md:grid-cols-3 md:gap-6">
            <div class="col-span-2 relative z-0 w-full mb-5 group space-x-4">
              <button
                disabled = {disableButton}
                type="button"
                onClick={(e) => {handleAddNewJob()}}

                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Post
              </button>

              {/* <button
            type="button"
              onClick={(e) => {
                logout();
              }}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log out
            </button> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewJob;

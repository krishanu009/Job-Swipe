import React, { useState, useEffect } from "react";
import "../styling/swipe.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
function ApplicationSwipe({userInfo,jobId}) {
  const location = useLocation();
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [screenX, setScreenX] = useState(0);
  const [position, setPosition] = useState(550);
  const [rotation, setRotation] = useState(0);
  const [selection, setSelection] = useState("not-selected");
  const [showAcceptImage, setShowAcceptImage] = useState(false);
  const [showRejecttImage, setShowRejecttImage] = useState(false);
  const [currentJobApplication, setCurrentJobApplication] = useState("");
  // const { userInfo, jobId } = location.state || {};
  // console.log("erehere",{userInfo,jobId});

  // const [jobData, setJobData] = useState([
  //   {
  //     id: "1",
  //     company: "Google",
  //     image:"https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK",
  //     tags: "Ai, SWE, Javascript, Python",
  //     position: "SDE",
  //     summary:
  //       "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  //   {
  //     id: "2",
  //     company: "Microsoft",
  //     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnB4S_PLzShRNMQHMpKdvaC5CpoG3RBcR3dA&s",
  //     tags: "Ai, Machin learning",
  //     position: "ML Engineer",
  //     summary:
  //       "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  //   {
  //     id: "3",
  //     company: "Open Ai",
  //     image:"https://meta-q.cdn.bubble.io/f1711468032745x149459509062566560/openai-2.svg",
  //     tags: "Ai, NLP",
  //     position: "AI Engineer",
  //     summary:
  //       "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  //   {
  //     id: "4",
  //     company: "Tesla",
  //     image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/800px-Tesla_Motors.svg.png",
  //     tags: "Web Dev",
  //     position: "SDE",
  //     summary:
  //       "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   },
  // ]);
  const [applicationData, setApplicationData] = useState([]);
  const [resumeShortlisted, setResumeShortlisted] = useState([]);
  const [resumeRejected, setResumeRejected] = useState([]);

  const cardWidth = 400;
  const halfCardWidth = cardWidth / 2;
  const maxTilt = 20;

  useEffect(() => {
    // getMyJobs();
    getApplications();
  }, []);

  // useEffect(()=>{
  //  if(jobData && !jobData?.length)
  //  {

  //  }
  // },[jobData])

  useEffect(() => {
    setIsVisible(!screenX);

    if (screenX > 950) return;
    if (screenX < 500) return;
    const newPosition = Math.min(
      Math.max(screenX - halfCardWidth, 0),
      window.innerWidth - cardWidth
    );
    setPosition(newPosition);

    const newRotation = Math.min(
      Math.max((screenX - window.innerWidth / 2) / 20, -maxTilt),
      maxTilt
    );
    setRotation(newRotation);
  }, [screenX]);

  useEffect(() => {
    if (selection === "neutral") return;
  }, [selection]);

  const handleApplyJob = () => {
    if (!selection) return;

    if (selection === "reject") {
      rejectJobApplication();
    } else if (selection === "accept") {
      applyJobApplication();
    }
  };

  const rejectJobApplication = async () => {
    if (!currentJobApplication) return;

    //logic for api call to select resume

    let payload = {
      jobId: jobId,
      candidateId: currentJobApplication._id,
      applicationStatus: "rejected",
    };

    console.log("applyJobApplication payload", payload);
    await axios
      .post(process.env.REACT_APP_UPDATE_JOB_APPLICATION, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("RecruiterToken"),
        },
      })
      .then((res) => {
        console.log("rejectJob", res.data);
      })
      .catch((e) => {
        console.log("rejectJob e", e);
      });

    console.log("resume to select", currentJobApplication);

    let newResumeData = applicationData.filter(
      (item) => item._id !== currentJobApplication._id
    );
    setApplicationData(newResumeData);
    if (newResumeData.length) setCurrentJobApplication(newResumeData[0]);
    // setCurrentJobApplication({
    //   id: "",
    //   name: "",
    //   tags: "",
    //   summary: "",
    // });
    else getApplications();
  };

  const applyJobApplication = async () => {
    if (!currentJobApplication) return;

    //logic for api call to select resume

    let payload = {
      jobId: jobId,
      candidateId: currentJobApplication._id,
      applicationStatus: "shortlisted",
    };

    console.log("applyJobApplication payload", payload);
    await axios
      .post(process.env.REACT_APP_UPDATE_JOB_APPLICATION, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("RecruiterToken"),
        },
      })
      .then((res) => {
        console.log("rejectJob", res.data);
      })
      .catch((e) => {
        console.log("rejectJob e", e);
      });

    console.log("resume to select", currentJobApplication);

    let newResumeData = applicationData.filter(
      (item) => item._id !== currentJobApplication._id
    );
    setApplicationData(newResumeData);
    if (newResumeData.length) setCurrentJobApplication(newResumeData[0]);
    // setCurrentJobApplication({
    //   id: "",
    //   name: "",
    //   tags: "",
    //   summary: "",
    // });
    else getApplications();
  };

  const onDragStart = (event) => {
    setIsDragging(true);
    const dragImage = document.createElement("div");
    dragImage.style.width = "400px";
    dragImage.style.height = "500px";
    dragImage.style.backgroundColor = "rgba(0, 0, 255, 0.5)";
    dragImage.style.border = "1px solid blue";

    event.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const onDragEnd = (event) => {
    handleApplyJob();
    setIsDragging(false);
    console.log("isVisible", isVisible);
    setIsVisible(true);
  };

  const onDrag = (event) => {
    event.preventDefault();
    setScreenX(event.screenX);
    if (event.screenX === 0) setSelection("neutral");
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    if (event.target.id === "accept") {
      setShowAcceptImage(true);
      setTimeout(() => setShowAcceptImage(false), 500);
    } else if (event.target.id === "reject") {
      setShowRejecttImage(true);
      setTimeout(() => setShowRejecttImage(false), 500);
    }
    setSelection(event.target.id);
  };

  const getMyJobs = async () => {
    let payload = {
      userId: userInfo._id,
    };
    await axios
      .post(process.env.REACT_APP_GET_JOBS_FOR_ME, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CandidateToken"),
        },
      })
      .then((res) => {
        console.log("getMyJobs", res.data);

        let newJobData = res.data.jobs;
        if (newJobData?.length) {
          setCurrentJobApplication(newJobData[0]);
          newJobData.splice(0, 1);
        }

        // setJobData(newJobData);
      })
      .catch((e) => {
        console.log("getMyJobs e", e);
      });
  };

  const getApplications = async () => {
    let payload = {
      applicationStatus: "intrested",
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
          setApplicationData(newJobData);
          setCurrentJobApplication(newJobData[0]);
          // newJobData.splice(0, 1);
        }
      })
      .catch((e) => {
        console.log("getApplications error", e);
      });
  };
  return (
    <div
      style={{ backgroundColor: "rgb(18,18,30)" }}
      className="h-screen grid grid-cols-3 gap-2 main"
    >
      <div
        onDragOver={(e) => {
          handleDragOver(e);
        }}
        id="reject"
        className=" h-full w-[1/3]"
      >
        <div
          className={`fade-image ${showRejecttImage ? "show" : ""}`}
          style={{
            left: "20%",
            zIndex: 30,
            position: "absolute",
            width: "200px",
          }}
        >
          <img src={require("../assets/notIntrested.png")} alt="Checked" />
        </div>
      </div>
      {!applicationData.length ? (
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
  <h2 className="text-xl font-semibold">No Application Found</h2>
  <p className="text-gray-400 max-w-md">
    We couldn't find any applications. Please try again later or refine your search.
  </p>
</div>
      ) : (
        <div className=" w-[1/3] flex justify-center items-center h-screen">
          {isDragging && !isVisible && (
            <div
              style={{
                overflow: "hidden",
                backgroundColor: "lightblue",
                position: "absolute",
                left: `${position}px`,
                transform: `rotate(${rotation}deg)`,
                opacity: isVisible ? 1 : 1,
                zIndex: 20,
              }}
              className="draggable"
            >
              {/* <div className="w-[400px] h-[500px] bg-white">
                <div class="card__content  space-y-1">
                  <h2>{currentResume.name}</h2>
  
                  <span className="tags">{currentResume.tags}</span>
                  <h2>Summary:</h2>
                  <p>{currentResume.summary}</p>
                </div>
              </div> */}
              <div class="w-[400px] h-[500px] cursor-pointer p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex">
                  <div className="w-[100%]">
                    <h2>Basic Details</h2>
                    <p className="text-white">
                      <span className="text-gray">Name:</span>{" "}
                      {currentJobApplication.firstName}{" "}
                      {currentJobApplication.lastName}
                      <br />
                      <span>Email:</span> {currentJobApplication.email} <br />
                      <span>Phone:</span> {currentJobApplication.phone} <br />
                    </p>
                  </div>
                  <div className="w-[90%] pl-2">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {/* {currentJobApplication.company} -{" "}
                      {currentJobApplication.position} */}
                    </h5>
                  </div>
                </div>
                <div class="card__content  space-y-1">
                  <span className="text-white">
                    {/* {currentJobApplication.skillsRequired.join(", ")} */}
                  </span>
                  <h2>Summary:</h2>
                  <p className="text-white">
                    {currentJobApplication?.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrag={onDrag}
            style={{
              opacity: isVisible && !isDragging ? 1 : 0,
              position: "absolute",
              zIndex: 30,
            }}
            className="draggable"
          >
            {/* <div className="w-[400px] h-[500px] bg-white ">
            
              <div class="card__content  space-y-1">
                <h2>{currentResume.name}</h2>
  
                <span className="tags">{currentResume.tags}</span>
                <h2>Summary:</h2>
                <p>{currentResume.summary}</p>
              </div>
            </div> */}

            <div class="w-[400px] h-[500px] cursor-pointer p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex">
                <div className="w-[100%]">
                  {/* <img
                    className="image-cover"
                    // src={currentJobApplication.companyImage}
                  ></img> */}
                  <h2>Basic Details</h2>
                  <p className="text-white">
                    <span className="text-gray">Name:</span>{" "}
                    {currentJobApplication.firstName}{" "}
                    {currentJobApplication.lastName}
                    <br />
                    <span>Email:</span> {currentJobApplication.email} <br />
                    <span>Phone:</span> {currentJobApplication.phone} <br />
                  </p>
                </div>
                <div className="w-[90%] pl-2">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {/* {currentJobApplication.company} -{" "}
                    {currentJobApplication.position} */}
                  </h5>
                </div>
              </div>
              <div class="card__content  space-y-1">
                <span className="text-white">
                  {/* {currentJobApplication.skillsRequired.join(", ")} */}
                </span>
                <h2>Summary:</h2>
                <p className="text-white">
                  {currentJobApplication?.description}
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              opacity: isVisible ? 1 : 1,
              position: "absolute",
              zIndex: 5,
            }}
            className=""
          >
            <div className="w-[400px] h-[500px] cursor-pointer p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div class="card__content  space-y-4">
                <h2 className="loading2"></h2>
                <h2 className="loading2"></h2>
                <p className="loading2"></p>
                <h2 className="loading2"></h2>
                <p className="loading2"></p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        onDragOver={(e) => {
          handleDragOver(e);
        }}
        id="accept"
        className=" h-full w-[1/3]"
      >
        <div
          className={`fade-image ${showAcceptImage ? "show" : ""}`}
          style={{
            zIndex: 30,
            position: "absolute",
            width: "200px",
          }}
        >
          <img src={require("../assets/checked.png")} alt="Checked" />
        </div>
      </div>
    </div>
  );
}

export default ApplicationSwipe;

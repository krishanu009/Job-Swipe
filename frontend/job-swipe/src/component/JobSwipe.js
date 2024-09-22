import React, { useState, useEffect } from "react";
import "../styling/swipe.css";

function JobSwipe() {
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [screenX, setScreenX] = useState(0);
  const [position, setPosition] = useState(550);
  const [rotation, setRotation] = useState(0);
  const [selection, setSelection] = useState("not-selected");
  const [showAcceptImage, setShowAcceptImage] = useState(false);
  const [showRejecttImage, setShowRejecttImage] = useState(false);
  const [currentJobApplication, setCurrentJobApplication] = useState({
    id: "5",
    company: "Adobe",
    image:"https://assets.weforum.org/organization/image/FlRV307K2N12MtA46n8LwV_0MA1pJ1EgdM-BxKokDxk.png",
    tags: "React, Node.js",
    position: "Full Stack Developer",
    summary:
      "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  });
  const [jobData, setJobData] = useState([
    {
      id: "1",
      company: "Google",
      image:"https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK",
      tags: "Ai, SWE, Javascript, Python",
      position: "SDE",
      summary:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "2",
      company: "Microsoft",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnB4S_PLzShRNMQHMpKdvaC5CpoG3RBcR3dA&s",
      tags: "Ai, Machin learning",
      position: "ML Engineer",
      summary:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "3",
      company: "Open Ai",
      image:"https://meta-q.cdn.bubble.io/f1711468032745x149459509062566560/openai-2.svg",
      tags: "Ai, NLP",
      position: "AI Engineer",
      summary:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: "4",
      company: "Tesla",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/800px-Tesla_Motors.svg.png",
      tags: "Web Dev",
      position: "SDE",
      summary:
        "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ]);
  const [resumeShortlisted, setResumeShortlisted] = useState([]);
  const [resumeRejected, setResumeRejected] = useState([]);

  const cardWidth = 400;
  const halfCardWidth = cardWidth / 2;
  const maxTilt = 20;

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
      rejectJob();
    } else if (selection === "accept") {
      applyJob();
    }
  };

  const rejectJob = () => {
    if (!currentJobApplication) return;

    //logic for api call to reject resume

    console.log("resume to reject", currentJobApplication);

    let newResumeData = jobData.filter(
      (item) => item.id !== currentJobApplication.id
    );
    setJobData(newResumeData);
    if (newResumeData.length) setCurrentJobApplication(newResumeData[0]);
    else
      setCurrentJobApplication({
        id: "",
        name: "",
        tags: "",
        summary: "",
      });
  };

  const applyJob = () => {
    if (!currentJobApplication) return;

    //logic for api call to select resume

    console.log("resume to select", currentJobApplication);

    let newResumeData = jobData.filter(
      (item) => item.id !== currentJobApplication.id
    );
    setJobData(newResumeData);
    if (newResumeData.length) setCurrentJobApplication(newResumeData[0]);
    else
      setCurrentJobApplication({
        id: "",
        name: "",
        tags: "",
        summary: "",
      });
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
    } else if((event.target.id === "reject")) {
      setShowRejecttImage(true);
      setTimeout(() => setShowRejecttImage(false), 500);
    }
    setSelection(event.target.id);
  };

  return (
    <div
      style={{ backgroundColor: "rgb(18,18,30)" }}
      className="h-screen grid grid-cols-3 gap-4 main"
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
      {!jobData.length ? (
        <div></div>
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
                  <div className="w-[10%]">
                    <img
                      className="image-cover"
                      src={currentJobApplication.image}
                    ></img>
                  </div>
                  <div className="w-[90%] pl-2">
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {currentJobApplication.company} -{" "}
                      {currentJobApplication.position}
                    </h5>
                  </div>
                </div>
                <div class="card__content  space-y-1">
                  <span className="text-white">
                    {currentJobApplication.tags}
                  </span>
                  <h2>Summary:</h2>
                  <p className="text-white">{currentJobApplication.summary}</p>
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
                <div className="w-[10%]">
                  <img
                    className="image-cover"
                    src={currentJobApplication.image}
                  ></img>
                </div>
                <div className="w-[90%] pl-2">
                  <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {currentJobApplication.company} -{" "}
                    {currentJobApplication.position}
                  </h5>
                </div>
              </div>
              <div class="card__content  space-y-1">
                <span className="text-white">{currentJobApplication.tags}</span>
                <h2>Summary:</h2>
                <p className="text-white">{currentJobApplication.summary}</p>
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

export default JobSwipe;

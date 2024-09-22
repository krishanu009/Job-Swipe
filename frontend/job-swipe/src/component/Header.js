import React, { useState } from "react";

function Header({selectedPage,setSelectedPage}) {
  

  return (
    <div className="sticky">
      <div className="w-[100%] flex justify-center items-center h-[20%] pt-4">
        <div className="shadow-2xl w-[50%] bg-[#131320] h-full p-2 cursor-pointer rounded-3xl">
          <div className="grid grid-cols-3 gap-4">
            {/* jobs */}
            <div className="flex justify-center items-center" onClick={() => setSelectedPage("job")}>
              <div
                className={`transition-all duration-300 transform ${
                  selectedPage === "job"
                    ? "bg-sky-500 flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-110"
                    : " flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-menu-button-wide"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v2A1.5 1.5 0 0 1 14.5 5h-13A1.5 1.5 0 0 1 0 3.5zM1.5 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5z" />
                  <path d="M2 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m10.823.323-.396-.396A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0M0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
                </svg>
              </div>
            </div>

            {/* home */}
            <div className="flex justify-center items-center" onClick={() => setSelectedPage("home")}>
              <div
                className={`transition-all duration-300 transform ${
                  selectedPage === "home"
                    ? "bg-sky-500 flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-110"
                    : "flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  className="bi bi-house"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
              </div>
            </div>
            {/* profile */}
            <div className="flex justify-center items-center" onClick={() => setSelectedPage("profile")}>
              <div
                className={`transition-all duration-300 transform ${
                  selectedPage === "profile"
                    ? "bg-sky-500 flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-110"
                    : "flex justify-center items-center w-16 h-16 rounded-full top-[10px] scale-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="white"
                  class="bi bi-person-lines-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

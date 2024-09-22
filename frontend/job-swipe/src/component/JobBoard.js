import React, { useState } from "react";

function JobBoard() {
  const [jobData, setJobData] = useState([]);

  return (
    <div className="h-full p-16">
      <div class="grid grid-cols-4 gap-4">
        <div>01</div>

        <div className="col-span-2">
          <div class="w-full cursor-pointer p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex">
              <div className="w-[90%]">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  sdfsdfsdf
                </h5>
              </div>
              <div className="">
                <button>Apply</button>
              </div>
            </div>

            <p class="mb-1 font-normal text-gray-700 dark:text-gray-400">
              sdfsdf
            </p>
          </div>
        </div>
        <div>09</div>
      </div>
    </div>
  );
}

export default JobBoard;

import React from "react";

const SuperUserReg = ({ setIsActive,handleFileChange }) => {
  return (
    <div className="fixed top-32 left-[30%]  z-20 block w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] md:h-full">
      <div className="relative w-[40%] h-full md:h-auto">
        <div className="relative bg-gray-50 border-2 border-purple rounded-lg shadow pb-6">
          <div className="flex items-end justify-between mr-2 mt-2">
            <button
              type="button"
              onClick={() => setIsActive(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center "
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <span
            id="reg_input_first_span"
            class="bg-gradient-to-r from-gradx1 to-gradx2 font-bold text-white py-1 text-2xl drop-shadow-2xl "
          >
            Upload file to Register Hospital
          </span>
          <div className="flex items-center mx-8 mt-2 justify-center w-11/12">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple border-dashed rounded-lg cursor-pointer "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">JSON (MAX. 800x400px)</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperUserReg;

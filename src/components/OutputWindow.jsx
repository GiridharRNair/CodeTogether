import React from "react";

const OutputWindow = ({ outputDetails }) => {

  return (
    <div className='flex flex-col md:pt-0 pt-1 md:w-10/12'>
      <h1 className="text-stone-500 font-bold text-xl">
        Output
      </h1>
      <div className="md:h-56 2xl:h-72 h-72 bg-[#1e1e1e] rounded-md text-white font-normal text-sm overflow-y-auto">
        {outputDetails ? 
        <>
          <pre className="px-2 py-1 font-normal text-sm text-white">
            {outputDetails?.output}
          </pre>
        </> : null}
      </div>
    </div>
  );
};

export default OutputWindow;
import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="text-stone-500 metrics-container py-1 flex flex-col">
      <p className="text-sm">
        CPU Time:
        {outputDetails?.cpuTime && (
          <span className="font-semibold px-2 rounded-md">
            {outputDetails.cpuTime + 's'}
          </span>
        )}
      </p>
      <p className="text-sm">
        Memory:
        {outputDetails?.cpuTime && (
          <span className="font-semibold px-2 rounded-md">
            {outputDetails?.memory + ' KB'}
          </span>
        )}
      </p>
    </div>
  );
};

export default OutputDetails;
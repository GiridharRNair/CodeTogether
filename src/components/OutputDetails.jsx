import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="text-stone-500 metrics-container py-1 flex flex-col space-y-2">
      <p className="text-sm">
        CPU Time:
        <span className="font-semibold px-2 rounded-md">
          {outputDetails?.cpuTime}
        </span>
      </p>
      <p className="text-sm">
        Memory:
        <span className="font-semibold px-2 rounded-md">
          {outputDetails?.memory}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
import React from "react";

const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="text-stone-500 metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm">
        Status:{""}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm">
        Memory:{""}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm">
        Time:{""}
        <span className="font-semibold px-2 py-1 rounded-md">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
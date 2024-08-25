import React from "react";

const Disclaimer = () => {
  return (
    <div className="p-5 w-full ">
      <div
        className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Disclaimer:</strong>
        <span className="block sm:inline">
          {" "}
          Your leave request will be reviewed by your manager via email. Please log in at the end of the day to check the final status.
        </span>
      </div>
    </div>
  );
};

export default Disclaimer;

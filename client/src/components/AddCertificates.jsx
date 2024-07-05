import React from "react";

const AddCertificates = () => {
  return (
    <div>
      <h1 className="border-b-4 border-blue-400 font-bold text-xl mb-6 pb-3">
        Certification(s)
      </h1>

      <div className="w-full flex gap-y-4">
        {/* Column 1: Title */}
        <div className="text-left mr-6 text-xl leading-10">
          <button
            // onClick={() => addCertification(true)}
            className="bg-blue-300 p-6 text-sm rounded-full"
          >
            Add Certification
          </button>
          {/* <p>{userDetails.certCourseTitle}</p> */}
        </div>

        {/* Column 2: Data */}
        <div className="text-left leading-10">
          {userDetails.cert.map((certificate, index) => (
            <img
              key={index}
              alt={`Certificate ${index + 1}`}
              src={certificate}
              className="rounded-full mx-4"
              width="100px"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCertificates;

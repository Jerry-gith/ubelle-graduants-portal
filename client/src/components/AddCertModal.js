import React, { useState } from "react";
import Image2Base64 from "../utils/image2Base64";

// import { Link } from "react-router-dom";
import makeRequest from "../axios";

const Modal = (props) => {
  const { student, setStudents } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const handleModal = () => {
    setShowModal(true);
  };

  const [userDetails, setUserDetails] = useState({
    certName: "",
    cert: "",
  });

  const handleUserImgUpload = async (e, field) => {
    const file = e.target.files[0];
    setFile(file);
    const imgData = await Image2Base64(file);
    setUserDetails((prevDetails) => {
      return {
        ...prevDetails,
        cert: imgData,
      };
    });
  };

  // API Call
  const handleSubmitUserDetails = async () => {
    if (userDetails.cert && userDetails.certName) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", userDetails.certName);
        formData.append("cert", file);

        const response = await makeRequest.post(
          `students/${student?.id}/certification`,
          formData
        );

        const newCertificate = response?.data?.data?.certificate ?? {};

        student.Certification.push(newCertificate);

        setStudents((prevDetails) => {
          return prevDetails.map((current, index) => {
            return current.id === student.id ? student : current;
          });
        });

        setLoading(false);
        setFile(null);
        alert("User details saved successfully!");

        // Error occurred
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
        alert(error.message);
      }
    } else {
      // Required fields are missing
      alert("Please fill all the required fields!");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          handleModal();
          e.stopPropagation();
        }}
        className="font-bold p-2 text-sm"
      >
        Add Certification
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-xl text-black font=semibold">
                    {student?.name}
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="opacity-7 block font-extrabold text-red-500 mt-3">
                      CLOSE
                    </span>
                  </button>
                </div>

                <div className="relative p-6 flex-auto">
                  <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-2">
                      Add Certificate(s) 
                    </label>
                    <input
                      className="shadow w-1/4 p-3 m-3 border rounded text-gray-700 focus:outline-none"
                      type="text"
                      name="certProgName"
                      id="certProgName"
                      value={userDetails.certName}
                      onChange={(e) =>
                        setUserDetails((prevDetails) => {
                          return {
                            ...prevDetails,
                            certName: e.target.value,
                          };
                        })
                      }
                    />
                    <input
                      className="text-red-600"
                      type="file"
                      name="cert"
                      id="cert"
                      accept="image/*"
                      onChange={(e) => handleUserImgUpload(e, "cert")}
                    />
                  </form>

                  <div className="text-left leading-10">
                    {userDetails.cert && (
                      <span>
                        <small className="text-black mt-6 font-bold text-sm">
                          Certificate Preview
                        </small>
                        <img
                          // key={index}
                          alt="userCErt"
                          src={`${userDetails.cert}`}
                          className="rounded-full mx-4"
                          width={75}
                        />
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    disabled={!!loading}
                    className="text-white bg-blue-500 hover:bg-blue-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => {
                      handleSubmitUserDetails();

                      setShowModal(false);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

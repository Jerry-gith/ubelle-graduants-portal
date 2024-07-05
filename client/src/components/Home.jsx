import { useEffect, useState } from "react";
import makeRequest from "../axios";
import { Header } from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
// import AddCertButton from "./AddCertButton";
import AddCertModal from "./AddCertModal";

function Home() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isFirstPage = currentPage === 0;
  const isLastPage = students?.length === 0;
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await makeRequest.get(
          `/students?page=${currentPage}&perPage=${perPage}&search=${searchQuery}`
        );
        setStudents(response.data.data);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    };

    const debouncedFetchStudents = debounce(fetchStudents, 900);
    debouncedFetchStudents();
    return () => {
      debouncedFetchStudents.cancel();
    };
  }, [currentPage, perPage, searchQuery]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };
 

  return (
    <div className="App">
      <Header />

 
      <main className="flex flex-col md:flex-row">
        {/* <DialogDefault /> */}

        <div className="w-full mx-auto">
          <div className="flex items-center justify-between font-mono text-2xl px-5 py-8 text-white bg-blue-950">
            <div className="text-sm font-mono font-extrabold">
              Student Portal
            </div>
            <div className="flex">
              {" "}
              <input
                type="search"
                className="p-2 border-0 w-full text-black focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="border-0 shadow  bg-blue-500 hover:bg-blue-600 font-bold text-sm px-8 rounded-tr-md rounded-br-md">
                Search
              </button>
            </div>

            <div className="">
              <Link
                to="/create"
                className="border-0 shadow rounded-md font-bold text-sm bg-blue-500 hover:bg-blue-600 p-4"
              >
                Add Student
              </Link>
            </div>
          </div>
        </div>
      </main>
      {loading ? (
        <>Loading</>
      ) : (
        <div className="mx-5 my-14">
          <ul className=" w-full lg:w-12/12">
            <li className="flex uppercase font-bold p-6 bg-gray-300">
              <span className="w-1/12">S/N</span>
              <span className="w-2/12">Name</span>
              <span className="w-2/12 break-words">NIN</span>
              <span className="w-2/12">PROGRAM</span>
              <span className="w-2/12">STATE</span>
              <span className="w-2/12">CERTIFICATIONS</span>
            </li>
            {students &&
              students.map((student, index) => (
                // <Link to={`students/${student.id}`} onClick={(e)=>{e.stopPropagation()}}>
                <li
                  className="flex border p-3 hover:bg-gray-100 hover:cursor-pointer"
                  key={index}
                  onClick={() => {
                    navigate(`students/${student.id}`);
                  }}
                >
                  <span className="w-1/12 font-bold">{index + 1}</span>
                  <span className="w-2/12 capitalize">{student.name}</span>
                  <span className="w-2/12 capitalize break-words">
                    {student.nin}
                  </span>
                  <span className="w-2/12 capitalize">{student.program}</span>
                  <span className="w-2/12 capitalize">{student.state}</span>
                  <span className="w-2/12 capitalize">
                    {student.Certification.length}
                  </span>
                  <span className="w-1/12">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className=" text-white text-sm text-center p-1 rounded shadow bg-blue-500 hover:bg-blue-700"
                    >
                      <AddCertModal
                        student={student}
                        setStudents={setStudents}
                      />
                    </div>
                  </span>
                </li>
                // </Link>
              ))}
          </ul>
          <div className="flex justify-end mt-10 text-white">
            <div className=" border border-blue-400 rounded">
            <button
              className={` bg-blue-500 ${!!!isFirstPage && "hover:bg-blue-600"} border-0 rounded-none px-4 py-2 font-extrabold text-xl`}
              onClick={prevPage}
              disabled={isFirstPage}
            >
              Prev
            </button>
            <span className="font-bold text-2xl text-blue-400 px-5">
              {currentPage}
            </span>
            <button
             className={` bg-blue-500 ${!!!isLastPage && "hover:bg-blue-600"} border-0 rounded-none px-4 py-2 font-extrabold text-xl`}
             onClick={nextPage}
              disabled={isLastPage}
            >
              Next
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

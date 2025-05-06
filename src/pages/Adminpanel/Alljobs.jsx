import { useEffect, useState } from "react";
import { getJobs } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";

import { deleteJob } from "@/api/apiJobs"; // Import the deleteJob API function

const Alljobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [location, setLocation] = useState(null); // Optional: dynamically set based on context
  const [companyId, setCompanyId] = useState(null); // Optional: dynamically set based on context
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [jobToDelete, setJobToDelete] = useState(null);

  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await getJobs(null, {
        location: location || null,
        company_id: companyId || null,
      });
      // console.log("Fetched jobs:", data);
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [location, companyId]); // Update if location or company changes

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job); // Set the job to delete
    setShowPopup(true); // Show the popup
  };

  const confirmDelete = async () => {
    if (!jobToDelete || !jobToDelete.id) {
      console.error("No job selected for deletion");
      return;
    }

    try {
      console.log("Deleting job:", jobToDelete);
      await deleteJob({ job_id: jobToDelete.id });
      setJobs(jobs.filter((j) => j.id !== jobToDelete.id));
      setShowPopup(false);
      setJobToDelete(null);
      alert("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setJobToDelete(null);
  };

  return (
    <div className="container mt-5 ">
      <p className="text-2xl text-[#173a96] mb-5 font-bold border-b-2 pb-2 border-[#173a96]">
        All Jobs Posted
      </p>

      {loadingJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No jobs available.</p>
      ) : (
        <div className="overflow-x-auto h-[calc(100vh-100px)] md:h-auto overflow-y-auto border border-gray-500 rounded">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Job ID</th>
                <th className="border border-gray-300 px-4 py-2">Created Date</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Job Title</th>
                <th className="border border-gray-300 px-4 py-2">Job Company</th>
                <th className="border border-gray-300 px-4 py-2">Job Description</th>
                <th className="border border-gray-300 px-4 py-2">Is Job Open</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="border border-gray-300 px-4 py-2 text-center">{job.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {new Date(job.created_at).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{job.location}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{job.title}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {job.company?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center max-w-[500px]">
                    {truncateText(job.description, 15)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {job.isOpen ? "Open" : "Closed"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDeleteClick(job)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to delete this job?</p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alljobs;
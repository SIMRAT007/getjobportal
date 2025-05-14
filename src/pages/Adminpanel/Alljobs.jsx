import { useEffect, useState, useMemo } from "react";
import { getJobs, admindeleteJob, updateJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import { City } from "country-state-city";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import { getCompanies } from "@/api/apiCompanies";

const Alljobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", location: "", requirements: "", id: "", isOpen: "" });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
  
    fetchCompanies();
  }, []);


  const fetchJobs = async () => {
    try {
      setLoadingJobs(true);
      const data = await getJobs(null, {});
      setJobs(data || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete || !jobToDelete.id) return;

    try {
      await admindeleteJob({ job_id: jobToDelete.id });
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

  const handleEditClick = (job) => {
    const selectedCompany = companies.find((company) => company.id === job.company_id);
    setJobToEdit(job);
    setEditForm({
      id: job.id,
      title: job.title,
      description: job.description,
      location: job.location,
      requirements: job.requirements,
      isOpen: job.isOpen,
      company_id: job.company_id, // Include company_id
      company: selectedCompany, // Keep the company object for display purposes
      company_logo: selectedCompany?.logo_url || "", // Use the company logo if available
    });
    setShowEditPopup(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const updatedJob = {
        ...editForm,
        company: undefined, // Remove the company object
        company_logo: undefined, // Remove the company_logo field
        company_id: editForm.company_id, // Ensure company_id is sent
      };
  
      await updateJob(updatedJob);
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobToEdit.id ? { ...job, ...editForm } : job
        )
      );
      setShowEditPopup(false);
      setJobToEdit(null);
      alert("Job updated successfully");
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const cancelEdit = () => {
    setShowEditPopup(false);
    setJobToEdit(null);
  };

  const stripMarkdown = (text) => {
    const html = marked.parse(text || "");
    return new DOMParser().parseFromString(html, "text/html").body.textContent || "";
  };
  
  const truncateText = (text, maxLength) => {
    const plainText = stripMarkdown(text);
    return plainText.length > maxLength ? plainText.slice(0, maxLength) + "..." : plainText;
  };

  const canadianCities = useMemo(() => City.getCitiesOfCountry("CA"), []);

  return (
    <div className="container mt-5">
      <p className="text-2xl text-[#173a96] mb-5 font-bold border-b-2 pb-2 border-[#173a96]">
        All Jobs Posted
      </p>

      {loadingJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No jobs available.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-500 rounded">
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
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={() => handleEditClick(job)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                        onClick={() => handleDeleteClick(job)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Popup */}
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

     {/* Edit Popup */}
{/* Edit Popup */}
{/* Edit Popup */}
{showEditPopup && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-5 rounded shadow-lg w-[50%]">
    <div className="flex items-center space-x-4 mb-4">
  {/* <img src={editForm.company_logo} className="w-10 h-10 object-contain" alt="Company Logo" /> */}
  <h2 className="text-lg font-bold">
    Edit Job of ID : {editForm.id} ({editForm.company?.name || "N/A"})
  </h2>
</div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={editForm.title}
          onChange={handleEditChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={editForm.description}
          onChange={handleEditChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Location</label>
        <select
          name="location"
          value={editForm.location}
          onChange={handleEditChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Location</option>
          {canadianCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Requirements</label>
        <MDEditor
          value={editForm.requirements}
          onChange={(value) =>
            setEditForm((prev) => ({ ...prev, requirements: value }))
          }
          style={{ backgroundColor: "white", color: "black" }}
          textareaProps={{
            placeholder: "Please enter job requirements",
          }}
          className="custom-md-editor"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Company</label>
        <select
          name="company_id"
          value={editForm.company_id || ""}
          onChange={(e) => {
            const selectedCompany = companies.find(
              (company) => company.id === Number(e.target.value)
            );
            setEditForm((prev) => ({
              ...prev,
              company_id: e.target.value,
              company: selectedCompany,
            }));
          }}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      {editForm.company?.logo_url && (
        <div className="mb-4">
          <img
            src={editForm.company.logo_url}
            alt={editForm.company.name}
            className="h-12"
          />
          <p className="text-sm text-gray-600 mt-2">{editForm.company.name}</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hiring Status</label>
        <select
          name="isOpen"
          value={editForm.isOpen ? "open" : "closed"}
          onChange={(e) =>
            setEditForm((prev) => ({
              ...prev,
              isOpen: e.target.value === "open",
            }))
          }
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          onClick={cancelEdit}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleEditSubmit}
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Alljobs;
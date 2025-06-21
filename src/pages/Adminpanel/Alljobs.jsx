import { useEffect, useState, useMemo, useRef } from "react";
import { getJobs, admindeleteJob, updateJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { marked } from "marked";
import { getCompanies } from "@/api/apiCompanies";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Add major Canadian cities that should always be available
const MAJOR_CANADIAN_CITIES = [
  // Major Metropolitan Areas
  "Toronto","Montreal","Vancouver","Calgary","Edmonton","Ottawa-Gatineau",
  "Winnipeg","Quebec City","Hamilton","Kitchener-Waterloo-Cambridge", 
  "Ontario","Alberta","British Columbia","Nova Scotia","New Brunswick", 
  "Newfoundland & Labrador","Prince Edward Island","Saskatchewan","Manitoba",
  "Yukon","Northwest Territories","Nunavut",

  // Ontario Cities (40 existing + 18 added = 58)
  "Mississauga","Brampton","Windsor","London","Markham",
  "Vaughan","Richmond Hill","Oakville","Burlington","Oshawa",
  "Barrie","Kingston","Guelph","Cambridge","Whitby",
  "Milton","Thunder Bay","Sudbury","Waterloo","Ajax",
  "St. Catharines","Niagara Falls","Newmarket","Peterborough",
  "Brantford","Pickering","Belleville","Sarnia","Sault Ste. Marie",
  "Welland","North Bay","Cornwall","Orillia","Stratford",
  // Added Ontario cities
  "Clarington","Halton Hills","Caledon","East Gwillimbury","Innisfil",
  "Midland","Collingwood","Wasaga Beach","Gravenhurst","Bracebridge",
  "Huntsville","Elliot Lake","Sault Ste. Marie","Temiskaming Shores",
  "Kirkland Lake","Kapuskasing","Hearst","Moosonee","Greater Sudbury",

  // Quebec Cities (20 existing + 26 added = 46)
  "Laval","Longueuil","Sherbrooke","Trois-Rivières","Lévis",
  "Saguenay","Terrebonne","Repentigny","Brossard","Drummondville",
  "Saint-Jérôme","Granby","Shawinigan","Rimouski","Sorel-Tracy",
  "Victoriaville","Rouyn-Noranda","Mascouche","Blainville","Mirabel",
  // Added Quebec cities
  "Alma","Amos","Baie-Comeau","Beaconsfield","Beauharnois","Boisbriand",
  "Boucherville","Bromont","Candiac","Châteauguay","Dollard-des-Ormeaux",
  "Lévis","Magog","Mont-Laurier","Montmagny","Mont-Saint-Hilaire",
  "Mont-Tremblant","Pincourt","Pont-Rouge","Port-Cartier","Prévost",
  "Rawdon","Rivière-du-Loup","Rosemère","Saint-Basile-le-Grand",
  "Saint-Bruno-de-Montarville","Saint-Charles-Borromée","Saint-Constant",
  "Sainte-Adèle","Sainte-Agathe-des-Monts","Sainte-Marie","Sainte-Thérèse",
  "Saint-Eustache","Saint-Félicien","Saint-Lambert","Saint-Lazare",
  "Saint-Pascal","Saint-Raymond","Saint-Sauveur","Saint-Tite","Sept-Îles",
  "Thetford Mines","Val-d'Or","Varennes","Vaudreuil-Dorion",

  // British Columbia (25 existing + 28 added = 53)
  "Surrey","Burnaby","Richmond","Kelowna","Abbotsford",
  "Coquitlam","Delta","Nanaimo","Victoria","Kamloops",
  "Prince George","Langley","Saanich","Chilliwack","Maple Ridge",
  "Port Coquitlam","North Vancouver","West Vancouver","Vernon",
  "Mission","Port Moody","Squamish","White Rock","Penticton",
  // Added BC cities
  "New Westminster","New Westminster","Abbotsford","Langley","Chilliwack",
  "Port Moody","Maple Ridge","Port Coquitlam","Squamish","White Rock",
  "Nanaimo","Kamloops","Mission","Kelowna","Richmond",

  // Alberta (20 existing + 0 added)
  "Red Deer","Lethbridge","Medicine Hat","St. Albert","Fort McMurray",
  "Airdrie","Grande Prairie","Spruce Grove","Leduc","Okotoks",
  "Cochrane","Camrose","Brooks","Canmore","Lloydminster",
  "Beaumont","Cold Lake","Sylvan Lake","Chestermere","Lacombe","Wetaskiwin",

  // Manitoba (10 existing + 0 added)
  "Winnipeg","Brandon","Thompson","Portage la Prairie","Steinbach",
  "Winkler","Selkirk","Dauphin","Morden","Flin Flon",

  // Saskatchewan (10 existing + 0 added)
  "Saskatoon","Regina","Prince Albert","Moose Jaw","Swift Current",
  "Yorkton","North Battleford","Warman","Weyburn","Estevan",

  // Nova Scotia (10 existing + 0 added)
  "Halifax","Dartmouth","Sydney","Truro","New Glasgow",
  "Kentville","Bridgewater","Amherst","Yarmouth","Port Hawkesbury",

  // New Brunswick (10 existing + 0 added)
  "Saint John","Moncton","Fredericton","Miramichi","Edmundston",
  "Bathurst","Campbellton","Oromocto","Grand Falls","Sussex",

  // Newfoundland & Labrador (9 existing + 1 added = 10)
  "St. John's","Mount Pearl","Corner Brook","Grand Falls-Windsor",
  "Gander","Labrador City","Carbonear","Bay Roberts","Stephenville","Clarenville",

  // PEI (9 existing + 0 added)
  "Charlottetown","Summerside","Stratford","Cornwall","Montague",
  "Kensington","Souris","Alberton","Georgetown",

  // Northern Territories (10 existing + 0 added)
  "Whitehorse","Yellowknife","Iqaluit","Hay River","Fort Smith",
  "Inuvik","Rankin Inlet","Cambridge Bay","Baker Lake","Arviat"
];


const Alljobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", location: "", requirements: "", id: "", isOpen: "" });
  const [companies, setCompanies] = useState([]);
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const citySearchInputRef = useRef(null);

  const handleCitySearchChange = (e) => {
    setCitySearchTerm(e.target.value);
    // Immediate refocus
    if (citySearchInputRef.current) {
      setTimeout(() => citySearchInputRef.current.focus(), 0);
    }
  };

  // const handleCitySearchKeyDown = (e) => {
  //   e.stopPropagation();
  //   // Prevent dropdown from closing on Enter key
  //   if (e.key === 'Enter') {
  //     e.preventDefault();
  //   }
  // };

  const handleCitySelectOpenChange = (open) => {
    if (open) {
      // Focus the search input when dropdown opens
      setTimeout(() => {
        if (citySearchInputRef.current) {
          citySearchInputRef.current.focus();
        }
      }, 0);
    } else {
      // Clear search when dropdown closes
      setCitySearchTerm("");
    }
  };

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

  // Function to get filtered cities list with proper handling of all cities
  const getFilteredCities = () => {
    // Remove duplicates and invalid entries
    let allCities = Array.from(new Set(
      MAJOR_CANADIAN_CITIES.filter(c => typeof c === 'string' && c.trim())
    )).sort((a, b) => a.localeCompare(b));

    if (!citySearchTerm) {
      return allCities;
    }

    const searchTerm = citySearchTerm.toLowerCase().trim();
    if (!searchTerm) return allCities;

    // Find exact matches first (case insensitive)
    const exactMatches = allCities.filter(city =>
      city.toLowerCase() === searchTerm
    );

    // Then find cities that start with the search term
    const startsWithMatches = allCities.filter(city =>
      city.toLowerCase().startsWith(searchTerm) &&
      city.toLowerCase() !== searchTerm
    );

    // Finally find cities that include the search term somewhere
    const includesMatches = allCities.filter(city =>
      city.toLowerCase().includes(searchTerm) &&
      !city.toLowerCase().startsWith(searchTerm)
    );

    // Return all matches in priority order
    return [...exactMatches, ...startsWithMatches, ...includesMatches];
  };

  // Handle focus management for city search
  useEffect(() => {
    if (citySearchTerm && citySearchInputRef.current) {
      citySearchInputRef.current.focus();
    }
  }, [citySearchTerm]);

  // Handle keyboard events in the city search
  const handleCitySearchKeyDown = (e) => {
    e.stopPropagation();
  };


  return (
    <div className="container mt-5">
      <p className="text-2xl text-[#173a96] mb-5 font-bold border-b-2 pb-2 border-[#173a96]">
        All Jobs Posted
      </p>

      {loadingJobs ? (
        <BarLoader className="mt-4 " width={"100%"} color="#36d7b7" />
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 mt-4 text-center">No jobs available.</p>
      ) : (
        <div className="overflow-x-auto border border-gray-500 rounded mb-5">
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
      {/* <img src={editForm.company_logo} className="w-10 h-10 object-contain" alt="Company Logo" /> */}

      {showEditPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg w-[50%] max-md:w-[90%] h-[80%] max-md:h-[95%] overflow-y-auto">
            <div className="flex items-center space-x-4 mb-4">
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
              <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
              <Select 
                value={editForm.location}
                onValueChange={(value) => setEditForm(prev => ({ ...prev, location: value }))}
                onOpenChange={handleCitySelectOpenChange}
              >
                <SelectTrigger className="w-full transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent className="relative">
                  <div className="sticky top-0 z-10 bg-background pt-2 px-2 pb-2 border-b">
                    <div className="relative">
                      <Input
                        ref={citySearchInputRef}
                        placeholder="Search cities..."
                        value={citySearchTerm}
                        onChange={handleCitySearchChange}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onKeyDown={handleCitySearchKeyDown}
                        onFocus={(e) => e.stopPropagation()}
                        onBlur={(e) => {
                          setTimeout(() => {
                            if (citySearchInputRef.current && citySearchTerm) {
                              citySearchInputRef.current.focus();
                            }
                          }, 0);
                        }}
                        autoComplete="off"
                        className="mb-1 pr-8"
                      />
                      {citySearchTerm && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCitySearchTerm("");
                            if (citySearchInputRef.current) {
                              setTimeout(() => citySearchInputRef.current.focus(), 0);
                            }
                          }}
                        >
                          <span className="sr-only">Clear</span>
                          <span aria-hidden="true">×</span>
                        </Button>
                      )}
                    </div>
                  </div>
                  <SelectGroup className="overflow-y-auto max-h-[200px]">
                    {getFilteredCities().length > 0 ? (
                      getFilteredCities()
                        .sort((a, b) => a.localeCompare(b))
                        .map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))
                    ) : (
                      <div className="px-2 py-1 text-sm text-gray-500">
                        No cities found
                      </div>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Scrollbar styles */}
              <style jsx>{`
                select::-webkit-scrollbar {
                  width: 8px;
                }
                select::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 4px;
                }
                select::-webkit-scrollbar-thumb {
                  background: #888;
                  border-radius: 4px;
                }
                select::-webkit-scrollbar-thumb:hover {
                  background: #666;
                }
              `}</style>
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
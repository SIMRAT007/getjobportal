import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { City } from "country-state-city"; 

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    data: companies,
    fn: fnCompanies,
    error: companiesError,
  } = useFetch(getCompanies, { requireAuth: false });
  

  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const data = await getJobs(null, {
          location: location || null,
          company_id: company_id || null,
        });
    
        const filteredData = data?.filter((job) => {
          const search = searchQuery.toLowerCase();
          const companyName = job.company?.name?.toLowerCase() || "";
          return (
            job.title?.toLowerCase().includes(search) ||
            companyName?.toLowerCase().includes(search) ||
            job.location?.toLowerCase().includes(search) ||
            job.description?.toLowerCase().includes(search)
          );
        });
    
        setJobs(filteredData || []);
      } catch (err) {
        console.error("Job fetch error:", err);
      } finally {
        setLoadingJobs(false);
      }
    };
  
    fetchJobs();
  }, [location, company_id, searchQuery]);


  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded, location, company_id, searchQuery]);
  
  if (companiesError) {
    console.error("Error fetching companies:", companiesError);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="container">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8 mt-10">
        Latest Jobs
      </h1>
      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title.."
          name="search-query"
          className="h-full flex-1  px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28 text-white" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
      <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {City.getAllCities()
                .filter((city) => city.countryCode === "CA")
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort cities alphabetically
                .map(({ name }) => {
                  return (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              );
            })
          ) : (
            <div>No Jobs Found 😢</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
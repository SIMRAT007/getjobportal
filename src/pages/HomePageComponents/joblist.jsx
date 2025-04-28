import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { ClipLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getJobs } from "@/api/apiJobs";

import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // for navigation

const TopJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const { isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const data = await getJobs(null, {});
        setJobs((data || []).slice(0, 6)); // Only take top 6 jobs
      } catch (err) {
        console.error("Job fetch error:", err);
      } finally {
        setLoadingJobs(false);
      }
    };

    if (isLoaded) {
      fetchJobs();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 container">
      {/* <h1 className="gradient-title font-extrabold text-4xl sm:text-5xl text-center pb-8">
        Top Jobs
      </h1> */}

      {loadingJobs ? (
         <div className="flex items-center justify-center h-screen">
         <ClipLoader color="#36d7b7" size={50} />
       </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max:md-p-10">
          {jobs.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Button
          variant="blue"
          className="px-6 py-3 text-white text-lg font-semibold bg-[#173a96]"
          onClick={() => navigate("/jobs")} // update route if needed
        >
          View More Jobs
        </Button>
      </div>
    </div>
  );
};

export default TopJobs;

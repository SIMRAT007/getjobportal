import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
    error,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    if (user?.id) {
      fnCreatedJobs();
    }
  }, [user]);

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading jobs. Please try again.
      </div>
    );
  }

  return (
    <div>
      {loadingCreatedJobs ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <BarLoader width={200} color="#36d7b7" />
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {createdJobs?.length > 0 ? (
            createdJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobAction={fnCreatedJobs}
                isMyJob
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              No Jobs Found 😢
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
    error
  } = useFetch(getApplications, {
    user_id: user?.id
  });

  useEffect(() => {
    if (user?.id) {
      fnApplications();
    }
  }, [user]);

  if (!isLoaded || loadingApplications) {
    return (
      <div className="flex justify-center items-center min-h-[200px] w-full">
        <BarLoader width={200} color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error loading applications. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {applications?.length > 0 ? (
        applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate={true}
          />
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">
          No applications found 😢
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;
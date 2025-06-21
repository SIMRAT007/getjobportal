/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon, Edit } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => { },
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user, isSignedIn } = useUser();
  // Replace navigate with direct window.location

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob, { alreadySaved: saved });

  const handleSaveJob = async () => {
    if (!isSignedIn) {
      // Show a popup if the user is not signed in
      window.alert("Please login to save jobs as favorites!");
      return;
    }
    
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  const handleMoreDetailsClick = () => {
    if (!isSignedIn) {
      window.alert("You Need To Login To Apply For Jobs, Click OK To Try Again!");
      setTimeout(() => {
        window.location.href = "/jobs"; // Redirect to /jobs page
      }, 100);
    } else {
      console.log("simrat else")
      window.location.href = `/job/${job.id}`; // Navigate to job details page if signed in
    }
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col bg-gray-200">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader className="flex ">
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <div className="flex gap-4"> {/* Added a container with reduced gap */}
              <Edit
                fill="blue"
                size={28}
                className="text-blue-100 cursor-pointer"
                onClick={() => window.location.href = `/edit-job/${job.id}`}
              />
              <Trash2Icon
                fill="red"
                size={28}
                className="text-red-300 cursor-pointer"
                onClick={handleDeleteJob}
              />
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-10" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}.
      </CardContent>
      <CardFooter className="flex gap-2">
        <div className="flex-1">
          <Button
            variant="secondary"
            className="w-full bg-[#173a96] text-white hover:bg-blue-600"
            onClick={handleMoreDetailsClick} // Use onClick handler
          >
            More Details
          </Button>
        </div>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart size={20} fill="red" stroke="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
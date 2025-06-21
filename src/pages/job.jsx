import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    }
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-8 transition-all duration-300 hover:shadow-xl">
          {/* Header Section */}
          <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
            <div className="flex-1">
              <h1 className="gradient-title font-extrabold text-4xl sm:text-6xl leading-tight">
                {job?.title}
              </h1>
              <div className="text-lg text-gray-600 mt-2">{job?.company?.name}</div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={job?.company?.logo_url} 
                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                alt={job?.title} 
              />
            </div>
          </div>

          {/* Job Stats */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-100">
              <MapPinIcon className="h-5 w-5 text-blue-600" /> 
              <span>{job?.location}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full transition-all duration-300 hover:bg-gray-100">
              <Briefcase className="h-5 w-5 text-blue-600" /> 
              <span>{job?.applications?.length} Applicants</span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              job?.isOpen 
                ? 'bg-green-50 text-green-700 hover:bg-green-100' 
                : 'bg-red-50 text-red-700 hover:bg-red-100'
            }`}>
              {job?.isOpen ? (
                <>
                  <DoorOpen className="h-5 w-5" /> 
                  <span>Active Opening</span>
                </>
              ) : (
                <>
                  <DoorClosed className="h-5 w-5" /> 
                  <span>Position Filled</span>
                </>
              )}
            </div>
          </div>

          {/* Hiring Status Selector */}
          {job?.recruiter_id === user?.id && (
            <div className="pt-4">
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger
                  className={`w-full transition-colors duration-300 ${
                    job?.isOpen 
                      ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800" 
                      : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  } text-white rounded-lg shadow-sm`}
                >
                  <SelectValue
                    placeholder={
                      "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Job Details */}
          <div className="space-y-8 pt-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">About the job</h2>
              <div className="prose prose-lg max-w-none text-gray-600 bg-gray-50 p-6 rounded-xl">
                {job?.description}
              </div>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                What we are looking for
              </h2>
              <div className="prose prose-blue prose-lg max-w-none bg-gray-50 p-6 rounded-xl">
                <MDEditor.Markdown
                  source={job?.requirements}
                  className="bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Apply Button */}
          {job?.recruiter_id !== user?.id && (
            <div className="pt-6">
              <ApplyJobDrawer
                job={job}
                user={user}
                fetchJob={fnJob}
                applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
              />
            </div>
          )}

          {/* Loading State */}
          {loadingHiringStatus && (
            <div className="py-4">
              <BarLoader width={"100%"} color="#2563eb" />
            </div>
          )}

          {/* Applications Section */}
          {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
            <div className="pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
              <div className="space-y-4">
                {job?.applications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPage;
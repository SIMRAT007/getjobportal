import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { user } = useUser();
const navigate = useNavigate();

const handleFindJobs = () => {
  if (!user) {
    navigate("/?sign-in=true"); // triggers sign-in modal
  } else {
    navigate("/jobs");
  }
};
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-0 sm:py-10 container ">
      <section className="text-center pt-10">
      <p className="border-2 border-gray-400 mb-5 py-2 px-2 text-sm md:text-xl rounded-3xl inline-block text-gray-600">Find Jobs and Recruiters <span className="bg-gray-400 text-white px-2 py-1 rounded-3xl">of your choice</span></p>       
      <h1 className="text-center gradient-title font-extrabold text-6xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
  <span className="inline">
    Supporting{" "}
    <span className="text-[#173a96] rounded-full inline-block transform rotate-6">
      Job
    </span> SEEKERS
  </span>
  <span className="block">Every Step of the Way</span>
</h1>
        <p className="text-gray-500 sm:mt-4 text-xs sm:text-xl pt-10 max-md:pt-5">
        Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations.
        </p>
      </section>
      <div className="flex gap-6 justify-center items-center max-sm:flex-col">
      <Button variant="blue" size="xl" className="text-white bg-[#173a96]" onClick={handleFindJobs}>
  Find Jobs
</Button>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl" className="text-black ">
            Post a Job
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
import { Button } from "@/components/ui/button";

import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-10">
      <section className="text-center pt-10">
      <p className="border-2 mb-5 py-2 px-2 rounded-3xl inline-block">Find Jobs and Recruiters <span className="bg-white text-black px-2 py-1 rounded-3xl">of your choice</span></p>       
       <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
        Supporting Job Seekers
          <span className="flex items-center gap-2 sm:gap-6">
            Every Step of the Way
          </span>
        </h1>
        <p className="text-gray-400 sm:mt-4 text-xs sm:text-xl pt-10">
        Unlock your true potential and discover a world of opportunities that align with your skills, interests, and aspirations.
        </p>
      </section>
      <div className="flex gap-6 justify-center items-center max-sm:flex-col">
        <Link to={"/jobs"}>
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl">
            Post a Job
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
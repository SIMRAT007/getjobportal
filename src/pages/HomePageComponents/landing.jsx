import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion"; // Import Framer Motion
import MOC from "../../assets/moc.png"; // Adjust the path as necessary

const LandingPage = () => {
  const { user } = useUser();

  const handleFindJobs = () => {
    if (!user) {
      window.location.href = "/?sign-in=true"; // triggers sign-in modal
    } else {
      window.location.href = "/jobs";
    }
  };

  // Animation Variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-0 sm:py-10 container">
      <motion.section
        className="text-center pt-10"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="border-2 border-gray-400 mb-5 py-2 px-2 text-sm md:text-xl rounded-3xl inline-block text-gray-600"
          variants={textVariant}
        >
          Find Jobs and Recruiters{" "}
          <span className="bg-gray-400 text-white px-2 py-1 rounded-3xl">
            of your choice
          </span>
        </motion.p>
        <motion.h1
          className="text-center gradient-title font-extrabold text-6xl sm:text-6xl lg:text-8xl tracking-tighter py-4"
          variants={textVariant}
        >
          <span className="inline">
            Supporting{" "}
            <span className="text-[#173a96] rounded-full inline-block transform rotate-6">
              Job
            </span>{" "}
            SEEKERS
          </span>
          <span className="block">Every Step of the Way</span>
        </motion.h1>
        <motion.p
          className="text-gray-500 sm:mt-4 text-xs sm:text-xl pt-10 max-md:pt-5"
          variants={textVariant}
        >
          Unlock your true potential and discover a world of opportunities that
          align with your skills, interests, and aspirations.
        </motion.p>
      </motion.section>
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="flex gap-6 justify-center items-center max-sm:flex-col">
          <Button
            variant="blue"
            size="xl"
            className="text-white bg-[#173a96]"
            onClick={handleFindJobs}
          >
            Find Jobs
          </Button>
          <Button 
            variant="destructive" 
            size="xl" 
            className="text-black"
            onClick={() => window.location.href = "/post-job"}
          >
            Post a Job
          </Button>
        </div>
        {/* Add the image below the buttons */}
        <div className="mt-10 w-[100%]">
          <img
            src={MOC} // Replace with the actual path to your image
            alt="Laptop Mockup"
            className="w-[100%] mx-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
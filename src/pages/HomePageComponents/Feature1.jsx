import features from "../../data/features";
import { DocumentMagnifyingGlassIcon, CloudArrowUpIcon, GlobeAltIcon } from "@heroicons/react/20/solid";
import { motion } from "framer-motion"; // Import Framer Motion

const iconMap = {
  SearchIcon: DocumentMagnifyingGlassIcon,
  UploadIcon: CloudArrowUpIcon,
  GlobeAltIcon: GlobeAltIcon,
};

const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function Feature1() {
  return (
    <div className="overflow-hidden py-8 sm:py-28 container">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 max-sm:text-center">
        <motion.div
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is in view
        >
          <motion.div className="lg:pt-4 lg:pr-8" variants={textVariant}>
            <div className="lg:max-w-lg">
              <motion.h2
                className="text-base font-semibold border-2 border-gray-400 text-gray-500 px-3 py-2 inline-block rounded-3xl"
                variants={textVariant}
              >
                Empowering Your Career Journey
              </motion.h2>
              <motion.p
                className="mt-10 text-4xl font-semibold tracking-tight text-[#173a96] sm:text-7xl"
                variants={textVariant}
              >
                Seamless Job Search and Recruitment
              </motion.p>
              <motion.p
                className="mt-10 text-xl text-gray-500"
                variants={textVariant}
              >
                Discover a platform designed to connect job seekers with their dream opportunities and help employers
                find the perfect candidates. Whether you're looking to advance your career or grow your team, we've got
                you covered.
              </motion.p>
              <motion.dl
                className="mt-20 max-w-xl space-y-8 text-base text-gray-300 lg:max-w-none"
                variants={staggerContainer}
              >
                {features.map((feature) => {
                  const Icon = iconMap[feature.icon]; // Map the icon name to the actual component
                  return (
                    <motion.div
                      key={feature.name}
                      className="relative pl-9"
                      variants={textVariant}
                    >
                      <dt className="inline font-semibold text-black">
                        <Icon
                          aria-hidden="true"
                          className="absolute top-1 left-1 h-5 w-5 text-[#173a96]"
                        />
                        {feature.name}
                      </dt>
                      <dd className="inline text-gray-500">
                        {" "}
                        {feature.description}
                      </dd>
                    </motion.div>
                  );
                })}
              </motion.dl>
            </div>
          </motion.div>
          <motion.img
            alt="Platform screenshot"
            src="https://i.pinimg.com/736x/bd/c6/24/bdc6247d1c8ebafd95db73f665adabd4.jpg"
            width={2432}
            height={1442}
            className="w-[14rem] sm:w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 mx-auto"
            variants={textVariant}
          />
        </motion.div>
      </div>
    </div>
  );
}
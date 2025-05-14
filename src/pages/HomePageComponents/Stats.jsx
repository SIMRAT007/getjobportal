import { motion } from "framer-motion"; // Import Framer Motion

const stats = [
  { id: 1, value: "5000+", name: "Active Job Seekers" },
  { id: 2, value: "800+", name: "Employers Hiring" },
  { id: 3, value: "1000+", name: "Jobs Posted Monthly" },
  { id: 4, value: "2000+", name: "Successful Hires Annually" },
];

// Animation Variants
const fadeInUp = {
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

export default function Stats() {
  return (
    <section className="py-0">
      <div className="mx-auto  px-4 sm:px-6">
        <motion.div
          className="rounded-2xl py-10 px-10 xl:py-16 xl:px-20 bg-[#173a95] flex items-center justify-between flex-col gap-16 lg:flex-row w-full"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="w-full lg:w-60"
            variants={fadeInUp}
          >
            <h2 className="font-manrope text-4xl font-bold text-gray-100 mb-4 text-center lg:text-left">
              Our Stats
            </h2>
            <p className="text-sm text-gray-400 leading-6 text-center lg:text-left">
              Empowering job seekers and employers to connect seamlessly.
            </p>
          </motion.div>
          <motion.div
            className="w-full lg:w-4/5"
            variants={staggerContainer}
          >
            <div className="flex flex-col flex-1 gap-10 lg:gap-0 lg:flex-row lg:justify-between">
              {stats.map((stat) => (
                <motion.div
                  key={stat.id}
                  className="block"
                  variants={fadeInUp}
                >
                  <div className="font-manrope font-bold text-4xl text-white mb-3 text-center lg:text-left">
                    {stat.value}
                  </div>
                  <span className="text-gray-400 text-center block lg:text-left">
                    {stat.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
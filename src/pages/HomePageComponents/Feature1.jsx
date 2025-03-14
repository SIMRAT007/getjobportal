import features from "../../data/features";
import { DocumentMagnifyingGlassIcon, CloudArrowUpIcon, GlobeAltIcon } from "@heroicons/react/20/solid";

const iconMap = {
  SearchIcon: DocumentMagnifyingGlassIcon,
  UploadIcon: CloudArrowUpIcon,
  GlobeAltIcon: GlobeAltIcon,
};

export default function Feature1() {
  return (
    <div className="overflow-hidden py-8 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 max-sm:text-center">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold border-2 text-gray-400 px-3 py-2 inline-block rounded-3xl">Empowering Your Career Journey</h2>
              <p className="mt-10 text-4xl font-semibold tracking-tight text-white sm:text-7xl">
                Seamless Job Search and Recruitment
              </p>
              <p className="mt-10 text-xl text-gray-500">
                Discover a platform designed to connect job seekers with their dream opportunities and help employers
                find the perfect candidates. Whether you're looking to advance your career or grow your team, we've got
                you covered.
              </p>
              <dl className="mt-20 max-w-xl space-y-8 text-base text-gray-300 lg:max-w-none">
                {features.map((feature) => {
                  const Icon = iconMap[feature.icon]; // Map the icon name to the actual component
                  return (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-white">
                        <Icon aria-hidden="true" className="absolute top-1 left-1 h-5 w-5 text-indigo-400" />
                        {feature.name}
                      </dt>
                      <dd className="inline"> {feature.description}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
          <img
            alt="Platform screenshot"
            src="https://i.pinimg.com/736x/bd/c6/24/bdc6247d1c8ebafd95db73f665adabd4.jpg"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0 max-sm:w-[20rem]"
          />
        </div>
      </div>
    </div>
  );
}
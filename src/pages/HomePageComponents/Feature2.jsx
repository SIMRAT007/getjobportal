import { StarIcon, HandThumbUpIcon, SparklesIcon } from '@heroicons/react/20/solid';

export default function Feature2() {
  return (
    <div className="bg-gray-300 p-10 md:p-20 rounded-2xl text-center mt-20 md:mt-40">
      <h2 className="text-4xl md:text-7xl font-bold text-gray-800">Leverage global world-class talented people</h2>
      <p className="text-gray-400 mt-4 md:text-lg">
        Discover the optimal match for your startup and get the best results together
      </p>
      
      <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        <div className="bg-white shadow-md p-6 rounded-2xl text-center w-72 md:w-80 flex flex-col items-center">
          <StarIcon className="h-16 w-16 md:h-20 md:w-20 text-gray-600" />
          <h3 className="font-semibold text-lg mt-2 text-gray-700 py-2">80% Faster Hiring</h3>
          <p className="text-gray-500 text-sm text-center">
            No more back and forth to find the right qualified candidates
          </p>
        </div>
        
        <div className="bg-gray-700 shadow-md p-8 md:p-10 rounded-2xl text-center w-72 md:w-80 flex flex-col items-center">
          <HandThumbUpIcon className="w-16 h-16 text-white" />
          <h3 className="font-semibold text-lg mt-2 py-2 text-white">Decrease spendings</h3>
          <p className="text-gray-300 text-sm text-center">
            Find the right candidates and pay cheaper than market price
          </p>
        </div>
        
        <div className="bg-white shadow-md p-6 rounded-2xl text-center w-72 md:w-80 flex flex-col items-center">
          <SparklesIcon className="h-16 w-16 text-gray-700" />
          <div className="text-center">
            <h3 className="font-semibold text-lg text-gray-700 py-2">Top 0.1% candidates</h3>
            <p className="text-gray-500 text-sm text-center">
              Find the right candidates and pay cheaper than the market price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

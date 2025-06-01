import { Info } from "lucide-react";

export default function JobOverview() {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
      {/* Tabs */}
      <div className="mb-6 flex space-x-3 border-b border-gray-200 pb-2">
        <button className="px-5 py-2 bg-green-600 text-white rounded-md text-sm font-semibold shadow-md hover:bg-green-700 transition-colors">
          Jobs
        </button>
        <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
          Candidates
        </button>
        <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
          Messages
        </button>
      </div>

      {/* Back Link */}
      <div className="mb-6">
        <a
          href="#"
          className="text-green-600 text-sm flex items-center font-medium hover:underline"
        >
          &lt; Back to all jobs
        </a>
      </div>

      {/* Job Title */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Web Developer
            </h1>
            <p className="text-gray-600 text-sm">
              Global Inc. - Miami, Florida
            </p>
          </div>
          <button className="px-4 py-2 border border-green-500 text-green-600 bg-green-50 rounded-full text-sm font-semibold hover:bg-green-100 transition-colors">
            Sponsor this job
          </button>
        </div>
      </div>

      {/* Clicks Section */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Clicks</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h3 className="text-4xl font-extrabold text-green-600">122</h3>
            <div className="ml-3 flex items-center">
              <span className="text-base text-gray-600">Clicks This Week</span>
              <Info size={18} className="ml-2 text-green-500 cursor-help" />
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="h-48 relative mb-6">
          <svg
            className="w-full h-full"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
          >
            {[20, 40, 60, 80].map((y, i) => (
              <line
                key={i}
                x1="0"
                y1={y}
                x2="300"
                y2={y}
                stroke="#f0f0f0"
                strokeWidth="0.5"
              />
            ))}
            <path
              d="M0,70 C30,60 60,30 90,50 C120,70 150,90 180,70 C210,50 240,40 270,60 C300,80"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>

          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 font-medium -translate-x-6">
            <span>40</span>
            <span>30</span>
            <span>20</span>
            <span>10</span>
            <span>0</span>
          </div>
        </div>

        <button className="w-full py-3 bg-green-100 text-green-600 rounded-md text-base font-semibold hover:bg-green-200 transition-colors">
          Sponsor Job for More Clicks
        </button>
      </div>

      {/* Candidates Section */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-5">Candidates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Application Review</p>
            <h3 className="text-3xl font-extrabold text-purple-600">41</h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
            <p className="text-gray-600 text-sm mb-1">Total Resumes Received</p>
            <h3 className="text-3xl font-extrabold text-purple-600">51</h3>
          </div>
        </div>
        <button className="w-full py-3 bg-orange-100 text-orange-600 rounded-md text-base font-semibold hover:bg-orange-200 transition-colors">
          Improve Job Description
        </button>
      </div>
    </div>
  );
}

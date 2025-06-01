import { X, ChevronRight, Plus } from "lucide-react";
import SidebarAction from "./SidebarAction";

export default function RightSidebar() {
  return (
    <div className="w-full lg:w-72 bg-white rounded-lg shadow-lg p-6 flex-shrink-0">
      <button className="w-full py-3 bg-green-600 text-white rounded-md mb-6 font-semibold shadow-md hover:bg-green-700 transition-colors">
        Edit Job
      </button>

      <div className="space-y-3 border-b border-gray-200 pb-6 mb-6">
        <SidebarAction text="Close Job" icon={<X size={16} className="text-red-500" />} />
        <SidebarAction text="View Cost & Performance" icon={<ChevronRight size={16} className="text-gray-500" />} />
        <SidebarAction text="Find Candidates for this Job" icon={<ChevronRight size={16} className="text-gray-500" />} />
        <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-md flex items-center justify-center font-medium hover:bg-gray-100 transition-colors">
          <Plus size={16} className="mr-2 text-green-500" />
          Add Candidate
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-gray-600">Views:</span>
          <span className="font-semibold text-gray-900">253</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-gray-600">Candidates:</span>
          <span className="font-semibold text-gray-900">41</span>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-gray-600">Status:</span>
          <div className="flex items-center">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2"></span>
            <span className="font-semibold text-gray-900">Open</span>
            <button className="text-green-600 ml-2 text-sm font-medium hover:underline">(Pause)</button>
          </div>
        </div>
        <div className="flex justify-between items-center text-gray-700">
          <span className="text-gray-600">Created:</span>
          <span className="font-semibold text-gray-900">10 days ago</span>
        </div>
      </div>
    </div>
  );
}

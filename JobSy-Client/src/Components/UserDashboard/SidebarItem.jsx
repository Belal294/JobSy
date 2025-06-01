import { ChevronRight } from "lucide-react";

export default function SidebarItem({ icon, text, active = false }) {
  return (
    <div
      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ease-in-out
        ${active ? "bg-green-100 text-green-800 shadow-sm" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}
      `}
    >
      <span className={`mr-4 ${active ? "text-green-600" : "text-gray-500"}`}>{icon}</span>
      {text}
      {active && <ChevronRight size={16} className="ml-auto text-green-600" />}
    </div>
  );
}

import JobOverview from "./JobOverView";
import RightSidebar from "./RightSidebar";
import Sidebar from "./Sidebar"; 
import Header from "./Header"; 

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        {/* <Header /> */}

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content Area (Job Overview) */}
            <JobOverview />

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}
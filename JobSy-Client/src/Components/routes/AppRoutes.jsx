import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import MainLayout from "../Layouts/MainLayout";
import AboutSection from "../Pages/AboutSection";
import ContactSection from "../Pages/ContactSection"
import BlogSection from "../Pages/BlogSection"
import BlogDetailPage from "../Pages/DetailsPage/BlogsDetails";
import JobListingSection from "../HomeContent/JobListingSection";
import JobDetails from "../Pages/DetailsPage/JobDetails";
import SignUp from "../AuthenTicationSection/SignUp";
import Login from "../AuthenTicationSection/Login";
import Dashboard from "../UserDashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import ActivateAccount from "../AuthenTicationSection/AccountActivation";
import ResetPassword from "../AuthenTicationSection/ForgotEmail";
import ResetPasswordConfirm from "../AuthenTicationSection/ResetPasswordConfirm";
import ProfilePage from "../SidebarComponent/ProfilePageComponents/ProfilePage";
import JobPostForm from "../PostJobForm/job-post-form";
import SavedJobs from "../UserDashboard/SavedJobs";
import ApplicationForm from "../Pages/ApplicationComponents/ApplicationForm";
import ApplicationList from "../UserDashboard/ApplicationList";
import SupportPage from "../Pages/Support";


const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
           <Route path="/" element={<Home />} />
           {/* <Route path="/login" element={<AuthSection />} /> */}
           <Route path="/about" element={<AboutSection />} />
           <Route path="/contact" element={<ContactSection />} />
           <Route path="/blog" element={<BlogSection />} />
           <Route path="/details" element={<BlogDetailPage />} />
           <Route path="/joblist" element={<JobListingSection />} /> {/* This remains as is */}
           <Route path="/jobs/:id" element={<JobDetails />} />
           <Route path="/signup" element={<SignUp/>} />
           <Route path="/postform" element={<JobPostForm/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/activate/:uid/:token" element={<ActivateAccount/>} />
           <Route path="/forgot" element={<ResetPassword/>} />
           <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>} />
           <Route path="/jobs/:id/apply" element={<ApplicationForm />} />



        </Route>


            <Route path="dashboard/*"
            element={
                <PrivateRoute>
                    <DashboardLayout/>
                </PrivateRoute>
            }>
                <Route path="" element={<Dashboard/>}/>
                <Route path="joblistitem" element={<JobListingSection/>}/>
                <Route path="profile" element={<ProfilePage/>}/>
                <Route path="saved" element={<SavedJobs/>}/>
                <Route path="applications" element={<ApplicationList/>}/>
                <Route path="support" element={<SupportPage/>}/>

            </Route>

        </Routes>

    );
};

export default AppRoutes;
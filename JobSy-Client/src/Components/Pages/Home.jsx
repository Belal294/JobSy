import JobBoardLanding from '../HomeContent/JobBoardLanding';
import JobListingSection from '../HomeContent/JobListingSection';
import LookingForJobSection from '../HomeContent/LookingForJobSection';
import CompanySection from '../HomeContent/CompanySection';
import TestimonialCarousel from '../HomeContent/Testimonial-carousel';
import MobileAppSection from '../HomeContent/Mobile-app-Section';

import Hero from '../HomeContent/Hero';

const Home = () => {
    return (
        <div>
            {/* <Navbar/> */}
            <Hero/>
            <JobBoardLanding/>
            <JobListingSection isHomePage={true} /> {/* Pass isHomePage prop here */}
            <LookingForJobSection/>
            <CompanySection/>
            <TestimonialCarousel/>
            <MobileAppSection/>

        </div>
    );
};

export default Home;
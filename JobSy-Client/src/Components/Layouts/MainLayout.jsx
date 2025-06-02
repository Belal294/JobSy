
import FooterSection from '../HomeContent/Footer-Section';
import Navbar from '../HomeContent/Navbar';
import { Outlet } from 'react-router-dom';
const MainLayout = () => {
    return (
        <div>
            <Navbar/>
           <div >
             <Outlet/>
           </div>
            <FooterSection/>
        </div>
    );
};

export default MainLayout;
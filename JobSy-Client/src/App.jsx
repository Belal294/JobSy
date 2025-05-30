import './App.css'
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Components/routes/AppRoutes';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './Components/Context/AuthContext';

function App() {
  return (
   <div>
    <AuthProvider>
        <BrowserRouter>
        <Toaster position="top-right" />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
   </div>
  )
}

export default App

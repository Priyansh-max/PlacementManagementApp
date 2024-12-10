/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate , Navigate} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Troublesigning from './pages/Troublesigning'
import Troublesigningsuccess from './pages/Troublesigningsuccess'
import Resetpassword from './pages/Resetpassword'
import Resetpasswordsuccess from './pages/Resetpasswordsuccess'
import Admin from './pages/Admin'
import ProfileBuilder from './pages/ProfileBuilder'
import Student from './pages/Student'
import UserDisplayAdmin from './pages/UserDisplayAdmin'
import UserDisplayCompany from './pages/UserDisplayCompany';



function App() {

  const navigate = useNavigate();

  // Store the current route in localStorage before unloading the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('lastRoute', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpassword" element={<Resetpassword />} />
            <Route path="/resetpasswordsuccess" element={<Resetpasswordsuccess />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/troublesigning" element={<Troublesigning />} />
            <Route path="/troublesigningsuccess/:encryptedEmail" element={<Troublesigningsuccess />} />
            <Route path="/profile" element={<ProfileBuilder />} />
            <Route path="/studentpage" element={<Student />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/drive/users/:driveId" element={<UserDisplayAdmin />} />
            <Route path="/admin/company/users/:companyId" element={<UserDisplayCompany />} />
        </Routes>
      {/* <ProfileBuilder></ProfileBuilder> */}
      {/* <Admin></Admin> */}
      {/* <StudentPage></StudentPage> */}
      {/* <Student></Student> */}



    </div>
  )
}

export default App

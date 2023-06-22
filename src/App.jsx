import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from './redux/slices/authSlice';
import Index from "./components/Index";
import SignUp from "./components/SignUp";
import Login from './components/Login';
import DashBoard from "./components/student/DashBoard";
import TutorDashBoard from "./components/tutor/TutorDashboard";
import NotFound from './components/NotFound';
import AdminSpace from './components/admin/AdminSpace';
import GeneralClassroom from './components/classrooms/GeneralClassroom';

const App = () => {
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []); 

  const isStudent = role === "Student";
  const isTutor = role === "Tutor";
  const isAdmin = role === "Admin";

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {isStudent && <Route path="/dashboard" element={<DashBoard />} />}
        {isTutor && <Route path="/dashboard" element={<TutorDashBoard />} />}
        {isAdmin && <Route path="/dashboard" element={<AdminSpace />} />}
        <Route path="/classroom" element={<GeneralClassroom />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./components/Index"
import SignUp from "./components/SignUp"
import Login from './components/Login';
import DashBoard from "./components/student/DashBoard"
import TutorDashBoard from "./components/tutor/TutorDashboard"
import NotFound from './components/NotFound';

const App = () => {
  const role = "Student";
  const isStudent = role === "Student";
  const isTutor = role === "Tutor";

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {isStudent && <Route path="/dashboard" element={<DashBoard />} />}
        {isTutor && <Route path="/tutordashboard" element={<TutorDashBoard />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

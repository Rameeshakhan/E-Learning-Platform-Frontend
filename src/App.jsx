import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./components/Index"
import Login from './components/Login';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Index/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
};

export default App;

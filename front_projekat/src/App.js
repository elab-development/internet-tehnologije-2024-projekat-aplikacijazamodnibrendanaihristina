import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import RegistrationPage from './Components/RegistrationPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/registracija" element={<RegistrationPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;

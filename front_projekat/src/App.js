import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import RegistrationPage from './Components/RegistrationPage';
import StyleSurvey from './Components/StyleSurvey';
import ClothingTypesPage from './Components/ClothingTypesPage';
import Blog from './Components/Blog';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />  
          <Route path="/registracija" element={<RegistrationPage />} />  
             <Route path="/anketa" element={<StyleSurvey />} />  
          <Route path="/shop" element={<ClothingTypesPage />} />  
          <Route path="/blog" element={<Blog />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import CreateUserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // ⚡ état global de l'utilisateur
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage currentUser={currentUser} />} />
        <Route path="/survey/:id" element={<SurveyPage currentUser={currentUser} />} />    
        <Route path="/survey/:id/results" element={<ResultsPage currentUser={currentUser}/>} />
        <Route path="/create" element={<CreateSurveyPage currentUser={currentUser}/>} />
        <Route path="/user/create" element={<CreateUserPage currentUser={currentUser} />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

      </Routes>
    </Router>
  );
}

export default App; 

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import SurveyPage from './pages/SurveyPage';
import ResultsPage from './pages/ResultsPage';
import CreateSurveyPage from './pages/CreateSurveyPage';
import CreateUserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import AdminResultsPage from './pages/AdminResultsPage';

import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null); // ⚡ état global de l'utilisateur

  return (
    <Router>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        {/* Pages publiques */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />

        {/* Accessible à tous les users connectés */}
        <Route
          path="/survey/:id"
          element={
            <ProtectedRoute
              element={<SurveyPage />}
              currentUser={currentUser}
              allowedRoles={["user", "admin"]}
            />
          }
        />

        {/* Pages admin seulement */}
        <Route
          path="/survey/:id/results"
          element={
            <ProtectedRoute
              element={<ResultsPage />}
              currentUser={currentUser}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute
              element={<CreateSurveyPage />}
              currentUser={currentUser}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/user/create"
          element={
            <ProtectedRoute
              element={<CreateUserPage />}
              currentUser={currentUser}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminResultsPage currentUser={currentUser} />}
              currentUser={currentUser}
              allowedRoles={["admin"]}
            />
          }
        />
      </Routes>
    </Router>
  );

}

export default App; 

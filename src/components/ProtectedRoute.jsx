import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, currentUser, allowedRoles }) {
  if (!currentUser) {
    // Pas connecté → redirection vers login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    // Connecté mais rôle interdit → redirection vers la page d'accueil
    return <Navigate to="/" />;
  }

  // Sinon on affiche la page
  return element;
}

export default ProtectedRoute;
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null); // On vide l’état global
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Accueil</Link>

      {/* Liens pour tous les users connectés */}
      {currentUser && (
        <Link to="/survey/1" style={{ marginRight: "10px" }}>Répondre à un sondage</Link>
      )}

      {/* Liens admin uniquement */}
      {currentUser?.role === "admin" && (
        <>
          <Link to="/create" style={{ marginRight: "10px" }}>Créer un sondage</Link>
          <Link to="/user/create" style={{ marginRight: "10px" }}>Créer un utilisateur</Link>
          <Link to="/admin" style={{ marginRight: "10px" }}>📊 Tous les résultats</Link>
        </>
      )}

      {/* Espace utilisateur */}
      {currentUser ? (
        <>
          <span style={{ marginRight: "10px" }}>
            👤 {currentUser.name} ({currentUser.role})
          </span>
          <button onClick={handleLogout}>Se déconnecter</button>
        </>
      ) : (
        <Link to="/login">Se connecter</Link>
      )}
    </nav>
  );
}

export default Navbar;

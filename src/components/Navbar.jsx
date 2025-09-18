import { Link, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <BootstrapNavbar
      bg="light"
      expand="lg"
      fixed="top"
      className="shadow-sm mb-4"
    >
      <Container>
        {/* Logo + Accueil */}
        <BootstrapNavbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
          🌐 MonApp
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Liens au centre */}
          <Nav className="mx-auto">
            {currentUser && (
              <Nav.Link as={Link} to="/">
                 Accueil
              </Nav.Link>
            )}
            {currentUser?.role === "admin" && (
              <>
                <Nav.Link as={Link} to="/create">
                  Créer un sondage
                </Nav.Link>
                <Nav.Link as={Link} to="/user/create">
                  Créer un utilisateur
                </Nav.Link>
                <Nav.Link as={Link} to="/admin">
                  📊 Tous les résultats
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Nom utilisateur + bouton déconnexion */}
          <Nav className="ms-auto d-flex align-items-center">
            {currentUser ? (
              <>
                <span className="me-2 fw-semibold">
                  👤 {currentUser.name}
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  ⬅️ Déconnexion
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="primary">
                Se connecter
              </Button>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      {/* Hover styling complet sans soulignement */}
      <style>
        {`
          .nav-link {
            border-radius: 0.25rem;
            transition: background-color 0.2s;
          }
          .nav-link:hover {
            background-color: #e9ecef !important;
            color: #0d6efd !important;
            text-decoration: none !important;
          }
          .dropdown-item:hover {
            background-color: #e9ecef;
            color: #0d6efd;
          }
        `}
      </style>
    </BootstrapNavbar>
  );
}

export default Navbar;

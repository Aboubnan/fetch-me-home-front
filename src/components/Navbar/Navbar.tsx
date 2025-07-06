import { useEffect, useState } from 'react';
import './Navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const { isAuthenticated, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const closeMenu = () => {
    setIsActive(false);
    document.body.style.overflow = 'auto';
  };

  const getDashboardRoute = () => {
    switch (userRole) {
      case 'admin':
        return '/dashboard-admin';
      case 'benevole':
        return '/dashboard-benevole';
      case 'association':
        return '/dashboard-association';
      default:
        return '/login';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsActive(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  }, [isActive]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsActive(false); // on ferme le menu si on revient sur desktop
        document.body.style.overflow = 'auto';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav className={isActive && isMobile ? 'menu-open' : ''}>
        <div className="burger-container">
          <div className="logo">
            <img src="src/assets/logo.png" alt="Logo" />
          </div>

          <button
            type="button"
            className="menu-burger"
            onClick={() => {
              if (isMobile) {
                setIsActive(!isActive);
                document.body.style.overflow = !isActive ? 'hidden' : 'auto';
              }
            }}
          >
            <i
              className={isActive ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'}
            />
          </button>
        </div>

        <ul className={isActive && isMobile ? 'active' : ''}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Accueil
            </NavLink>
          </li>

          <li>
            <NavLink to="/pets" onClick={closeMenu}>
              Adoption
            </NavLink>
          </li>

          <li>
            <NavLink to="/associations" onClick={closeMenu}>
              Association
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact#contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink to="/contact#faq" onClick={closeMenu}>
              FAQ
            </NavLink>
          </li>

          <li>
            {isAuthenticated ? (
              <div className="profile-menu">
                <NavLink
                  to={getDashboardRoute()}
                  className="profile-icon"
                  onClick={closeMenu}
                >
                  <i className="fa-solid fa-user" />
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="link-redirection right"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="link-redirection right"
                onClick={closeMenu}
              >
                Connexion
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

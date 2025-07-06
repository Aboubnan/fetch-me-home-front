import './Footer.scss';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer>
        <div className="socials">
          <h2>Rejoignez-nous !</h2>
          <ul>
            <li>
              <i className="fa-brands fa-facebook" />
            </li>
            <li>
              <i className="fa-brands fa-instagram" />
            </li>
            <li>
              <i className="fa-brands fa-tiktok" />
            </li>
          </ul>
        </div>
        <div className="footer">
          <ul>
            <li>
              <NavLink to="/mentions-legales#cookies">Cookies</NavLink>
            </li>
            <li>
              <NavLink to="/mentions-legales#mentions-legales">
                Mentions légales
              </NavLink>
            </li>
            <li>
              <NavLink to="/mentions-legales#politique-confidentialite">
                Politique de confidentialité
              </NavLink>
            </li>
            <li>© FetchMeHome 2025 - Tous droits réservés</li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;

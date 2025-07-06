// UnauthorizedPage.tsx
import { Link } from 'react-router-dom';
import './Unauthorized.scss';

export default function UnauthorizedPage() {
  return (
    <div className="unauthorized-container">
      <h1>Accès non autorisé</h1>
      <p>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link to="/" className="home-link">
        Retour à l'accueil
      </Link>
    </div>
  );
}

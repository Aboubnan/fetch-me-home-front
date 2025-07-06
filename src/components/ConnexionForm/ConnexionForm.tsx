// Import du type React depuis le module 'react' pour le typage TypeScript
import type React from 'react';

// Import du hook useState depuis React pour gérer l'état local du composant
import { useState } from 'react';

// Import des styles SCSS spécifiques à ce composant
import './ConnexionForm.scss';

// Import d'Axios, une bibliothèque pour effectuer des requêtes HTTP
import axios from 'axios';

// Import du hook useNavigate depuis react-router-dom pour la navigation programmatique
import { useNavigate } from 'react-router-dom';

// Import de l'URL de l'API depuis un fichier de configuration
import { API_URL } from '../../config';

// Import du hook personnalisé useAuth depuis le contexte d'authentification
import { useAuth } from '../AuthContext/AuthContext';

// Définition du composant fonctionnel ConnexionForm
export default function ConnexionForm() {
  // Déclaration d'un état pour le type d'utilisateur (bénévole ou association)
  // Initialisé à 'benevole' par défaut
  const [userType, setUserType] = useState<'benevole' | 'association'>(
    'benevole',
  );

  // Déclaration d'un état pour stocker l'email saisi par l'utilisateur
  const [email, setEmail] = useState('');

  // Déclaration d'un état pour stocker le mot de passe saisi par l'utilisateur
  const [password, setPassword] = useState('');

  // Déclaration d'un état pour stocker les messages d'erreur
  const [errorMsg, setErrorMsg] = useState('');

  // Initialisation du hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Récupération de la fonction login depuis le contexte d'authentification
  const { login } = useAuth();

  // Définition de la fonction asynchrone pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const endpoint =
        userType === 'benevole' ? 'login/user' : 'login/association';
      const response = await axios.post(`${API_URL}/${endpoint}`, {
        email,
        password,
      });

      const { token, role } = response.data;
      login(token, role);

      // Redirection spécifique
      if (userType === 'association') {
        navigate('/dashboard-association');
      } else {
        // Gestion des users (admin/bénévole)
        navigate(role === 'admin' ? '/dashboard-admin' : '/dashboard-benevole');
      }
    } catch (error: any) {
      setErrorMsg(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  // Rendu du composant
  return (
    // Conteneur principal avec mise en page flex
    <div className="connexion-flex-layout">
      {/* Colonne gauche contenant une image décorative */}
      <div className="connexion-img-col">
        <img
          src="/src/assets/img_patte.png" // Chemin de l'image
          alt="Décoration patte" // Texte alternatif
          className="decoration-img" // Classe CSS
        />
      </div>

      {/* Colonne droite contenant le formulaire */}
      <div className="connexion-container">
        {/* Carte contenant le formulaire */}
        <div className="form-card">
          {/* Logo de l'application */}
          <div className="logo">
            <img
              src="/src/assets/logo.png" // Chemin du logo
              alt="Logo Fetch Me Home" // Texte alternatif
            />
          </div>

          {/* Titre de la page */}
          <h2>Heureux de vous revoir !</h2>

          {/* Formulaire de connexion avec gestionnaire de soumission */}
          <form onSubmit={handleSubmit}>
            {/* Conteneur pour les boutons de sélection du type d'utilisateur */}
            <div className="user-type-toggle">
              {/* Bouton pour sélectionner le type "bénévole" */}
              <button
                type="button" // Type button pour éviter la soumission du formulaire
                className={`button ${userType === 'benevole' ? 'active' : ''}`} // Classe conditionnelle
                onClick={() => setUserType('benevole')} // Gestionnaire de clic
              >
                BÉNÉVOLE
              </button>
              {/* Bouton pour sélectionner le type "association" */}
              <button
                type="button"
                className={`button ${userType === 'association' ? 'active' : ''}`}
                onClick={() => setUserType('association')}
              >
                ASSOCIATION
              </button>
            </div>

            {/* Groupe de formulaire pour l'email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" // Type email pour la validation
                id="email" // ID pour l'association avec le label
                required // Champ obligatoire
                value={email} // Valeur liée à l'état
                onChange={(e) => setEmail(e.target.value)} // Gestionnaire de changement
              />
            </div>

            {/* Groupe de formulaire pour le mot de passe */}
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password" // Type password pour masquer le texte
                id="password" // ID pour l'association avec le label
                required // Champ obligatoire
                value={password} // Valeur liée à l'état
                onChange={(e) => setPassword(e.target.value)} // Gestionnaire de changement
              />
            </div>

            {/* Affichage conditionnel des messages d'erreur */}
            {errorMsg && <p className="error">{errorMsg}</p>}

            {/* Bouton de soumission du formulaire */}
            <button type="submit" className="submit-btn">
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

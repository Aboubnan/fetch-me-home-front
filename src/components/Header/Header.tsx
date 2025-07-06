import { useState, useEffect } from 'react';
// On importe uselocation, un hook qui permet récupérer le pathname
import { useLocation } from 'react-router-dom';
import './Header.scss';
import header_img from '../../assets/img_patte.png';
import axios from 'axios';

// Ajout du type pour les props
interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  // state pour stocker les nombres d'animaux, d'associations et de demandes d'adoption
  const [animalCount, setAnimalCount] = useState();
  const [associationCount, setAssociationCount] = useState();
  const [requestCount, setRequestCount] = useState();

  function fetchAnimalCount() {
    axios
      .get('http://localhost:3001/pets') // https://test-pet-foster-back.onrender.com/pets    --  https://aboubnan-server.eddi.cloud/pets
      .then((response) => {
        //ici, count est le  nombre d'animaux total
        setAnimalCount(response.data.count);
      });
  }

  function fetchAssociationCount() {
    axios
      .get('http://localhost:3001/associations') // https://test-pet-foster-back.onrender.com/pets    --  https://aboubnan-server.eddi.cloud/pets
      .then((response) => {
        //ici, count est le  nombre d'associations total
        setAssociationCount(response.data.count);
      });
  }

  function fetchRequestCount() {
    axios
      .get('http://localhost:3001/requests') // https://test-pet-foster-back.onrender.com/pets    --  https://aboubnan-server.eddi.cloud/pets
      .then((response) => {
        //ici, count est le  nombre de demandes d'adoption effectuées au total
        setRequestCount(response.data.count);
      });
  }

  // effet de bord pour récupéree le nombre d'animaux, associations et demandes d'adoptions
  useEffect(() => {
    fetchAnimalCount();
    fetchAssociationCount();
    fetchRequestCount();
  }, []);

  // On utilise useLocation pour savoir si on est sur la page d'inscription
  const location = useLocation();
  // On stocke dans isInscriptionPage si on est sur la page d'inscription
  const isInscriptionPage = location.pathname === '/inscription';
  return (
    <>
      <header className="header-content">
        <h1>{title}</h1>

        <div className="features-container">
          <div className="container-content">
            <div className="container-content-img">
              <img src={header_img} alt="Patte d'animal" />
            </div>

            <div className="stats-bubbles">
              <p className="stats-bubbles-1">
                {animalCount} {animalCount > 1 ? 'animaux' : 'animal'}
              </p>
              <p className="stats-bubbles-2">
                {associationCount}{' '}
                {associationCount > 1 ? 'associations' : 'association'}
              </p>
              <p className="stats-bubbles-3">
                {requestCount} {requestCount > 1 ? 'adoptions' : 'adoption'}
              </p>
            </div>
            <div className="text-container">
              <div className="grid-text">
                <p>
                  <strong>FetchMeHome</strong> facilite l’accueil temporaire
                  d’animaux en mettant en relation associations et familles
                  d’accueil bénévoles : Les associations publient les profils,
                  les bénévoles postulent en ligne, et le suivi est assuré par
                  l’association. Cette solution transitoire offre aux refuges un
                  répit et aux animaux un cadre sécurisé, chaleureux et stable
                  avant leur adoption définitive.
                </p>
              </div>
              {/* On masque le lien d'inscription si on est déjà sur la page d'inscription */}
              {!isInscriptionPage && (
                <a href="/inscription" className="link-redirection grid-a">
                  Inscription
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

import axios from 'axios'; // Import de la bibliothèque axios pour effectuer des requêtes HTTP
import { API_URL } from '../../config'; // Import de l'URL de l'API définie dans un fichier de configuration
import type AssociationType from '../@types/associations'; // Import du type TypeScript pour les objets association
import './Associations.scss'; // Import des styles CSS pour le composant
import { useEffect, useState } from 'react'; // Import des hooks React
import { useNavigate } from 'react-router-dom';

function Associations() {
  const [associations, setAssociations] = useState<AssociationType[]>([]); // État pour stocker les données des associations

  const [nameFilter, setNameFilter] = useState(''); // État pour le filtre de recherche par nom
  const [cityFilter, setCityFilter] = useState(''); // État pour le filtre de recherche par ville

  const cities = [...new Set(associations.map((a) => a.city))]; // Création d’un tableau de villes uniques extraites des associations

  const filteredAssociations = associations.filter(
    (assoc) =>
      assoc.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) && // Filtre par nom (insensible à la casse)
      (cityFilter === '' || assoc.city === cityFilter), // Filtre par ville si une ville est sélectionnée
  );

  const navigate = useNavigate(); // Hook pour la navigation entre les pages

  useEffect(() => {
    // Effet exécuté au montage du composant (une seule fois)
    axios
      .get(`${API_URL}/associations`) // Requête GET vers l’API
      .then((response) => {
        setAssociations(response.data.rows); // Mise à jour de l’état avec les données reçues
      })
      .catch((error) => {
        console.error(
          'Erreur lord de la récupération des associations : ', // Affichage d'une erreur en cas d'échec
          error,
        );
      });
  }, []);

  return (
    <section className="association-container">
      {' '}
      {/* Section principale du composant */}
      <div className="filtres">
        {' '}
        {/* Bloc des filtres */}
        <h2>Filtres</h2>
        <input
          type="text"
          placeholder="Rechercher une association" // Champ de recherche par nom
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)} // Mise à jour de l’état à chaque frappe
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)} // Mise à jour de la ville sélectionnée
        >
          <option value="">Toutes les villes</option> {/* Option par défaut */}
          {cities.map((city) => (
            <option key={city} value={city}>
              {' '}
              {/* Options dynamiques pour chaque ville */}
              {city}
            </option>
          ))}
        </select>
      </div>
      <div className="association-cards">
        {/* Affichage des associations filtrées */}
        {filteredAssociations.map((association) => (
          <div
            className="card"
            key={association.id}
            onClick={() => navigate(`/associations/${association.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/associations/${association.id}`);
              }
            }}
          >
            <div className="association-logo">
              <img src={association.logo} alt="Logo de l'association" />{' '}
              {/* Logo  */}
            </div>
            <div className="info">
              <h2>{association.name}</h2> {/* Nom de l’association */}
              <p>
                <i className="fa-solid fa-location-dot" /> {association.city}{' '}
                {/* Ville */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Associations; // Export du composant pour l’utiliser ailleurs

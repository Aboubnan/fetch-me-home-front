import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './AnimalsPage.scss';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { mapApiAnimal } from '../../utils/animalUtils';
import type { Animal } from '../@types/animal';

function AnimalsPage() {

  // recherche de paramètres de recherche species si accès fait via les liens des catégories d'animaux depuis le slider
  const [searchSpecies, setSearchSpecies] = useSearchParams();

  // State pour stocker les animaux récupérés de l'API
  const [apiAnimals, setApiAnimals] = useState<Animal[]>([]);
  // State pour le filtre de recherche par nom
  const [nameFilter, setNameFilter] = useState('');
  // State pour le filtre de recherche par ville
  const [cityFilter, setCityFilter] = useState('');
  // State pour le filtre de recherche par espèce
  const [speciesFilter, setSpeciesFilter] = useState(searchSpecies.get("species") ? searchSpecies.get("species") : ""); // on met la valeur de la recherche si elle existe dans l'url, sinon ""

  // State pour le filtre de recherche par genre
  const [genderFilter, setGenderFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Appel API pour récupérer les animaux
        const response = await axios.get(`${API_URL}/pets`);
        console.log("Données reçues de l'API :", response.data);
        const apiData = response.data;
        // On transforme les données en objets Animal
        const mappedAnimals = apiData.rows.map(mapApiAnimal);
        setApiAnimals(mappedAnimals);
      } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
      }
    };

    fetchAnimals();
  }, []);

  // Filtrage des animaux selon les filtres actifs (nom, ville, espèce, genre)
  const animalsToShow = apiAnimals.filter(
    (animal) =>
      animal.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase()) && // filtre par nom
      (cityFilter === '' || animal.location === cityFilter) && // filtre par ville
      (speciesFilter === '' ||
        animal.race.toLowerCase() === speciesFilter.toLowerCase()) && // filtre par espèce
      (genderFilter === '' || animal.gender === genderFilter), // filtre par genre
  );

  console.log('animaux rendus', apiAnimals);

  return (
    // Élément principal qui contient toute la page
    <main className="animal-cards-container">
      {/* Barre latérale contenant les filtres */}
      <div className="filtres-pets">
        <h2>Filtres</h2>
        {/* Champ de recherche contrôlé pour filtrer par nom d'animal */}
        <input
          type="text"
          placeholder="Trouver un animal"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)} // pour mettre à jour le filtre de recherche
        />
        {/* Sélecteurs pour filtrer par ville */}
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
        >
          <option value="">Toutes les villes</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Toulouse">Toulouse</option>
          <option value="Nice">Nice</option>
          <option value="Lille">Lille</option>
        </select>
        {/* Sélecteur pour filtrer par espèce */}
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">Toutes les espèces</option>
          <option value="chien">Chien</option>
          <option value="chat">Chat</option>
          <option value="lapin">Lapin</option>
          <option value="perroquet">Perroquet</option>
          <option value="furet">Furet</option>
          <option value="hamster">Hamster</option>
        </select>
        {/* Sélecteur pour filtrer par genre */}
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">Tous les genres</option>
          <option value="Male">Mâle</option>
          <option value="Femelle">Femelle</option>
        </select>
        <select>
          <option value="">Tous les âges</option>
          <option value="jeune">Jeune</option>
          <option value="adulte">Adulte</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      {/* Grille principale qui affiche les cartes d'animaux */}
      <section className="animal-grid">
        {animalsToShow.map((animal) => (
          <article
            className="animal-card"
            key={animal.id}
            onClick={() => navigate(`/pets/${animal.id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                //on appuie sur la touche entrée ou espace
                navigate(`/pets/${animal.id}`);
              }
            }}
          >
            {/* Image de l'animal */}
            <img
              src={`../${animal.pictures[0].url}`}  //1ere image de l'animal
              alt={`Photo de ${animal.name}`}
              className="animal-image"
              loading="lazy" // pour optimiser le chargement des images
            />
            {/* Nom et genre de l'animal */}
            <figcaption className="animal-caption">
              {animal.name}
              <i
                className={`fa-solid ${animal.gender === '♀' ? 'fa-venus' : 'fa-mars'} icon gender-icon`}
              />
            </figcaption>
            {/* Ville d'origine de l'animal */}
            <span className="animal-location">
              <i className="fa-solid fa-location-dot icon" /> {animal.location}
            </span>
          </article>
        ))}
      </section>
    </main>
  );
}
export default AnimalsPage;

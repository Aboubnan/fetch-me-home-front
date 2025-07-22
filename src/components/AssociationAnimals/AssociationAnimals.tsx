import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './AssociationAnimals.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { mapApiAnimal } from '../../utils/animalUtils';
import type { Animal } from '../@types/animal';
import type AssociationType from '../@types/associations';
import defaultImage from '../../assets/dog.png'; // adapte le chemin si besoin

function AssociationAnimals() {
  const { id } = useParams();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [association, setAssociation] = useState<AssociationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Une seule requête pour tout récupérer
        const response = await axios.get(`${API_URL}/associations/${id}`);

        if (!response.data) {
          throw new Error('Association non trouvée');
        }
        console.log("Données reçues de l'API :", response.data.pets);
        setAssociation({
          id: response.data.id,
          name: response.data.name,
          city: response.data.city,
          logo: response.data.logo || '',
          email: response.data.email || '',
          phone_number: response.data.phone_number || '',
          address: response.data.address || '',
          zip_code: response.data.zip_code || '',
          description: response.data.description || '',
        });

        // Transforme les animaux de l'association
        const mappedAnimals = response.data.pets?.map(mapApiAnimal) || [];
        setAnimals(mappedAnimals);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!association) {
    return <div className="error">Association non trouvée</div>;
  }

  console.log(animals);

  return (
    <main className="association-animals-container">
      <header className="association-header">
        <h1>Nos pensionnaires</h1>
        <p className="location">Association : {association.name}</p>
      </header>

      <section className="animal-grid">
        {animals.length === 0 ? (
          <div className="no-animals">
            <p>Aucun animal n'est actuellement disponible dans ce refuge.</p>
            <button type="button" onClick={() => navigate('/associations')}>
              Voir d'autres refuges
            </button>
          </div>
        ) : (
          animals.map((animal) => (
            <article
              className="animal-card"
              key={animal.id}
              onClick={() => navigate(`/pets/${animal.id}`)}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && navigate(`/pets/${animal.id}`)
              }
            >
              <img
                src={
                  animal.pictures?.[0]?.url
                    ? `${API_URL}${animal.pictures[0].url}`
                    : defaultImage
                }
                alt={`${animal.name}, ${animal.race} de ${animal.age} ans`}
                className="animal-image"
                loading="lazy"
              />

              <div className="animal-info">
                <figcaption className="animal-caption">
                  <h2>{animal.name}</h2>
                  <i
                    className={`fa-solid ${
                      animal.gender === '♀' ? 'fa-venus' : 'fa-mars'
                    } icon gender-icon`}
                  />
                </figcaption>

                <p className="animal-age">
                  <strong>Age : </strong>
                  {animal.age}
                </p>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default AssociationAnimals;

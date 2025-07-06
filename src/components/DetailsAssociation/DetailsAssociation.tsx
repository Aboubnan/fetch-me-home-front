import axios from 'axios'; // Import de la bibliothèque axios pour effectuer des requêtes HTTP
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config'; // Import de l'URL de l'API définie dans un fichier de configuration
import './DetailsAssociation.scss'; // Import des styles CSS pour le composant
import { useEffect, useState } from 'react'; // Import des hooks React
import type AssociationType from '../@types/associations';

function AssociationDetails() {
  const { id } = useParams();
  const [association, setAssociation] = useState<AssociationType | null>(null); // État pour stocker les données de l'association
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  useEffect(() => {
    axios.get(`${API_URL}/associations/${id}`).then((res) => {
      setAssociation(res.data);
    });
  }, [id]);

  if (!association) return <p>Chargement...</p>;
  console.log('Association data:', association);
  return (
    <section className="details-container">
      <div className="flex-details">
        <img
          className="logo-association"
          src={association.logo}
          alt="logo de l'association"
        />
        <div className="infos">
          <h2>{association.name}</h2>
          <p>
            <span>Email :</span> {association.email}
          </p>
          <p>
            <span>Telephone :</span> {association.phone_number}
          </p>
          <p>
            <span>Adresse :</span> {association.address}
          </p>
          <p>
            <span>Code postal :</span> {association.zip_code}
          </p>
          <p>
            <span>Ville :</span> {association.city}
          </p>
        </div>
      </div>
      <div className="description">
        <h3>Quelques mots sur l'association {association.name}</h3>
        <p>{association.description}</p>
        <button
          type="button"
          className="link-redirection"
          onClick={() => navigate(`/associations/${id}/animals`)}
        >
          Voir les animaux
        </button>
      </div>
    </section>
  );
}

export default AssociationDetails; // Export du composant pour l'utipser dans d'autres fichiers

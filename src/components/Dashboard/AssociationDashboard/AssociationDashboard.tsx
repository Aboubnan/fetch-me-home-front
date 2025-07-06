import { useState } from 'react';
import AssociationMenu from './AssociationMenu';
import AssociationAnimals from './AssociationAnimals';
import AssociationRequests from './AssociationRequests';
import AssociationProfile from './AssociationProfile';
import styles from '../dashboard.module.scss';

// Données initiales pour les animaux (demo)
const initialAnimals = [
  {
    id: 1,
    name: 'Mimi',
    photos: [
      'https://i.pravatar.cc/151?u=125',
      'https://i.pravatar.cc/152?u=132',
      'https://i.pravatar.cc/153?u=133',
    ],
    species: 'Chat',
    birthdate: '2022-05-01',
    sex: 'Femelle',
    description: 'Chatte européenne, 2 ans',
    available: true,
  },
  {
    id: 2,
    name: 'Tigrou',
    photos: [
      'https://i.pravatar.cc/154?u=134',
      'https://i.pravatar.cc/155?u=135',
    ],
    species: 'Chat',
    birthdate: '2020-03-15',
    sex: 'Male',
    description: 'Chat mâle, 4 ans',
    available: false,
  },
];

// des données fictives aussi pour les requêtes d'adoption
const initialRequests = [
  {
    id: 1,
    animal: { id: 1, name: 'Patai', photo: 'https://i.pravatar.cc/150?u=128' },
    user: 'Denis Patillard',
    user_avatar: 'https://i.pravatar.cc/150?u=jean.dupont',
    dates: '01/07/2025 - 15/07/2025',
    status: 'En attente',
    createdAt: '2025-05-18',
    updatedAt: '2025-05-18',
    request_text: "Je souhaite accueillir Mimi pendant mes vacances d'été.",
  },
  {
    id: 2,
    animal: { id: 2, name: 'Tigrou', photo: 'https://i.pravatar.cc/150?u=129' },
    user: 'Marine Linguine ',
    user_avatar: 'https://i.pravatar.cc/111?u=marie.martin',
    dates: '10/08/2025 - 20/08/2025',
    status: 'Nouveau',
    createdAt: '2025-05-18',
    updatedAt: '2025-05-18',
    request_text: 'Je peux garder Tigrou pendant mes congés.',
  },
];

// idem pour le profil association
const initialAssociation = {
  name: 'Association Les Chats Boiteux',
  email: 'contact@chatsboiteux.org',
  password: 'secret',
  confirmPassword: 'secret',
  address: '12 rue des Félins',
  zip_code: '75000',
  city: 'Paris',
  phone_number: '0102030405',
  description: 'Nous recueillons et faisons adopter des chats maltraités.',
  logo: 'https://i.pravatar.cc/150?u=126',
};

// Composant principal du dashboard association, il gère la navigation entre les sections, les statesanimaux, requêtes et profil
export default function AssociationDashboard() {
  // Section active (profil, animaux, requêtes)
  const [activeSection, setActiveSection] = useState('profil');
  // state profil association
  const [association, setAssociation] = useState(initialAssociation);
  // state liste des animaux
  const [animals, setAnimals] = useState(initialAnimals);
  // state liste des requêtes
  const [requests, setRequests] = useState(initialRequests);
  // Sélection d'une requête pour affichage du détail
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  // Sélection d'un animal pour affichage du détail
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);

  // Ajout d'un animal
  const addAnimal = (animal: any) =>
    setAnimals([...animals, { ...animal, id: Date.now() }]);
  // Suppression d'un animal
  const deleteAnimal = (id: number) =>
    setAnimals(animals.filter((animalRow) => animalRow.id !== id));

  // Valider/refuser une requête
  const updateRequestStatus = (id: number, status: string) =>
    setRequests(
      requests.map((requestRow) =>
        requestRow.id === id ? { ...requestRow, status } : requestRow,
      ),
    );
  // Supprimer une requête
  const deleteRequest = (id: number) =>
    setRequests(requests.filter((requestRow) => requestRow.id !== id));

  // Modification d'un animal
  const updateAnimal = (id: number, data: any) =>
    setAnimals(
      animals.map((animalRow) =>
        animalRow.id === id ? { ...animalRow, ...data } : animalRow,
      ),
    );

  // Mise à jour du profil association
  const updateAssociation = (data: any) => setAssociation(data);

  // Rendu principal : navigation + affichage de la section active
  return (
    <div className={`${styles.bulmaScope} container mt-5`}>
      <div className="columns">
        {/* Menu latéral de navigation */}
        <div className="column is-one-quarter">
          <AssociationMenu
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        {/* Section principale : profil, animaux ou requêtes */}
        <div className="column">
          {activeSection === 'profil' && (
            <AssociationProfile
              association={association}
              onUpdate={updateAssociation}
            />
          )}
          {activeSection === 'animaux' && (
            <AssociationAnimals
              animals={animals}
              onAdd={addAnimal}
              onDelete={deleteAnimal}
              selectedAnimal={selectedAnimal}
              setSelectedAnimal={setSelectedAnimal}
              onUpdate={updateAnimal}
            />
          )}
          {activeSection === 'requetes' && (
            <AssociationRequests
              requests={requests}
              onValidate={(id) => {
                updateRequestStatus(id, 'Accepté');
                setSelectedRequest(null);
              }}
              onRefuse={(id) => {
                updateRequestStatus(id, 'Refusé');
                setSelectedRequest(null);
              }}
              onDelete={(id) => {
                deleteRequest(id);
                setSelectedRequest(null);
              }}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
            />
          )}
        </div>
      </div>
    </div>
  );
}

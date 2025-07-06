interface Animal {
  id: number;
  name: string;
  photo: string;
}
interface Request {
  id: number;
  animal: Animal;
  user: string;
  user_avatar: string;
  dates: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  request_text: string;
}

// Props attendues par le composant
interface Props {
  requests: Request[];
  onValidate: (id: number) => void;
  onRefuse: (id: number) => void;
  onDelete: (id: number) => void;
  selectedRequest: Request | null;
  setSelectedRequest: (req: Request | null) => void;
}

// Composant principal pour la gestion des requêtes d'adoption côté association
export default function AssociationRequests({
  requests,
  onValidate,
  onRefuse,
  onDelete,
  selectedRequest,
  setSelectedRequest,
}: Props) {
  // Si une requête est sélectionnée, on affiche le détail
  if (selectedRequest) {
    // Affichage du détail de la requête
    return (
      <div className="column" style={{ minHeight: '60vh' }}>
        <section className="box">
          {/* Bouton retour à la liste */}
          <button
            type="button"
            className="button is-small mb-3"
            onClick={() => setSelectedRequest(null)}
          >
            ← Retour à la liste
          </button>
          <h2 className="title is-4 mb-4">Détail de la requête</h2>
          <div className="columns is-vcentered is-multiline">
            {/* Colonne Animal */}
            <div className="column is-one-third has-text-centered">
              <p className="has-text-dark has-text-weight-semibold mb-2">
                Animal
              </p>
              <img
                src={selectedRequest.animal.photo}
                alt={selectedRequest.animal.name}
                style={{
                  width: 100,
                  borderRadius: 8,
                  marginBottom: 8,
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <p className="has-text-dark">{selectedRequest.animal.name}</p>
            </div>
            {/* Colonne Utilisateur */}
            <div className="column is-one-third has-text-centered">
              <p className="has-text-dark has-text-weight-semibold mb-2">
                Utilisateur
              </p>
              <img
                src={selectedRequest.user_avatar}
                alt={selectedRequest.user}
                style={{
                  width: 100,
                  borderRadius: '50%',
                  marginBottom: 8,
                  display: 'block',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              />
              <p className="has-text-dark">{selectedRequest.user}</p>
            </div>
            {/* Colonne Statut et Dates */}
            <div className="column is-one-third has-text-centered">
              <p className="has-text-dark  mb-2">Statut</p>
              <span
                className={`tag is-medium is-${selectedRequest.status === 'Nouveau' ? 'info' : selectedRequest.status === 'En attente' ? 'warning' : selectedRequest.status === 'Accepté' ? 'success' : 'danger'}`}
              >
                {selectedRequest.status}
              </span>
              <hr className="my-2" />
              <p className="has-text-dark  mb-2">Dates</p>
              <p className="has-text-dark">{selectedRequest.dates}</p>
            </div>
          </div>
          <div className="box has-background-light mt-4 mb-4">
            <p className="has-text-dark has-text-weight-semibold mb-2">
              Description de la demande
            </p>
            <p className="has-text-dark">{selectedRequest.request_text}</p>
          </div>
          <div className="columns is-multiline mb-2">
            <div className="column is-half ">
              <p className="has-text-dark">
                Créée le : {selectedRequest.createdAt}
              </p>
            </div>
            <div className="column is-half">
              <p className="has-text-dark">
                Modifiée le : {selectedRequest.updatedAt}
              </p>
            </div>
          </div>
          {/* Actions sur la requête (valider, refuser, supprimer) */}
          <div className="mt-3 is-flex is-justify-content-center">
            <button
              type="button"
              className="button is-success is-small mr-2"
              onClick={() => {
                onValidate(selectedRequest.id);
                setSelectedRequest(null);
              }}
            >
              Valider
            </button>
            <button
              type="button"
              className="button is-danger is-small mr-2"
              onClick={() => {
                onRefuse(selectedRequest.id);
                setSelectedRequest(null);
              }}
            >
              Refuser
            </button>
            <button
              type="button"
              className="button is-light is-small"
              onClick={() => {
                onDelete(selectedRequest.id);
                setSelectedRequest(null);
              }}
            >
              Supprimer
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Sinon, on affiche la liste des requêtes
  return (
    <div className="column" style={{ minHeight: '60vh' }}>
      <section className="box">
        <h2 className="title is-4">Demandes d'adoption temporaire</h2>
        {/* Tableau des requêtes */}
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Animal</th>
              <th>Utilisateur</th>
              <th>Dates</th>
              <th>Statut</th>
              <th>Créée le</th>
              <th>Modifiée le</th>
            </tr>
          </thead>
          <tbody>
            {/* Chaque ligne représente une requête, on peut cliquer dessus pour voir le détail */}
            {requests.map((req) => (
              <tr
                key={req.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedRequest(req)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ')
                    setSelectedRequest(req);
                }}
                tabIndex={0}
              >
                <td>
                  {req.animal.name}
                  <br />
                  <img
                    src={req.animal.photo}
                    alt={req.animal.name}
                    style={{ width: 50, borderRadius: 8 }}
                  />
                </td>
                <td>
                  {req.user}
                  <br />
                  <img
                    src={req.user_avatar}
                    alt={req.user}
                    style={{ width: 50, borderRadius: '50%' }}
                  />
                </td>
                <td>{req.dates}</td>
                <td>
                  <span
                    className={`tag is-${req.status === 'Nouveau' ? 'info' : req.status === 'En attente' ? 'warning' : req.status === 'Accepté' ? 'success' : 'danger'}`}
                  >
                    {req.status}
                  </span>
                </td>
                <td>{req.createdAt}</td>
                <td>{req.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

import { useState } from 'react';

// Composant de gestion des animaux pour le dashboard association
// Affiche soit la liste des animaux, soit le détail/édition d'un animal
export default function AssociationAnimals({
  animals,
  onAdd,
  onDelete,
  selectedAnimal,
  setSelectedAnimal,
  onUpdate,
}: {
  animals: any;
  onAdd: any;
  onDelete: any;
  selectedAnimal: any;
  setSelectedAnimal: any;
  onUpdate: any;
}) {
  // Si un animal est sélectionné, on affiche le formulaire de détail/édition
  if (selectedAnimal) {
    const animal = selectedAnimal;
    // State pour le formulaire d'édition/ajout
    const [form, setForm] = useState(animal);

    // Fonction pr MAJ le state du formulaire local
    // - Récupère le nom et la nouvelle valeur du champ modifié
    // - Si c'est une checkbox, utilise checked (true/false), sinon value
    // - Met à jour le champ correspondant dans le state form
    const handleChange = (event: any) => {
      const { name, value, type, checked } = event.target;
      setForm((prevForm: any) => ({
        ...prevForm,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    // Fonction de soumission du formulaire d'animal
    // - Si l'animal a déjà un id, on met à jour
    // - Sinon, on ajoute un nouvel animal avec un id unique
    // - On désélectionne l'animal pour revenir à la liste
    const handleSubmit = (event: any) => {
      event.preventDefault();
      if (form.id) {
        onUpdate(animal.id, form);
      } else {
        onAdd({ ...form, id: Date.now() });
      }
      setSelectedAnimal(null);
    };

    return (
      <section className=" box">
        {/* Bouton retour à la liste */}
        <button
          type="button"
          className="button is-small mb-3"
          onClick={() => setSelectedAnimal(null)}
        >
          ← Retour à la liste
        </button>
        <h2 className="title is-4">Détail de l'animal</h2>
        {/* Galerie des photos de l'animal */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {form.photos?.map((url: string) => (
            <img
              key={url}
              src={url}
              alt={form.name + url}
              style={{ width: 100, borderRadius: 8 }}
            />
          ))}
        </div>
        {/* Formulaire d'édition/ajout */}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label has-text-dark">Nom</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label has-text-dark">Espèce</label>
            <input
              className="input"
              name="species"
              value={form.species}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label has-text-dark">Sexe</label>
            <div className="select">
              <select name="sex" value={form.sex} onChange={handleChange}>
                <option value="Femelle">Femelle</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label className="label has-text-dark">Date d'anniversaire</label>
            <input
              className="input"
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label has-text-dark">Disponible</label>
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label has-text-dark">Date de création</label>
            <input className="input" value={form.createdAt} readOnly />
          </div>
          <div className="field">
            <label className="label has-text-dark">Date de modification</label>
            <input className="input" value={form.updatedAt} readOnly />
          </div>
          <div className="field">
            <label className="label has-text-dark">Description</label>
            <textarea
              className="textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          {/* Boutons d'action : enregistrer, supprimer, annuler */}
          <div className="field is-grouped mt-4">
            <button className="button is-success is-small mr-2" type="submit">
              {form.id ? 'Enregistrer' : 'Créer'}
            </button>
            {form.id && (
              <button
                className="button is-danger is-small mr-2"
                type="button"
                onClick={() => {
                  onDelete(animal.id);
                  setSelectedAnimal(null);
                }}
              >
                Supprimer
              </button>
            )}
            <button
              className="button is-light is-small"
              type="button"
              onClick={() => setSelectedAnimal(null)}
            >
              Annuler
            </button>
          </div>
        </form>
      </section>
    );
  }

  // Sinon, on affiche la liste des animaux
  return (
    <div className="column" style={{ minHeight: '60vh' }}>
      <section className="box mb-5">
        <div className="level mb-4">
          <div className="level-left">
            <h2 className="title is-4 mb-0">Animaux de l'association</h2>
          </div>
          <div className="level-right">
            {/* Bouton pour ajouter un nouvel animal */}
            <button
              type="button"
              className="button is-primary is-small"
              onClick={() =>
                setSelectedAnimal({
                  name: '',
                  photos: [],
                  species: '',
                  birthdate: '',
                  sex: 'Femelle',
                  description: '',
                  available: true,
                  createdAt: new Date().toISOString().slice(0, 10),
                  updatedAt: new Date().toISOString().slice(0, 10),
                })
              }
            >
              Ajouter un animal
            </button>
          </div>
        </div>
        {/* Tableau des animaux */}
        <table className="table is-fullwidth is-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Photo</th>
              <th>Espèce</th>
              <th>Sexe</th>
              <th>Disponible</th>
              <th>Créé le</th>
              <th>Modifié le</th>
            </tr>
          </thead>
          <tbody>
            {/* Chaque ligne représente un animal, cliquable pour voir le détail */}
            {animals.map((animalRow: any) => (
              <tr
                key={animalRow.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedAnimal(animalRow)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    setSelectedAnimal(animalRow);
                  }
                }}
                tabIndex={0}
              >
                <td>{animalRow.name}</td>
                <td>
                  <img
                    src={animalRow.photos[0]}
                    alt={animalRow.name}
                    style={{ width: 60, borderRadius: 8 }}
                  />
                </td>
                <td>{animalRow.species}</td>
                <td>{animalRow.sex}</td>
                <td>
                  <span
                    className={`tag is-${animalRow.available ? 'success' : 'danger'}`}
                  >
                    {animalRow.available ? 'Oui' : 'Non'}
                  </span>
                </td>
                <td>{animalRow.createdAt}</td>
                <td>{animalRow.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

// Menu latéral pour la navigation dans le dashboard association
export default function AssociationMenu({
  activeSection,
  setActiveSection,
}: { activeSection: string; setActiveSection: (section: string) => void }) {
  return (
    <aside className="menu">
      {/* Section principale du menu */}
      <p className="menu-label">Général</p>
      <ul className="menu-list">
        {/* Lien vers la section Profil */}
        <li>
          <a
            className={activeSection === 'profil' ? 'is-active' : ''}
            onClick={() => setActiveSection('profil')}
            style={{ cursor: 'pointer' }}
          >
            Profil
          </a>
        </li>
        {/* Lien vers la section Animaux */}
        <li>
          <a
            className={activeSection === 'animaux' ? 'is-active' : ''}
            onClick={() => setActiveSection('animaux')}
            style={{ cursor: 'pointer' }}
          >
            Animaux
          </a>
        </li>
        {/* Lien vers la section Requêtes */}
        <li>
          <a
            className={activeSection === 'requetes' ? 'is-active' : ''}
            onClick={() => setActiveSection('requetes')}
            style={{ cursor: 'pointer' }}
          >
            Requêtes
          </a>
        </li>
      </ul>
    </aside>
  );
}

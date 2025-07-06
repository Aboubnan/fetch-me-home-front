import './LegalMentions.scss';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function LegalMentions() {
  const location = useLocation();

  // Effet qui permet de scroller automatiquement à la section correspondant au hash de l'URL (ex: #cookies ou #politique-confidentialite)
  useEffect(() => {
    // Vérifie si un hash est présent dans l'URL (ex: #cookies)
    if (location.hash) {
      // Récupère l'élément dont l'id correspond au hash (en retirant le #)
      const element = document.getElementById(location.hash.replace('#', ''));
      // Si l'élément existe, on scroll dessus de façon fluide
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <section className="legal-container">
      <h2 className="legal-title" id="mentions-legales">
        Mentions légales
      </h2>
      <div className="legal-section">
        <h3>Éditeur du site</h3>
        <p>
          Le site « FetchMeHome » est un projet de fin d’études réalisé par
          quatre apprenants en formation « Développeur Web et Web Mobile » :
          <br />
          <strong>Abderrehman Boubnan</strong>
          <br />
          <strong>Denis Patillot</strong>
          <br />
          <strong>Gwénaël Bertin</strong>
          <br />
          <strong>Duanee Narayanan</strong>
          <br />
          <br />
          Il n’a pas de caractère commercial et ne constitue pas une offre de
          services réelle.
        </p>
      </div>
      <div className="legal-section">
        <h3>Product Owner</h3>
        <p>Denis Patillot (co-pilote du projet)</p>
      </div>
      <div className="legal-section">
        <h3>Hébergeur</h3>
        <p>
          RENDER
          <br />2 rue Kellermann, XXXXX Lyon
          <br />
          Tél. : 09 72 10 10 07
        </p>
      </div>
      <div className="legal-section">
        <h3>Contact</h3>
        <p>
          <a href="mailto:contact@fetchmehome.org">contact@fetchmehome.org</a>
        </p>
      </div>
      <div className="legal-section">
        <h3>Propriété intellectuelle</h3>
        <p>
          Textes, code source et logos : propriété exclusive des auteurs du
          projet. Toute reproduction, adaptation ou diffusion, en tout ou
          partie, est interdite sans autorisation écrite préalable.
          <br />
          Images : issues de banques libres de droits ; leur utilisation sur ce
          site est conforme aux licences libres de droits associées.
        </p>
      </div>
      <div className="legal-section">
        <h3>Responsabilité</h3>
        <p>
          Ce site est fourni « en l’état » à titre pédagogique.
          <br />
          Les auteurs ne sauraient être tenus responsables des éventuelles
          erreurs ou de l’usage qui pourrait en être fait.
        </p>
      </div>
      <div className="legal-section">
        <h3>Données personnelles (RGPD)</h3>
        <p>
          Aucune donnée sensible n’est conservée ni exploitée ; les informations
          saisies sont uniquement simulées pour démonstration.
          <br />
          Vous pouvez néanmoins demander la suppression de toute donnée test à
          l’adresse : <br />{' '}
          <a href="mailto:contact@fetchmehome.org">contact@fetchmehome.org</a>.
        </p>
      </div>
      <div className="legal-section" id="cookies">
        <h3>Cookies</h3>
        <p>
          Cookies techniques uniquement, utilisés pour la navigation et la
          démonstration.
          <br />
          Vous pouvez les refuser via votre navigateur.
        </p>
      </div>
      <div className="legal-section">
        <h3>Liens hypertextes</h3>
        <p>
          Les liens externes sont fournis à titre d’exemple ; les auteurs
          n’exercent aucun contrôle sur leur contenu.
        </p>
      </div>
      <div className="legal-section" id="politique-confidentialite">
        <h3>Politique de confidentialité</h3>
        <p>
          FetchMeHome respecte la vie privée de ses utilisateurs. Aucune donnée
          personnelle n’est collectée à des fins commerciales ou publicitaires.
          <br />
          Les seules informations susceptibles d’être enregistrées sont celles
          saisies volontairement dans le cadre de la démonstration pédagogique
          du site.
          <br />
          Ces données ne sont ni transmises à des tiers, ni utilisées à d’autres
          fins que la simulation de fonctionnalités.
          <br />
          Vous pouvez demander la suppression de toute donnée test vous
          concernant en écrivant à{' '}
          <a href="mailto:contact@fetchmehome.org">contact@fetchmehome.org</a>.
          <br />
          Pour toute question relative à la confidentialité, contactez-nous à la
          même adresse.
        </p>
      </div>
      <div className="legal-section">
        <h3>Médiation et litiges</h3>
        <p>
          En cas de question ou de réclamation, écrivez-nous à{' '}
          <a href="mailto:contact@fetchmehome.org">contact@fetchmehome.org</a>.
          <br />
          Ce projet n’est pas soumis à une instance de médiation
          professionnelle.
        </p>
      </div>
    </section>
  );
}

export default LegalMentions;

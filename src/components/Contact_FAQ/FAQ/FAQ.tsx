import { useState } from "react";
import faqData from "../../../data/faqData.ts";
import './FAQ.scss';


function Faq() {

  // State "selectedCategory" qui contient la catégorie sélectionnée (on affiche la catégorie "Général" par défaut)
  const [selectedCategory, setSelectedCategory] = useState("Général");

  // State "openQuestion" qui contient la question ouverte (null par défaut car aucune question n'est ouverte au départ)
  const [openQuestion, setOpenQuestion] = useState(null);

  // "select" contient la catégorie sélectionnée
  const select = faqData.find((faq) => faq.category === selectedCategory);

  // Fonction pour ouvrir/fermer une question
  const toggleQuestion = (answer) => {
    if (openQuestion === answer) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(answer);
    }
  };

  return (
    <>
      <section className='faq-container' id="faq">

        <div className='faq-wrapper'>

          <div className='faq-desktop'>
            <h2 className='faq-title'>Foire aux questions</h2>
              {/* Gauche : Catégories */}
              <div className='faq-categories'>

                {/* Pour chaque catégorie dans "faqData", on affiche un bouton  */}
                {faqData.map((faq) => (
                  <button
                    type="button" 
                    key={faq.category}
                    className={faq.category === selectedCategory ? "faq-btn active" : "faq-btn"}

                    // Quand on clique sur un bouton, on change la catégorie sélectionnée et on referme toutes les questions
                    onClick={() => {
                      setSelectedCategory(faq.category);
                      setOpenQuestion(null);
                    }}
                  >
                    {faq.category}
                  </button>
                ))}
              </div>
          </div>


          {/* Droite : questions/réponses pour la catégorie sélectionnée */}
          <div className='faq-questions'>
            <div className="faq-item">

              {select.questions.map((faq) => (
                <div key={faq.question} className="faq-item">
                  <div 
                  className={openQuestion === faq.question ? 'div-question open' : 'div-question'}
                  // Cliquer pour ouvrir/fermer une question
                  onClick={() => toggleQuestion(faq.question)}>

                    <p className="question">{faq.question}</p>

                    {/* Si une question est ouverte, on affiche sa réponse */}
                    {openQuestion === faq.question && (
                      <p className="answer">{faq.answer}</p>
                    )}

                    <div className='chevron-container'>
                      <i className={openQuestion === faq.question ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Faq;
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router-dom';
import Faq from '../FAQ/FAQ';
import './Contact.scss';
import { useEffect } from 'react';

function Contact() {

    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.getElementById(location.hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);

  return (
    <>
        <section className="contact-container" id="contact">
            <hgroup className='contact-wrapper'>
                <h2 className="contact-title">Contact</h2>
                <p id='contact-wrapper-text'>Un problème ? Une question ? L’équipe FetchMeHome vous répondra dans les plus brefs délais.</p>
                <div className='contact-items'>
                    <a href="tel: 0123456789" className='contact-item'>
                        <i className="fa-solid fa-phone"/>
                        <a href="tel: 0123456789">0123456789</a>
                    </a>

                    <a href="mailto: fetchmehome@gmail.com" className='contact-item'>
                        <i className="fa-solid fa-envelope"/>
                        <a href="mailto: fetchmehome@gmail.com">fetchmehome@gmail.com</a>
                    </a>
                </div>
            </hgroup>

            <form action="#" className="contact-form">
                <div className="contact-form-container">
                    <fieldset className='contact-fieldset'>

                        <div className="name-container">
                            <label htmlFor="lastname" className='contact-label'> Nom
                                <input type="text" name="lastname" id="lastname" className='contact-input' />
                            </label>

                            <label htmlFor="firstname" className='contact-label'> Prénom
                                <input type="text" name="firstname" id="firstname" className='contact-input' />
                            </label>

                            <div className="role-container">
                                <p className='contact-label'>Je suis</p>

                                <label  htmlFor="visitor" className='contact-label'>
                                    <input type="radio" id="visitor" name="role" value="visitor" className='contact-radio' /> Un visiteur
                                </label>

                                <label  htmlFor="user" className='contact-label'>
                                    <input type="radio" id="user" name="role" value="user" className='contact-radio' /> Un bénévole
                                </label>

                                <label  htmlFor="association" className='contact-label'>
                                    <input type="radio" id="association" name="role" value="association" className='contact-radio' /> Une association
                                </label>
                            </div>
                        </div>

                        <label htmlFor="mail" className='contact-label'> E-mail
                                <input type="email" name="mail" id="mail" className='contact-input' />
                        </label>
                    </fieldset>

                    <fieldset className="contact-fieldset">
                        
                        <label htmlFor="subject" className='contact-label'> Sujet
                                <input type="text" name="subject" id="subject" className='contact-input' />
                        </label>

                        <label htmlFor="message" className='contact-label'> Message
                            <textarea name="message" id="message" className='contact-textarea' />
                        </label>
                    </fieldset>
                </div>

                <input type="submit" value="Envoyer" className="link-redirection" id="contact-btn" />
            </form>
        </section>

        <Faq />
    </>
  );
}

export default Contact;
import React from 'react';
import ContactForm from '../components/ContactForm.jsx';

export default function Contact() {
  return (
    <section aria-labelledby="contact-title">
      <h1 id="contact-title">Contactez-nous</h1>
      <p>
        Une question sur notre travail ? Envoyez-nous un message via le formulaire ci-dessous.
      </p>
      <ContactForm />
    </section>
  );
}

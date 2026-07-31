import React, { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');

  function validate(values) {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = 'Le nom est obligatoire.';
    if (!values.email.trim()) {
      newErrors.email = "L'adresse e-mail est obligatoire.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Le format de l'adresse e-mail est invalide.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères.';
    }
    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation dynamique côté client avant transmission réseau
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('sending');
    setFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Une erreur est survenue.');
      }

      setStatus('success');
      setFeedback(result.message || 'Message envoyé avec succès !');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || "Impossible d'envoyer le message pour le moment.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="name">Nom complet</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <span id="name-error" className="field-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" className="field-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <span id="message-error" className="field-error">{errors.message}</span>}
      </div>

      <button type="submit" className="btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>

      {status === 'success' && (
        <p className="form-feedback success" role="status">{feedback}</p>
      )}
      {status === 'error' && (
        <p className="form-feedback error" role="alert">{feedback}</p>
      )}
    </form>
  );
}

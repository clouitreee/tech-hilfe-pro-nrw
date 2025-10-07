'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
    gdprConsent: false,
    website: '', // Honeypot field - should remain empty
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Honeypot spam protection - if filled, silently reject
    if (formData.website) {
      // Pretend success to the bot
      setStatus('success');
      return;
    }

    if (!formData.gdprConsent) {
      setStatus('error');
      setErrorMessage('Bitte stimmen Sie der Datenschutzerklärung zu.');
      return;
    }

    try {
      // Use server action that saves to Supabase AND sends email notification
      const result = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
      });

      if (result.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          serviceInterest: '',
          message: '',
          gdprConsent: false,
          website: '',
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (status === 'success') {
    return (
      <motion.div
        className="bg-secondary/10 border border-secondary rounded-xl p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-display font-semibold text-primary mb-2">
          Vielen Dank für Ihre Nachricht!
        </h3>
        <p className="text-neutral-600 mb-6">
          Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
        </p>
        <Button onClick={() => setStatus('idle')} variant="secondary">
          Weitere Nachricht senden
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="form-label">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Max Mustermann"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="form-label">
          E-Mail-Adresse *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="max@beispiel.de"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="form-label">
          Telefonnummer (optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+49 123 456789"
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="serviceInterest" className="form-label">
          Interesse *
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          required
          className="form-input"
        >
          <option value="">Bitte wählen...</option>
          <option value="private_basis">Digital-Sorglos-Paket Basis</option>
          <option value="private_premium">Digital-Sorglos-Paket Premium</option>
          <option value="business_grundschutz">Business-Grundschutz</option>
          <option value="business_wachstum">Business-Wachstum</option>
          <option value="business_premium">Business-Partner Premium</option>
          <option value="general">Allgemeine Anfrage</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="form-label">
          Ihre Nachricht *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-input"
          placeholder="Beschreiben Sie bitte Ihr Anliegen..."
        />
      </div>

      {/* Honeypot field - hidden from users, visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website (bitte leer lassen)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* GDPR Consent */}
      <div className="flex items-start">
        <input
          type="checkbox"
          id="gdprConsent"
          name="gdprConsent"
          checked={formData.gdprConsent}
          onChange={handleChange}
          required
          className="mt-1 mr-3 w-4 h-4 text-secondary border-neutral-300 rounded focus:ring-secondary"
        />
        <label htmlFor="gdprConsent" className="text-sm text-neutral-600">
          Ich habe die{' '}
          <a href="/datenschutz" className="text-secondary hover:underline">
            Datenschutzerklärung
          </a>{' '}
          gelesen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage
          gespeichert werden. *
        </label>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMessage}
        </motion.div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
      </Button>

      <p className="text-sm text-neutral-500 text-center">
        * Pflichtfelder
      </p>
    </form>
  );
}

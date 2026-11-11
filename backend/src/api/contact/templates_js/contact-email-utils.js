'use strict';

const EVENT_LABELS = {
  mariage: 'Mariage',
  anniversaire: 'Anniversaire',
  bapteme: 'Baptême',
  entreprise: "Événement d'entreprise",
  autre: 'Autre',
};

const BRAND = {
  burgundy: '#8b1538',
  darkGrey: '#3a3a3a',
  foreground: '#1a1a1a',
  muted: '#6b6b6b',
  background: '#f5f5f5',
  white: '#ffffff',
  border: '#e5e5e5',
};

function formatEventType(eventType) {
  return EVENT_LABELS[eventType] || eventType || '—';
}

function formatDate(eventDate) {
  if (!eventDate) return '—';

  const date = new Date(`${eventDate}T12:00:00`);
  if (Number.isNaN(date.getTime())) return eventDate;

  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function buildPlainText({ fullName, email, eventLabel, formattedDate, guests, comment }) {
  return [
    'La Cuisine de Fred — Nouvelle demande de devis',
    '',
    `Client : ${fullName}`,
    `Email : ${email}`,
    `Événement : ${eventLabel}`,
    `Date : ${formattedDate}`,
    `Couverts : ${guests || '—'}`,
    '',
    'Commentaire :',
    comment || 'Aucun commentaire',
  ].join('\n');
}

module.exports = {
  BRAND,
  formatEventType,
  formatDate,
  buildPlainText,
};

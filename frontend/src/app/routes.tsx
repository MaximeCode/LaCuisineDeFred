import { createBrowserRouter, Outlet } from 'react-router';
import { Home } from './pages/Home';
import { LeChef } from './pages/LeChef';
import { Prestations } from './pages/Prestations';
import { Tarifs } from './pages/Tarifs';
import { Contact } from './pages/Contact';
import { MentionsLegales } from './pages/MentionsLegales';
import { PolitiqueConfidentialite } from './pages/PolitiqueConfidentialite';
import { NotFound } from './pages/NotFound';
import { PrestationDetail } from './pages/(one)/prestation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { DonneesLegalesProvider } from './context/DonneesLegalesContext';
import React from 'react';

function Root() {
  return (
    <DonneesLegalesProvider>
      <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </DonneesLegalesProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'le-chef',
        Component: LeChef,
      },
      {
        path: 'prestations',
        Component: Prestations,
      },
      {
        path: 'prestation/:documentId',
        Component: PrestationDetail,
      },
      {
        path: 'tarifs',
        Component: Tarifs,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: 'mentions-legales',
        Component: MentionsLegales,
      },
      {
        path: 'politique-de-confidentialite',
        Component: PolitiqueConfidentialite,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
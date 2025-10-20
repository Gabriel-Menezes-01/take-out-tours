import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/variables.css'
import './styles/reset.css'
import './index.css'
import { BASE_PATH } from './utils/router'
import App from './App.jsx'
import ExperiencesPage from './pages/ExperiencesPage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import DestinationsPage from './pages/DestinationsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'

import PersonalizedToursPage from './pages/PersonalizedToursPage'
import PatrimonioHistoriaPage from './pages/PatrimonioHistoriaPage';
import SaboresVinhosPage from './pages/SaboresVinhosPage';
import NaturezaAventuraPage from './pages/NaturezaAventuraPage';
import SintraCascaisPage from './pages/SintraCascaisPage';
import LisboaSetubalPage from './pages/LisboaSetubalPage';
import AlentejoPage from './pages/AlentejoPage';
import AlgarveAutenticoPage from './pages/AlgarveAutenticoPage';
import CentroPage from './pages/CentroPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/sintra-cascais',
    element: <SintraCascaisPage />,
  },
  {
    path: '/lisboa-setubal',
    element: <LisboaSetubalPage />,
  },
  {
    path: '/alentejo-evora-monsaraz',
    element: <AlentejoPage />,
  },
  {
    path: '/algarve-autentico',
    element: <AlgarveAutenticoPage />,
  },
  {
    path: '/centro-fatima-obidos-nazare',
    element: <CentroPage />,
  },
  {
    path: '/tours-personalizados',
    element: <PersonalizedToursPage />,
  },
  {
    path: '/patrimonio-historia',
    element: <PatrimonioHistoriaPage />,
  },
  {
    path: '/sabores-vinhos',
    element: <SaboresVinhosPage />,
  },
  {
    path: '/natureza-aventura',
    element: <NaturezaAventuraPage />,
  },
  {
    path: '/experiences',
    element: <ExperiencesPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/destinations',
    element: <DestinationsPage />,
  },
  {
    path: '/testimonials',
    element: <TestimonialsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <App />,
  },
], {
  basename: BASE_PATH
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

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
    path: `${BASE_PATH}/`,
    element: <App />,
  },
  {
    path: `${BASE_PATH}/sintra-cascais`,
    element: <SintraCascaisPage />,
  },
  {
    path: `${BASE_PATH}/lisboa-setubal`,
    element: <LisboaSetubalPage />,
  },
  {
    path: `${BASE_PATH}/alentejo-evora-monsaraz`,
    element: <AlentejoPage />,
  },
  {
    path: `${BASE_PATH}/algarve-autentico`,
    element: <AlgarveAutenticoPage />,
  },
  {
    path: `${BASE_PATH}/centro-fatima-obidos-nazare`,
    element: <CentroPage />,
  },
  {
    path: `${BASE_PATH}/tours-personalizados`,
    element: <PersonalizedToursPage />,
  },
  {
    path: `${BASE_PATH}/patrimonio-historia`,
    element: <PatrimonioHistoriaPage />,
  },
  {
    path: `${BASE_PATH}/sabores-vinhos`,
    element: <SaboresVinhosPage />,
  },
  {
    path: `${BASE_PATH}/natureza-aventura`,
    element: <NaturezaAventuraPage />,
  },
  {
    path: `${BASE_PATH}/experiences`,
    element: <ExperiencesPage />,
  },
  {
    path: `${BASE_PATH}/about`,
    element: <AboutPage />,
  },
  {
    path: `${BASE_PATH}/blog`,
    element: <BlogPage />,
  },
  {
    path: `${BASE_PATH}/destinations`,
    element: <DestinationsPage />,
  },
  {
    path: `${BASE_PATH}/testimonials`,
    element: <TestimonialsPage />,
  },
  {
    path: `${BASE_PATH}/contact`,
    element: <ContactPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

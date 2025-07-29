import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Layout Components
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import ScrollToTop from '@components/ui/ScrollToTop'
import Loading from '@components/ui/Loading'

// Pages (Lazy Loading)
const Home = React.lazy(() => import('@pages/Home'))
const Experiences = React.lazy(() => import('@pages/Experiences'))
const Destinations = React.lazy(() => import('@pages/Destinations'))
const About = React.lazy(() => import('@pages/About'))
const Blog = React.lazy(() => import('@pages/Blog'))
const Contact = React.lazy(() => import('@pages/Contact'))
const NotFound = React.lazy(() => import('@pages/NotFound'))

// Page Transition Animation
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
}

function App() {
  return (
    <div className="app">
      <Navbar />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loading />}>
            <motion.div {...pageTransition}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/experiencias" element={<Experiences />} />
                <Route path="/destinos" element={<Destinations />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App

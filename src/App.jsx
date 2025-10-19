import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Destinations from './sections/Destinations';
import PersonalizedTours from './sections/PersonalizedTours';
import Fleet from './sections/Fleet';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Booking from './sections/Booking';
import Footer from './sections/Footer';
import PriceTableWithImages from './components/PriceTableWithImages';

function App() {
  return (
    <>
      <Navbar />
      <main>
  <Hero />
  <PriceTableWithImages />
  <PersonalizedTours />
  <Destinations />
  <Fleet />
        <Testimonials />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}

export default App;

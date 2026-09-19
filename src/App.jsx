import StarryBackground from './components/StarryBackground';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experiences from './sections/Experiences';
import Hobbies from './sections/Hobbies';
import Gallery from './sections/Gallery';
import Testimonial from './sections/Testimonial';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

const App = () => {
  return (
    <>
      <StarryBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="container mx-auto max-w-7xl">
          <About />
          <Projects />
          <Experiences />
          <Hobbies />
        </div>
        <Gallery />
        <Testimonial />
        <div className="container mx-auto max-w-7xl">
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;

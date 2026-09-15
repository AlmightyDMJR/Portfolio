import { PhotoGallery } from '@/components/ui/gallery';
import { galleryPhotos } from '../constants';

const Gallery = () => {
  const handleScrollToTestimonials = () => {
    const el = document.getElementById('testimonials');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="stories" className="section-spacing relative overflow-hidden py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <PhotoGallery
          photos={galleryPhotos}
          subtitle="A Journey Through Visual Stories"
          title="Welcome to My"
          highlightWord="Stories"
          buttonText="Explore What People Say ↓"
          onButtonClick={handleScrollToTestimonials}
        />
      </div>
    </section>
  );
};

export default Gallery;

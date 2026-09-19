import { PhotoGallery } from '@/components/ui/gallery';
import { galleryPhotos } from '../constants';

const Gallery = () => {
  return (
    <section id="stories" className="section-spacing overflow-hidden py-4 md:py-8 my-4 md:my-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <PhotoGallery
          photos={galleryPhotos}
          subtitle="A Journey Through Visual Stories"
          title="Welcome to My"
          highlightWord="Moments"
        />
      </div>
    </section>
  );
};

export default Gallery;

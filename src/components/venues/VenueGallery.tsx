import { useState } from 'react';
import { Media } from '../../types/media';
import ImageComponent from '../common/Image';
import Button from '../common/Buttons';

interface VenueGalleryProps {
  images: Media[];
}

const VenueGallery = ({ images }: VenueGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="w-full h-96 relative">
        <ImageComponent
          src={images[currentImage].url}
          alt={images[currentImage].alt || 'Venue image'}
          className="w-full h-full "
          width="800"
          height="600"
        />
        {images.length > 1 && (
          <>
            <Button
              onClick={handlePrevious}
              className="absolute left-4 top-[50%] -translate-y-1/2  text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label="Previous image"
            >
              ←
            </Button>
            <Button
              onClick={handleNext}
              className="absolute right-4 top-[50%] -translate-y-1/2  text-white p-2 rounded-full hover:bg-opacity-75"
              aria-label="Next image"
            >
              →
            </Button>
          </>
        )}{' '}
      </div>

      <div className="flex gap-2 overflow-x-auto overflow-y-hidden mt-4">
        {images.map((image, index) => (
          <Button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-shrink-0 w-20 h-20 p-0 ${currentImage === index ? 'scale-105 shadow-lg' : ''}`}
          >
            <ImageComponent
              src={image.url}
              alt={image.alt || `Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              width="80"
              height="80"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VenueGallery;

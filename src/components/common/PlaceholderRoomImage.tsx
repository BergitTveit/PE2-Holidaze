import { Hotel } from 'lucide-react';

interface PlaceholderRoomImageProps {
  imagePath: string;
  altText: string;
}

export const PlaceholderRoomImage = ({ imagePath, altText }: PlaceholderRoomImageProps) => (
  <div className="relative h-full">
    <img src={imagePath} alt={altText} className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-neutral/70">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-[-40%] flex flex-col items-center">
        <Hotel className="w-12 h-12 text-primary mb-2" aria-hidden="true" />
        <p className="text-primary text-sm text-center">No image available yet</p>
      </div>
    </div>
  </div>
);

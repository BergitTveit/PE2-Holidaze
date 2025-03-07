interface ImageComponentProps {
  src: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
}

export const ImageComponent = ({
  src,
  alt,
  className = '',
  width = 'auto',
  height = 'auto',
}: ImageComponentProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
      width={width}
      height={height}
    />
  );
};

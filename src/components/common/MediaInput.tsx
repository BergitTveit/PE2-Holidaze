import React from 'react';
import type { Media } from '../../schemas/shared/media';
import Button from './Buttons';

interface MediaInputProps {
  value: Media | null;
  onChange: (value: Media | null) => void;
  error?: {
    url?: string;
    alt?: string;
  };
  label?: string;
}

const MediaInput = ({ value, onChange, error, label }: MediaInputProps) => {
  const handleChange = (field: keyof Media) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (field === 'url') {
      onChange(newValue ? { url: newValue, alt: value?.alt || '' } : null);
    } else if (field === 'alt' && value?.url) {
      onChange({ ...value, alt: newValue });
    }
  };

  return (
    <div className="space-y-6">
      {label && <label className="block text-lg font-medium mb-2">{label}</label>}
      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <input
            type="url"
            placeholder="Media URL"
            value={value?.url || ''}
            onChange={handleChange('url')}
            className="w-full h-10"
          />
          {value?.url && (
            <Button
              type="button"
              onClick={() => onChange(null)}
              className="ml-2 px-4 h-10 bg-red-500 text-white"
            >
              Remove Image
            </Button>
          )}
        </div>
        <input
          type="text"
          placeholder="Alt text"
          value={value?.alt || ''}
          onChange={handleChange('alt')}
          className="w-full h-10"
        />
      </div>
      {value?.url && (
        <div className="relative h-64">
          <img
            src={value.url}
            alt={value.alt || 'Preview'}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
      <div className="space-y-1">
        {error?.url && <p className="text-red-500">{error.url}</p>}
        {error?.alt && <p className="text-red-500">{error.alt}</p>}
      </div>
    </div>
  );
};

export default MediaInput;

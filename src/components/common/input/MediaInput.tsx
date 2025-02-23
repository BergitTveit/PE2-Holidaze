import React from 'react';
import type { Media } from '../../../schemas/shared/media';
import { Button } from '../Buttons';

interface MediaInputProps {
  value: Media | null;
  onChange: (value: Media | null) => void;
  error?: {
    url?: string;
    alt?: string;
  };
  label?: string;
}
export const MediaInput = ({ value, onChange, error, label }: MediaInputProps) => {
  const handleChange = (field: keyof Media) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (field === 'url') {
      onChange(newValue ? { url: newValue, alt: value?.alt || '' } : null);
    } else if (field === 'alt' && value?.url) {
      onChange({ ...value, alt: newValue });
    }
  };

  return (
    <div className="space-y-4">
      {label && <h3 className="text-lg font-semibold text-neutral">{label}</h3>}
      <div className="space-y-3">
        <div className="flex gap-3">
          <input
            type="url"
            placeholder="Media URL"
            value={value?.url || ''}
            onChange={handleChange('url')}
            className="flex-1 h-12 px-4 border-2 border-primary  focus:border-primary-dark focus:outline-none transition-colors"
          />
          {value?.url && (
            <Button variant="secondary" type="button" onClick={() => onChange(null)}>
              Remove
            </Button>
          )}
        </div>
        <input
          type="text"
          placeholder="Alt text"
          value={value?.alt || ''}
          onChange={handleChange('alt')}
          className="w-full h-12 px-4 border-2 border-primary focus:border-primary-dark focus:outline-none transition-colors"
        />
      </div>
      {value?.url && (
        <div className="relative h-32 overflow-hidden border-2 border-primary">
          <img
            src={value.url}
            alt={value.alt || 'Preview'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {(error?.url || error?.alt) && (
        <div className="space-y-1">
          {error?.url && <p className="text-error text-sm">{error.url}</p>}
          {error?.alt && <p className="text-error text-sm">{error.alt}</p>}
        </div>
      )}
    </div>
  );
};

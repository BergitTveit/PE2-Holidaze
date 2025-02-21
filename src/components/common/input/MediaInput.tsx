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
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Media URL"
            value={value?.url || ''}
            onChange={handleChange('url')}
            className="flex-1 h-9 px-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {value?.url && (
            <Button
              type="button"
              onClick={() => onChange(null)}
              className="h-9 px-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded border border-red-200 transition-colors"
            >
              Remove
            </Button>
          )}
        </div>
        <input
          type="text"
          placeholder="Alt text"
          value={value?.alt || ''}
          onChange={handleChange('alt')}
          className="w-full h-9 px-3 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>
      {value?.url && (
        <div className="relative h-24 rounded overflow-hidden border border-gray-200">
          <img
            src={value.url}
            alt={value.alt || 'Preview'}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {(error?.url || error?.alt) && (
        <div className="space-y-1 text-xs">
          {error?.url && <p className="text-red-500">{error.url}</p>}
          {error?.alt && <p className="text-red-500">{error.alt}</p>}
        </div>
      )}
    </div>
  );
};

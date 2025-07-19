'use client';

import { useState } from 'react';
import { uploadApartmentPhotos } from '@/services/apartmentService';
import { useRouter } from 'next/navigation';

interface PhotoUploaderProps {
  apartmentId: string;
}

export default function PhotoUploader({ apartmentId }: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('photos', file);
      });

      await uploadApartmentPhotos(apartmentId, formData);
      router.push(`/apartments/${apartmentId}`);
    } catch (err) {
      setError('Failed to upload photos. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white max-w-5xl mx-auto mt-10 rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-[#00224F] mb-6">Upload Photos</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Photos (Max 5)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-3 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-gray-50 file:text-gray-700
              hover:file:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-[#00224F]"
            max={5}
          />
          <p className="mt-2 text-sm text-gray-500">
            {files.length > 0
              ? `${files.length} file(s) selected`
              : 'No files selected'}
          </p>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
                  title="Remove photo"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push(`/apartments/${apartmentId}`)}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading || files.length === 0}
            className="px-5 py-2 rounded-lg bg-[#00224F] text-white hover:bg-[#001A3A] text-sm font-semibold transition disabled:opacity-50"
          >
            {isUploading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : 'Upload Photos'}
          </button>
        </div>
      </form>
    </div>
  );
}

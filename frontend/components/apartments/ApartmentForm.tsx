'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createApartment } from '@/services/apartmentService';
import { CreateApartmentDto } from '@/types/apartment';

const EGYPTIAN_CITIES = [
  'Cairo', 'Alexandria', 'Giza', 'Shubra El-Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura',
  'El-Mahalla El-Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Faiyum', 'Zagazig', 'Aswan', 'Damietta',
  'Damanhur', 'Minya', 'Beni Suef', 'Qena', 'Sohag', 'Hurghada', '6th of October City',
  'Shebin El Kom', 'Banha', 'Kafr El Sheikh', 'Arish', 'Mallawi', '10th of Ramadan City',
  'Bilbais', 'Marsa Matruh', 'Idfu', 'Mit Ghamr', 'Al-Hamidiyya', 'Desouk', 'Qalyub',
  'Abu Kabir', 'Kafr El Dawwar', 'Girga', 'Akhmim'
];


export default function ApartmentForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateApartmentDto>({
    unitName: '',
    unitNumber: '',
    unitFloor: 0,
    unitArea: 0,
    city: '',
    project: '',
    price: 0,
    bedrooms: 1,
    baths: 1,
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['price', 'unitArea', 'unitFloor', 'bedrooms', 'baths'].includes(name)
        ? value === '' ? 0 : Number(value)
        : value,
    }));
  };

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '') {
      setFormData((prev) => ({
        ...prev,
        [name]: 0,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const newApartment = await createApartment(formData);
      router.push(`/apartments/${newApartment.id}`);
    } catch (err) {
      setError('Failed to create apartment. Please try again.');
      console.error('Creation error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle =
    'peer w-full px-4 pt-5 pb-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00224F] placeholder-transparent';

  const labelStyle =
    'absolute left-4 top-2.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400';

  const selectStyle = `${inputStyle} appearance-none`;

  return (

    <div className="bg-white max-w-5xl mx-auto mt-10 rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-[#00224F] mb-6">Add New Apartment</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Unit Name & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              id="unitName"
              name="unitName"
              placeholder=" "
              value={formData.unitName}
              onChange={handleChange}
              required
              className={inputStyle}
            />
            <label htmlFor="unitName" className={labelStyle}>
              Unit Name
            </label>
          </div>

          <div className="relative">
            <textarea
              id="description"
              name="description"
              placeholder=" "
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className={inputStyle + ' resize-none'}
            />
            <label htmlFor="description" className={labelStyle}>
              Description
            </label>
          </div>
        </div>

        {/* Price / Beds / Baths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Price', name: 'price', min: 0, step: 1000 },
            { label: 'Bedrooms', name: 'bedrooms', min: 1 },
            { label: 'Baths', name: 'baths', min: 1 },
          ].map((field) => (
            <div className="relative" key={field.name}>
              <input
                type="number"
                id={field.name}
                name={field.name}
                min={field.min}
                step={field.step || 1}
                value={formData[field.name as keyof CreateApartmentDto] || ''}
                onChange={handleChange}
                onBlur={handleNumberBlur}
                placeholder=" "
                className={inputStyle}
              />
              <label htmlFor={field.name} className={labelStyle}>
                {field.label}
              </label>
            </div>
          ))}
        </div>

        {/* Unit Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Unit Number', name: 'unitNumber', type: 'text' },
            { label: 'Unit Floor', name: 'unitFloor', type: 'number', min: 0 },
            { label: 'Unit Area (m²)', name: 'unitArea', type: 'number', min: 0, step: 0.1 },
          ].map((field) => (
            <div className="relative" key={field.name}>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                min={field.min}
                step={field.step}
                placeholder=" "
                value={field.type === 'number'
                  ? formData[field.name as keyof CreateApartmentDto] || ''
                  : formData[field.name as keyof CreateApartmentDto]}
                onChange={handleChange}
                onBlur={field.type === 'number' ? handleNumberBlur : undefined}
                className={inputStyle}
              />
              <label htmlFor={field.name} className={labelStyle}>
                {field.label}
              </label>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={selectStyle}
            >
              <option value="">Select a city</option>
              {EGYPTIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <label htmlFor="city" className={labelStyle}>
              City
            </label>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              id="project"
              name="project"
              placeholder=" "
              value={formData.project}
              onChange={handleChange}
              className={inputStyle}
            />
            <label htmlFor="project" className={labelStyle}>
              Project
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => router.push('/apartments')}
            className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded-lg bg-[#00224F] text-white hover:bg-[#001A3A] text-sm font-semibold transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? 'Creating...' : 'Create Apartment'}
          </button>
        </div>
      </form>
    </div>
  );
}
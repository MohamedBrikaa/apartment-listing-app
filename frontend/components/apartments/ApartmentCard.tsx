import { Apartment } from '@/types/apartment';
import Image from 'next/image';
import Link from 'next/link';

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 w-full">
        {apartment.photos && apartment.photos.length > 0 ? (
          <Image
            src={apartment.photos[0].url}
            alt={apartment.unitName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-gray-200 h-full w-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#00224F] line-clamp-1">
            {apartment.unitName}
          </h3>
          <span className="text-lg font-bold text-blue-600">
            EGP {apartment.price.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {apartment.description}
        </p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a1 1 0 011-1h4a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4zM5 7v10h10V7H5z" />
            </svg>
            {apartment.bedrooms} beds
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a1 1 0 011-1h8a1 1 0 011 1v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h1V4zM5 7v10h10V7H5z" />
            </svg>
            {apartment.baths} baths
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{apartment.city}</span>
          <Link
            href={`/apartments/${apartment.id}`}
            className="bg-[#00224F] text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#001A3A] transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

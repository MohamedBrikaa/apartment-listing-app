"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Apartment } from '@/types/apartment';
import { BedDouble, Bath, ImagePlus, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ApartmentDetailsProps {
  apartment: Apartment;
}

export default function ApartmentDetails({ apartment }: ApartmentDetailsProps) {
  const [formattedDate, setFormattedDate] = useState('');
  useEffect(() => {
    const date = new Date(apartment.createdAt).toISOString().slice(0, 10);
    setFormattedDate(date);
  }, [apartment.createdAt]);
  return (
    <div className="bg-white max-w-5xl mx-auto mt-10 rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-[#00224F] line-clamp-2">
          {apartment.unitName}
        </h1>
        <span className="text-3xl font-bold text-blue-600 whitespace-nowrap">
          EGP {apartment.price.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 space-x-6">
        <span className="flex items-center">
          <BedDouble className="w-4 h-4 mr-1" />
          {apartment.bedrooms} beds
        </span>
        <span className="flex items-center">
          <Bath className="w-4 h-4 mr-1" />
          {apartment.baths} baths
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm">
        <p><strong>City:</strong> {apartment.city}</p>
        <p><strong>Project:</strong> {apartment.project}</p>
        <p><strong>Unit Number:</strong> {apartment.unitNumber}</p>
        <p><strong>Floor:</strong> {apartment.unitFloor}</p>
        <p><strong>Area:</strong> {apartment.unitArea} m²</p>
        <p><strong>Created:</strong> {formattedDate}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[#00224F] mb-2">Unit Description</h2>
        <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
          {apartment.description}
        </p>
      </div>

      {/* Photos */}
      {apartment.photos && apartment.photos.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-[#00224F] mb-4">Photos</h2>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000 }}
            spaceBetween={16}
            slidesPerView={1}
            className="rounded-lg overflow-hidden h-72"
          >
            {apartment.photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-72">
                  <Image
                    src={photo.url}
                    alt={`Apartment photo ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
        <Link
          href={`/apartments/${apartment.id}/photos`}
          className="px-5 py-2 rounded-lg bg-[#00224F] text-white hover:bg-[#001A3A] text-sm font-semibold transition"
        >
          <ImagePlus className="w-4 h-4 mr-2 inline-block" /> Upload Photos
        </Link>
        <Link
          href="/apartments"
          className="px-5 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 text-sm font-medium transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2 inline-block" /> Back to List
        </Link>
      </div>
    </div>
  );
}

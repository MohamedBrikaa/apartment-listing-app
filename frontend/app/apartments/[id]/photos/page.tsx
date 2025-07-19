'use client'
import { use } from 'react';
import PhotoUploader from '@/components/apartments/PhotoUploader';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function ApartmentPhotosPage({ params }: Props) {
  const { id } = use(params);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Photos</h1>
      <PhotoUploader apartmentId={id} />
    </div>
  );
}
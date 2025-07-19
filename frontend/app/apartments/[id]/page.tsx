import { getApartmentById } from '@/services/apartmentService';
import ApartmentDetails from '@/components/apartments/ApartmentDetails';

export default async function ApartmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: apartment } = await getApartmentById(id);
  if (!apartment) {
    return <div>Apartment not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Apartment Details{apartment.unitName ? `: ${apartment.unitName}` : ''}
      </h1>

      <ApartmentDetails apartment={apartment} />
    </div>
  );
}

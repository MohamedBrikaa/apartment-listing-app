import { getApartments } from '@/services/apartmentService';
import ApartmentCard from '@/components/apartments/ApartmentCard';
import ApartmentFilter from '@/components/apartments/ApartmentFilter';
import Pagination from '@/components/shared/Pagination';
import { Apartment } from '@/types/apartment';

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const page = parseInt(resolvedParams.page as string) || 1;
  const limit = parseInt(resolvedParams.limit as string) || 6;

  const filters = {
    unitName: resolvedParams.unitName || '',
    unitNumber: resolvedParams.unitNumber || '',
    project: resolvedParams.project || '',
    page,
    limit,
  };

  const { data: apartments = [], total = 0 } = await getApartments(filters);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Apartments</h1>

      <ApartmentFilter />

      {apartments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No apartments found matching your criteria</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment: Apartment) => (
              <ApartmentCard key={apartment.id} apartment={apartment} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            resolvedParams={resolvedParams}
          />
        </>
      )}
    </div>
  );
}
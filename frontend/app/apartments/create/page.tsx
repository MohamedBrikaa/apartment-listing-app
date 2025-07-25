import ApartmentForm from '@/components/apartments/ApartmentForm';

export default function CreateApartmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Apartment</h1>
      <ApartmentForm />
    </div>
  );
}
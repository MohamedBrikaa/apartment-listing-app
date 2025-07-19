export interface Apartment {
  id: string;
  unitName: string;
  unitFloor: number;
  unitNumber: string;
  unitArea: number;
  city: string;
  project: string;
  price: number;
  bedrooms: number;
  baths: number;
  description?: string;
  photos: ApartmentPhoto[];
  createdAt: string;
}

export interface ApartmentPhoto {
  id: string;
  url: string;
  apartmentId: string;
}

export interface CreateApartmentDto {
  unitName: string;
  unitFloor: number;
  unitNumber: string;
  unitArea: number;
  city: string;
  project: string;
  price: number;
  bedrooms: number;
  baths: number;
  description?: string;
}

export interface FilterApartmentDto {
  unitName?: string;
  unitNumber?: string;
  project?: string;
  page?: number;
  limit?: number;
}

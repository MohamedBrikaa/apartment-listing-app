import axios from 'axios';

const isBrowser = typeof window !== 'undefined';
const BASE_URL = isBrowser
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.INTERNAL_API_URL;


export const createApartment = async (data: unknown) => {
  const response = await axios.post(`${BASE_URL}/api/apartments`, data);
  return response.data.data;
};

export const getApartments = async (filters = {}) => {
  const response = await axios.get(`${BASE_URL}/api/apartments`, { params: filters });
  return {
    data: response.data.data.apartments,
    total: response.data.data.total,
  };
};

export const getApartmentById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/api/apartments/${id}`);
  return response.data;
};

export const uploadApartmentPhotos = async (id: string, photos: FormData) => {
  const response = await axios.post(`${BASE_URL}/api/apartments/${id}/photos`, photos, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
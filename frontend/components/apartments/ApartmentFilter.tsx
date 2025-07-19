'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FilterApartmentDto } from '@/types/apartment';

interface ApartmentFilterProps {
  onFilterChange?: (filters: FilterApartmentDto) => void;
}

export default function ApartmentFilter({ onFilterChange }: ApartmentFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterApartmentDto>({
    unitName: '',
    unitNumber: '',
    project: '',
    page: 1,
    limit: 6,
  });

  useEffect(() => {
    if (!searchParams) return;

    const unitName = searchParams.get('unitName') || '';
    const unitNumber = searchParams.get('unitNumber') || '';
    const project = searchParams.get('project') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 6);

    const initialFilters: FilterApartmentDto = {
      unitName,
      unitNumber,
      project,
      page,
      limit,
    };

    setFilters(initialFilters);
    onFilterChange?.(initialFilters);
  }, [searchParams, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (filters.unitName) params.set('unitName', filters.unitName);
    if (filters.unitNumber) params.set('unitNumber', filters.unitNumber);
    if (filters.project) params.set('project', filters.project);
    if (filters.page) params.set('page', filters.page.toString());
    if (filters.limit) params.set('limit', filters.limit.toString());

    if (pathname) {
      router.push(`${pathname}?${params.toString()}`);
      onFilterChange?.(filters);
    }
  };

  const handleReset = () => {
    const resetFilters: FilterApartmentDto = {
      unitName: '',
      unitNumber: '',
      project: '',
      page: 1,
      limit: 10,
    };

    setFilters(resetFilters);
    if (pathname) {
      router.push(pathname);
      onFilterChange?.(resetFilters);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 bg-white shadow-md p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <input
        type="text"
        name="unitName"
        value={filters.unitName}
        onChange={handleChange}
        placeholder="🔍 Unit Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00224F] outline-none transition"
      />
      <input
        type="text"
        name="unitNumber"
        value={filters.unitNumber}
        onChange={handleChange}
        placeholder="🏢 Unit Number"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00224F] outline-none transition"
      />
      <input
        type="text"
        name="project"
        value={filters.project}
        onChange={handleChange}
        placeholder="📍 Project Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#00224F] outline-none transition"
      />

      <div className="flex gap-4 md:col-span-3 justify-end mt-2">
        <button
          type="submit"
          className="bg-[#00224F] hover:bg-[#001A3A] text-white px-6 py-2 rounded-lg text-sm font-medium transition shadow-md cursor-pointer"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-100 hover:bg-gray-200 text-[#00224F] border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium transition shadow cursor-pointer"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

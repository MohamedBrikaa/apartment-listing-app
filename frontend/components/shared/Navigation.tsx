'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold text-[#00224F] tracking-tight hover:opacity-90 transition">
            Aptly
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/apartments"
              className="text-[#4A4A4A] hover:text-[#00224F] font-medium transition"
            >
              Apartments
            </Link>
            <Link
              href="/about"
              className="text-[#4A4A4A] hover:text-[#00224F] font-medium transition"
            >
              About
            </Link>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/apartments/create"
            className="bg-[#00224F] hover:bg-[#001A3A] text-white px-5 py-2 rounded-lg text-sm font-medium transition"
          >
            + Add Apartment
          </Link>
        </div>
      </div>
    </nav>
  );
}

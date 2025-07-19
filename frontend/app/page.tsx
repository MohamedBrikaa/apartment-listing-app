'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

export default function Home() {
  return (
    <div className="bg-white">
      <section className="bg-[#F9FAFB] py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00224F] mb-4">
            Welcome to Aptly
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Manage, list, and explore premium apartments effortlessly. Built as part of an interview showcase.
          </p>
          <Link
            href="/apartments"
            className="inline-block bg-[#00224F] hover:bg-[#001A3A] text-white px-6 py-3 rounded-lg text-sm font-medium transition"
          >
            View Apartments
          </Link>
        </div>
      </section>

      {/* Slider Section */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            {
              img: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
              title: 'Palm Hills Apartment',
              desc: 'Modern spaces in a quiet community.',
            },
            {
              img: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
              title: 'City View Residence',
              desc: 'Stunning skyline views in a prime location.',
            },
            {
              img: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
              title: 'Lakeside Villa',
              desc: 'Peaceful retreat with natural surroundings.',
            },
            {
              img: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
              title: 'City View Residence',
              desc: 'Stunning skyline views in a prime location.',
            },
          ].map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="relative w-full h-60">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx === 0}
                  />
                </div>
                <div className="p-4 text-left">
                  <h3 className="text-xl font-semibold text-[#00224F]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
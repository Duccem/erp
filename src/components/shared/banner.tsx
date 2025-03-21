'use client';
import banner1 from '@/assets/images/auth-banner-1.jpeg';
import banner2 from '@/assets/images/auth-banner-2.jpeg';
import banner3 from '@/assets/images/auth-banner-3.jpeg';
import { useEffect, useState } from 'react';
const Banner = () => {
  const [banner, setBanner] = useState(0);
  useEffect(() => {
    setBanner(Math.floor(Math.random() * 3) + 1);
  }, []);
  return (
    <>
      <img
        src={banner1.src}
        alt="banner"
        className={`h-full object-cover w-full ${banner === 1 ? '' : 'hidden'}`}
      ></img>
      <img
        src={banner2.src}
        alt="banner"
        className={`h-full object-cover w-full ${banner === 2 ? '' : 'hidden'}`}
      ></img>
      <img
        src={banner3.src}
        alt="banner"
        className={`h-full object-cover w-full ${banner === 3 ? '' : 'hidden'}`}
      ></img>
    </>
  );
};

export default Banner;

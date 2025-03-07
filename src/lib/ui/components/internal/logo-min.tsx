'use client';

import logoDark from '@/assets/images/lumen-dark.png';
import logoLight from '@/assets/images/lumen-light.png';

const LogoMin = () => {
  return (
    <>
      <img src={logoDark.src} alt="logo" className="h-10 rounded-lg dark:hidden object-cover" />
      <img src={logoLight.src} alt="logo" className="h-10 rounded-lg hidden dark:block object-cover" />
    </>
  );
};

export default LogoMin;

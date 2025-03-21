'use client';

import logoDark from '@/assets/images/lumen-dark-complete.png';
import logoLight from '@/assets/images/lumen-light-complete.png';

const Logo = () => {
  return (
    <>
      <img src={logoDark.src} alt="logo" className="h-14 rounded-lg dark:hidden" />
      <img src={logoLight.src} alt="logo" className="h-14 rounded-lg hidden dark:block" />
    </>
  );
};

export default Logo;

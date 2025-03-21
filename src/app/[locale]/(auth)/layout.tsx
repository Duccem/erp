import React, { ReactNode } from 'react';

import Banner from '@/components/shared/banner';
import Logo from '@/components/shared/logo';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 box-border h-full w-full lg:grid-cols-2">
      <div className="flex flex-col h-full justify-center items-center">
        <div className="flex justify-center gap-2 mt-2 items-center">
          <Logo />
        </div>
        <div className="w-full">{children}</div>
      </div>
      <div className="overflow-hidden hidden flex-row box-border w-full lg:flex">
        <div className="hidden bg-sidebar w-full h-full justify-center items-center lg:flex">
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default Layout;

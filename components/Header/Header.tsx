import { ChevronDown, Menu } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import logo from '@/public/SUA-LOGO.svg';

const Header = () => {
  return (
    <header className='flex items-center justify-between px-2 sm:px-8 py-4 relative bg-[#19202D]'>
      <div className='flex space-x-2'>
        <Menu color='white' className='cursor-pointer' />
        <Image
          src={logo}
          alt='logo'
          width={126}
          height={21}
          className='cursor-pointer'
        />
      </div>
      <div className='flex space-x-1 sm:space-x-5 items-center '>
        <div className='bg-[#333d4e] w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg cursor-pointer'>
          F
        </div>
        <p className='text-white text-xs cursor-default	'>Fábio C Pinto</p>
        <ChevronDown color='#ffffff' className='cursor-pointer' />
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import AsakaLogo from '../../../assets/images/asakalogo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

const getNavLinkClass = ({ isActive }) =>
  `block relative md:inline-block px-4 py-2 md:p-0 animation ${isActive ? 'text-red-500' : ''}`;

  return (
    <div>
      <div className='container mx-auto p-4'>
        <div className='flex items-center justify-between p-2'>
          <div>
            <Link className='inline-block' to={'/'}>
              <img className='logo' src={AsakaLogo} alt="logo" width={228} height={28} />
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <ul className={`flex-col md:flex-row md:flex items-center space-x-0 md:space-x-[28px] text-[16px] font-medium absolute md:static bg-white w-full md:w-auto transition-all duration-300 ease-in-out ${isOpen ? 'top-16 left-0 opacity-100' : 'top-[-490px] left-0 opacity-0 md:opacity-100'}`}>
          <NavLink className={getNavLinkClass} to="/vacancies" onClick={() => setIsOpen(false)}>
            Vakansiyalar
          </NavLink>
          <NavLink className={getNavLinkClass} to="/digital" onClick={() => setIsOpen(false)}>
            IT va Digital
          </NavLink>
          <NavLink className={getNavLinkClass} to="/career" onClick={() => setIsOpen(false)}>
            Karyera
          </NavLink>
          <NavLink className={getNavLinkClass} to="/blogs" onClick={() => setIsOpen(false)}>
            Blog
          </NavLink>
          <NavLink className={getNavLinkClass} to="/about" onClick={() => setIsOpen(false)}>
            Bank haqida
          </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

import React, { useState } from 'react';
import AsakaLogo from '../../../assets/images/asakalogo.png';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Navbar = ({ onLanguageChange }) => {
  const { t, i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="navbar-fix md:p-2 p-1 shadow-navbar fixed top-0 w-full z-50">
      <div className="container mx-auto p-4 relative ">
        <div className="flex items-center justify-between p-2">
          <div className="relative z-20">
            <Link className="" to={'/'}>
              <img
                className="w-[180px] md:w-[228px]"
                src={AsakaLogo}
                alt={t('logoAlt')}
              />
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-4 absolute right-0 top-1 p-2 z-30 ">
            <div className="flex space-x-2">
              <button
                onClick={() => handleLanguageChange('ru')}
                className="text-gray-800 focus:outline-none"
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange('uz')}
                className="text-gray-800 focus:outline-none"
              >
                UZ
              </button>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="flex space-x-10">
            <ul
              className={`flex-col white rounded-[25px] md:flex-row md:flex items-center space-x-0 md:space-x-[28px] text-[16px] font-medium absolute md:static md:w-auto transition-all duration-300 ease-in-out z-10 ${
                isOpen
                  ? 'top-11 bg-white right-0 h-auto mb-3  opacity-100'
                  : 'top-[-490px] right-0 opacity-0 md:opacity-100'
              }`}
            >
              <NavLink
                className={({ isActive }) =>
                  `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                    isActive ? 'text-red-500' : ''
                  }`
                }
                to="/vacancies"
                onClick={() => setIsOpen(false)}
              >
                {t('vacancies')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                    isActive ? 'text-red-500' : ''
                  }`
                }
                to="/digital"
                onClick={() => setIsOpen(false)}
              >
                {t('it-vacancies')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                    isActive ? 'text-red-500' : ''
                  }`
                }
                to="/career"
                onClick={() => setIsOpen(false)}
              >
                {t('career')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                    isActive ? 'text-red-500' : ''
                  }`
                }
                to="/blogs"
                onClick={() => setIsOpen(false)}
              >
                {t('blogs')}
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `block relative md:inline-block px-4 py-2 md:p-0 animation ${
                    isActive ? 'text-red-500' : ''
                  }`
                }
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                {t('about')}
              </NavLink>
            </ul>

            <div className="hidden md:flex space-x-2 z-30">
              <button
                onClick={() => handleLanguageChange('ru')}
                className="text-gray-800 focus:outline-none"
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange('uz')}
                className="text-gray-800 focus:outline-none"
              >
                UZ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

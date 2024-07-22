import React, { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [directionCategory, setDirectionCategory] = useState('Barchasi');
  const [branchCategory, setBranchCategory] = useState('Barchasi');
  const [jobTypeCategory, setJobTypeCategory] = useState('Barchasi');
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);

  const directionCategories = [
    'Barchasi',
    'IT va Digital',
    'Savdo va mijozlarga xizmat ko\'rsatish',
    'Karyera boshlash',
    'Yuridik mijozlarga xizmat ko\'rsatish',
    'Yuridik xizmat',
    'Buxgalteriya hisobi',
    'Gaznachilik',
    'HR - Hodimlarni boshqarish',
    'Marketing',
    'Ijro aparati',
  ];

  const branchCategories = [
    'Barchasi',
    'Shayhontohur filiali',
    'Poytaxt filiali',
    'Buxoro filiali',
    '"Asaka Bank" AJ Bosh ofisi',
    'Yunusobod filiali',
    'Samarqand filiali',
    'Jizzax filiali',
    'Guliston filiali',
    'Nurafshon filiali',
    'Avtotransport filiali',
    'Navoiy filiali',
    'Zarafshon filiali',
    'Urganch filiali',
    'Nukus filiali',
    'Fargona filiali',
    'Qoqon filiali',
    'Andijon filiali',
    'Bobur filiali',
    'Qarshi filiali',
    'Termiz filiali',
  ];

  const jobTypeCategories = [
    'Barchasi',
    'To\'liq stavka',
    'Yarim stavka',
    'Shartnoma asosida',
    'Vaqtinchalik',
    'Stajirovka'
  ];

  const handleCategoryChange = (setter, category, setIsOpen) => {
    setter(category);
    setIsOpen(false);
    onFilterChange({
      directionCategory,
      branchCategory,
      jobTypeCategory,
      [setter.name]: category
    });
  };

  const handleClearFilters = () => {
    setDirectionCategory('Barchasi');
    setBranchCategory('Barchasi');
    setJobTypeCategory('Barchasi');
    onFilterChange({
      directionCategory: 'Barchasi',
      branchCategory: 'Barchasi',
      jobTypeCategory: 'Barchasi'
    });
  };

  return (
    <div className="relative bg-white border border-gray-300 rounded-[20px] p-4 w-full md:w-[400px] mb-4 md:mb-0">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Filtr</span>
        <button 
          onClick={handleClearFilters}
          className="text-red-500 hover:underline focus:outline-none"
          aria-label="Filtrni tozalash"
        >
          Filtrni tozalash
        </button>
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        Yo'nalish
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsDirectionOpen(!isDirectionOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {directionCategory}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDirectionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {isDirectionOpen && (
          <div className={`absolute p-2 z-10 font-[500] mt-2 w-full max-h-60 border border-gray-300 rounded-lg bg-white shadow-lg overflow-y-auto ${directionCategories.length > 5 ? 'overflow-y-scroll' : ''}`}>
            {directionCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(setDirectionCategory, category, setIsDirectionOpen)}
                className="block w-full text-left p-3 hover:text-red-500 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        Filial
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsBranchOpen(!isBranchOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {branchCategory}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isBranchOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {isBranchOpen && (
          <div className={`absolute font-[500] p-2 z-10 mt-2 w-full max-h-60 border border-gray-300 rounded-lg bg-white shadow-lg overflow-y-auto ${branchCategories.length > 5 ? 'overflow-y-scroll' : ''}`}>
            {branchCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(setBranchCategory, category, setIsBranchOpen)}
                className="block w-full text-left p-2 hover:text-red-500 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        Ish turi
      </label>
      <div className="relative mb-4">
        <button
          onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {jobTypeCategory}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isJobTypeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        {isJobTypeOpen && (
          <div className={`absolute hover:rounded-lg p-2 z-10 font-[500] mt-2 w-full max-h-60 border bg-white border-gray-300 rounded-lg shadow-lg overflow-y-auto ${jobTypeCategories.length > 5 ? 'overflow-y-scroll' : ''}`}>
            {jobTypeCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(setJobTypeCategory, category, setIsJobTypeOpen)}
                className="block w-full text-left p-2.5 hover:text-red-500 hover:bg-[#F9F9F9]"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          className="w-full bg-red-500 text-white rounded-lg p-3 focus:outline-none"
        >
          Filtrlash
        </button>
      </div>
    </div>
  );
};

export default Filter;

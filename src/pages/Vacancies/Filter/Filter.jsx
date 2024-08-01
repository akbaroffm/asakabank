import React, { useState, useEffect } from 'react';
import axios from 'axios';

const jobTypes = [
  'Barchasi',
  'Toliq stavka',
  'Yarim stavka',
  'Shartnoma asosida',
  'Vaqtinchalik',
  'Stajirovka',
];

const Filter = ({ onFilterChange }) => {
  const [directionCategory, setDirectionCategory] = useState({
    id: '',
    name: 'Barchasi',
  });
  const [branchCategory, setBranchCategory] = useState({
    id: '',
    name: 'Barchasi',
  });
  const [jobTypeCategory, setJobTypeCategory] = useState('Barchasi');
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [directionCategories, setDirectionCategories] = useState([]);
  const [branchCategories, setBranchCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directionResponse, branchResponse] = await Promise.all([
          axios.get('https://career-api.asakabank.uz/categories/'),
          axios.get('https://career-api.asakabank.uz/branches/'),
        ]);
        const directions = directionResponse.data.results || [];
        const branches = branchResponse.data.results || [];
        setDirectionCategories([
          { id: '', name: 'Barchasi' },
          ...directions.map((d) => ({ id: d.id, name: d.name })),
        ]);
        setBranchCategories([
          { id: '', name: 'Barchasi' },
          ...branches.map((b) => ({
            id: b.id,
            name: b.city_name || b.address,
          })),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (setter, category, setIsOpen) => {
    setter(category);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setDirectionCategory({ id: '', name: 'Barchasi' });
    setBranchCategory({ id: '', name: 'Barchasi' });
    setJobTypeCategory('Barchasi');
    onFilterChange({
      directionCategory: { id: '', name: 'Barchasi' },
      branchCategory: { id: '', name: 'Barchasi' },
      jobTypeCategory: 'Barchasi',
    }); // Clear filters
  };

  const handleFilter = () => {
    onFilterChange({ directionCategory, branchCategory, jobTypeCategory });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative bg-white border border-gray-300 rounded-[20px] p-4 w-full md:w-[400px] mb-4 md:mb-0">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Filtr</span>
        <button
          onClick={handleClearFilters}
          className="text-red-500 font-[500] hover:underline focus:outline-none"
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
          {directionCategory.name}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isDirectionOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isDirectionOpen && (
          <div
            className={`absolute p-2 z-10 font-[500] mt-2 w-full max-h-60 border border-gray-300 rounded-lg bg-white shadow-lg overflow-y-auto ${
              directionCategories.length > 5 ? 'overflow-y-scroll' : ''
            }`}
          >
            {directionCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  handleCategoryChange(
                    setDirectionCategory,
                    category,
                    setIsDirectionOpen
                  )
                }
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {category.name}
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
          {branchCategory.name}
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isBranchOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isBranchOpen && (
          <div
            className={`absolute p-2 z-10 font-[500] mt-2 w-full max-h-60 border border-gray-300 rounded-lg bg-white shadow-lg overflow-y-auto ${
              branchCategories.length > 5 ? 'overflow-y-scroll' : ''
            }`}
          >
            {branchCategories.map((category) => (
              <button
                key={category.id}
                onClick={() =>
                  handleCategoryChange(
                    setBranchCategory,
                    category,
                    setIsBranchOpen
                  )
                }
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {category.name}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isJobTypeOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
        {isJobTypeOpen && (
          <div
            className={`absolute p-2 z-10 font-[500] mt-2 w-full max-h-60 border border-gray-300 rounded-lg bg-white shadow-lg overflow-y-auto ${
              jobTypes.length > 5 ? 'overflow-y-scroll' : ''
            }`}
          >
            {jobTypes.map((jobType) => (
              <button
                key={jobType}
                onClick={() =>
                  handleCategoryChange(
                    setJobTypeCategory,
                    jobType,
                    setIsJobTypeOpen
                  )
                }
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                {jobType}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleFilter}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-[500] py-3 px-4 rounded-lg focus:outline-none"
      >
        Filtr
      </button>
    </div>
  );
};

export default Filter;

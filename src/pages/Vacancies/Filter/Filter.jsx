import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../services/api';

const Filter = ({ onFilter, filter, setFilter, defaultFilter }) => {
  const { t, i18n } = useTranslation('filtered');
  const { language } = i18n;

  const jobTypes = [
    { value: '', label: t('all') },
    { value: 'full_time', label: t('full_time') },
    { value: 'part_time', label: t('part_time') },
    { value: 'contract', label: t('contract') },
    { value: 'temporary', label: t('temporary') },
    { value: 'internship', label: t('internship') },
  ];

  const { job_type, direction, branch } = filter || {};
  const [isDirectionOpen, setIsDirectionOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(false);
  const [directions, setDirections] = useState([]);
  const [branches, setBranches] = useState([]);

  const directionRef = useRef(null);
  const branchRef = useRef(null);
  const jobTypeRef = useRef(null);

  const resetFilter = () => {
    onFilter(defaultFilter);
  };

  const closeAllDropdowns = () => {
    setIsDirectionOpen(false);
    setIsBranchOpen(false);
    setIsJobTypeOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directionResponse, branchResponse] = await Promise.all([
          api({ url: '/categories/' }),
          api({ url: '/branches/' }),
        ]);
        const directions = directionResponse.data.results || [];
        const branches = branchResponse.data.results || [];
        setDirections([
          { value: '', label: t('all') },
          ...directions.map((d) => ({ value: d.id, label: d.name })),
        ]);
        setBranches([
          { value: '', label: t('all') },
          ...branches.map((b) => ({
            value: b.id,
            label: b.city_name || b.address,
          })),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        directionRef.current &&
        !directionRef.current.contains(event.target) &&
        branchRef.current &&
        !branchRef.current.contains(event.target) &&
        jobTypeRef.current &&
        !jobTypeRef.current.contains(event.target)
      ) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-white border border-gray-300 rounded-[20px] p-4 w-full md:w-[400px] mb-4 md:mb-0">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">{t('filter')}</span>
        <button
          onClick={resetFilter}
          className="text-red-500 font-[500] hover:underline focus:outline-none"
          aria-label={t('clearFilters')}
        >
          {t('clearFilters')}
        </button>
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('direction')}
      </label>
      <div className="relative mb-4" ref={directionRef}>
        <button
          onClick={() => setIsDirectionOpen(!isDirectionOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {direction?.label}
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
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {directions.map((direction) => (
              <div
                key={direction?.value}
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
                onClick={() => {
                  setFilter({ ...filter, direction });
                  setIsDirectionOpen(false);
                }}
              >
                {direction?.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('branch')}
      </label>
      <div className="relative mb-4" ref={branchRef}>
        <button
          onClick={() => setIsBranchOpen(!isBranchOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {branch?.label}
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
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {branches.map((branch) => (
              <div
                key={branch?.value}
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
                onClick={() => {
                  setFilter({ ...filter, branch });
                  setIsBranchOpen(false);
                }}
              >
                {branch?.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="block text-gray-400 text-sm mb-2 font-semibold ml-5">
        {t('jobType')}
      </label>
      <div className="relative mb-4" ref={jobTypeRef}>
        <button
          onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
          className="w-full border border-gray-300 rounded-lg p-3 text-left bg-[#F9F9F9] text-gray-900 focus:outline-none focus:border-red-500 font-[500]"
        >
          {job_type?.label}
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
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {jobTypes.map((job_type) => (
              <div
                key={job_type?.value}
                className="p-3 hover:bg-gray-100 cursor-pointer font-[500]"
                onClick={() => {
                  setFilter({ ...filter, job_type });
                  setIsJobTypeOpen(false);
                }}
              >
                {job_type?.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onFilter(filter)}
        className="w-full bg-red-500 text-white py-3 px-4 rounded-lg  mt-4 font-[500] hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      >
        {t('apply')}
      </button>
    </div>
  );
};

export default Filter;

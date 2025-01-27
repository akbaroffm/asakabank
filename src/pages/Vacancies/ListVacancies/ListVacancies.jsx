import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from 'react-i18next';
import './ListVacancies.css';

const ListVacancies = ({
  onSearch,
  loading,
  filter,
  setFilter,
  vacancies,
  onFilter,
}) => {
  const { t } = useTranslation('listvacancies');
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const truncateDescription = (description, wordLimit = 24) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  const handleVacancyClick = (slug) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/vacancies/${slug}`);
  };

  return (
    <div className="max-w-[800px] mx-auto bg-transparent md:bg-white md:border md:border-gray-300 rounded-[20px] md:p-4 ">
      <div className="flex flex-col sm:flex-row md:space-x-3 mb-4">
        <div className="relative w-full mb-3 sm:mb-0">
          <input
            type="text"
            placeholder={t('search-placeholder')}
            className="w-full p-3 border md:border-gray-300 rounded-[12px] bg-gray-100 outline-none pl-10"
            value={filter?.search}
            onChange={(e) =>
              setFilter({
                ...filter,
                search: e.target.value,
              })
            }
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={() => onFilter(filter)}
          className="mt-3 sm:mt-0 px-4 py-2 rounded-[12px] bg-red-500 text-white text-center font-medium hover:bg-red-600 transition"
        >
          {t('search-button')}
        </button>
      </div>

      {loading ? (
        <div className="text-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <div className="space-y-4">
          {vacancies.length > 0 ? (
            vacancies.map((result) => (
              <div
                key={result.id}
                className="p-4 border border-gray-300 rounded-[20px] hover:border-red-500 transition cursor-pointer"
                onClick={() => handleVacancyClick(result.slug)}
              >
                <h2 className="font-medium text-lg">{result.title}</h2>
                <div className="flex flex-wrap space-x-2 text-[15px] text-customGray my-1 leading-[150%]">
                  <span>{result.job_type}</span> <b>●</b>
                  <span>{result.branch.city_name}</span> <b>●</b>
                  <span>{formatDate(result.created_date)}</span>
                </div>
                <p className="text-[#444] text-[17px] font-[500] my-5 leading-[150%] truncate-card">
                  {truncateDescription(result.description)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4">{t('no-results')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListVacancies;

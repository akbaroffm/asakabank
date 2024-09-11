import React, { useState, useEffect, useRef } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import './Digital.css';
import { useTranslation } from 'react-i18next';

function Digital() {
  const [vacancies, setVacancies] = useState([]);
  const vacanciesRef = useRef(null);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation('common');
  const { language } = i18n;

  useEffect(() => {
    const fetchVacanciesData = async () => {
      try {
        const response = await api({ url: '/vacancies/' });
        const results = response?.data?.results;
        const filteredVacancies = Array.isArray(results)
          ? results.filter((vacancy) => vacancy.category?.id === 1)
          : [];
        setVacancies(filteredVacancies);
      } catch {
        console.error('Error fetching vacancies data');
      }
    };
    fetchVacanciesData();
  }, [language, t]);

  const handleVacancyClick = (slug) => {
    navigate(`/vacancies/${slug}`);
  };

  const handleScrollToVacancies = () => {
    vacanciesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const truncateDescription = (description, wordLimit = 24) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="it-bg">
          <div className="content flex flex-col items-center md:items-start justify-center md:max-w-[470px] md:h-[550px] text-center md:text-start">
            <h2 className="text-[24px] md:text-[36px] font-[700] leading-[133%] md:mt-[-180px] ">
              {t('itvacancies-title')}
            </h2>
            <p className="text-[16px]  md:text-[20px] font-[500] leading-[150%] my-[24px]">
              {t('itvacancies-discription')}
            </p>
            <button
              onClick={handleScrollToVacancies}
              className="rounded-[12px] text-[17px] font-[500] h-[52px] px-[40px] bg-red-500 text-white"
            >
              {t('itvacancies-btn')}
            </button>
          </div>
        </div>
        <div
          ref={vacanciesRef}
          className="flex flex-col items-center justify-center px-4"
        >
          <h3 className="text-[36px] font-[700] mt-[80px] mb-[60px] text-center">
            {t('itvacancies-btn')}
          </h3>
          <div className="flex flex-wrap mb-[80px] max-w-[800px] gap-5">
            {vacancies.length > 0 ? (
              vacancies.map((result) => (
                <div
                  key={result.id}
                  className="p-4 border border-gray-300 rounded-[20px] hover:border-red-500 transition cursor-pointer"
                  onClick={() => handleVacancyClick(result.slug)}
                >
                  <h2 className="font-medium text-lg">{result.title}</h2>
                  <div className="flex flex-wrap space-x-2 text-[15px] text-customGray my-1 leading-[150%]">
                    <span>{result.job_type}</span>
                    <span>{result.branch.city_name}</span>
                    <span>
                      {new Date(result.created_date).toLocaleDateString()}
                    </span>
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
              <div className="text-center p-4">Vakansiyalar mavjud emas</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Digital;

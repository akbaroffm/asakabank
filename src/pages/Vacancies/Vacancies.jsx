import React, { useState, useEffect, useCallback } from 'react';
import HeroImg from '../../assets/images/heroImg.png';
import Filter from './Filter/Filter';
import ListVacancies from './ListVacancies/ListVacancies';
import { Pagination } from '@mui/material';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

function Vacancies() {
  const { t, i18n } = useTranslation('vacancies');
  const { language } = i18n;

  const defaultFilter = {
    job_type: {
      value: '',
      label: t('all'),
    },
    direction: {
      value: '',
      label: t('all'),
    },
    branch: {
      value: '',
      label: t('all'),
    },
    search: '',
    page: 1,
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [vacancies, setVacancies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getVacancies = async (filter) => {
    setLoading(true);
    try {
      const { branch, direction, job_type, search, page } = filter;
      const url = `/vacancies/?page=${page}${
        search ? '&search=' + search : ''
      }${branch?.value ? '&branch=' + branch?.value : ''}${
        direction?.value ? '&category=' + direction?.value : ''
      }${job_type?.value ? '&job_type=' + job_type?.value : ''}`;
      const response = await api({ url });
      setVacancies(response.data.results || []);
      setTotalPages(response.data.total_pages || 1);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFilter = (newFilter) => {
    setFilter(newFilter);
    getVacancies(newFilter);
  };

  const handlePageChange = (event, newPage) => {
    const newFilter = { ...filter, page: newPage };
    getVacancies(newFilter);
    setFilter(newFilter);
  };

  useEffect(() => {
    setFilter(defaultFilter);
    getVacancies(defaultFilter);
  }, [language]);

  return (
    <div className="bg-[#f8f8f8]">
      <div
        className="heroBg px-3"
        style={{
          background: `url(${HeroImg}) center center / cover no-repeat rgb(230, 230, 230)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="md:pb-[80px] md:pt-[112px] text-left md:text-left pt-[60px] pb-[40px] max-w-[565px]">
            <h2 className="text-2xl md:text-4xl leading-snug font-semibold mb-6">
              {t('main-title')}
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium mx-auto md:mx-0">
              {t('main-description')}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-6 pt-12 pb-12 px-4">
          <div className="mb-8 md:mb-0 md:w-3/7">
            <Filter
              filter={filter}
              onFilter={onFilter}
              setFilter={setFilter}
              defaultFilter={defaultFilter}
            />
          </div>
          <div className="md:w-2/3">
            <ListVacancies
              filter={filter}
              loading={loading}
              vacancies={vacancies}
              setFilter={setFilter}
              onFilter={onFilter}
            />
            <div className="flex justify-center mt-4">
              <Pagination
                count={totalPages}
                page={filter.page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacancies;

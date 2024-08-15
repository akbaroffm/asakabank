import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';
import './Vacancies.css';

import { EffectCoverflow, Autoplay, Mousewheel } from 'swiper/modules';

function VacanciesSection() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacanciesData = async () => {
      try {
        const response = await api({ url: '/vacancies/' });
        const results = response?.data?.results;
        const vacancies = Array.isArray(results) ? results : [];
        setVacancies(vacancies);
      } catch {
        console.error('Error fetching vacancies data');
      }
    };
    fetchVacanciesData();
  }, []);

  return (
    <div className="bg-[#333232] py-[80px] mb-[60px]">
      <div className="container mx-auto">
        <div className="max-w-[750px] mx-auto">
          <h2 className="text-center text-[32px] text-white font-[700]">
            Vakansiyalar
          </h2>
          <p className="text-[#888888] font-[500] text-[18px] leading-[160%] mt-[16px] mb-[48px] text-center">
            Asakabankdagi bo'sh ish o'rinlari
          </p>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 4,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 24 },
            414: { slidesPerView: 1, spaceBetween: 24 },
            576: { slidesPerView: 2, spaceBetween: 24 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            991: { slidesPerView: 3, spaceBetween: 24 },
            1200: { slidesPerView: 3, spaceBetween: 24 },
            1440: { slidesPerView: 3, spaceBetween: 24 },
          }}
          loop={true}
          speed={600}
          modules={[Mousewheel, Autoplay, EffectCoverflow]}
          mousewheel={{ forceToAxis: true }}
          className="flex gap-4 swiper-3d "
        >
          {vacancies.length > 0 &&
            vacancies.map((vacancy) => (
              <SwiperSlide
                key={vacancy?.id}
                className="flex items-center justify-center"
              >
                <div className="flex items-center flex-col rounded-[20px] py-[40px] px-[20px] bg-vacancy w-[380px] justify-between h-[400px] text-center mx-auto m-0">
                  <div>
                    <strong className="bg-white text-black font-[500] text-[15px] rounded-[16px] px-[24px] justify-center py-[5px]">
                      {vacancy?.branch?.city_name}
                    </strong>
                    <h3 className="text-[20px] text-white font-[700] my-[14px] leading-[150%] ">
                      {vacancy?.title}
                    </h3>
                    <p className="text-[18px] font-[500] leading-[150%] text-[#ffffff99]">
                      {vacancy?.category?.name}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default VacanciesSection;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import api from '../../services/api';
import Others from '../../assets/images/other-directions.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

function DirectionSection() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await api({ url: '/categories/' });
        const results = response?.data?.results;
        const categories = Array.isArray(results) ? results : [];
        setCategories(categories);
        console.log(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleCategoryClick = (category) => {
    if (category.is_recommended) {
      navigate(`/vacancies?category=${category.id}`);
    }
  };

  return (
    <div className="mb-[80px] px-4">
      <div className="max-w-[750px] mx-auto">
        <h3 className="font-[700] md:text-[36px] text-[24px] text-center">
          Biz o'zimiz va jamoada rivojlanamiz
        </h3>
        <p className="mt-[16px] mb-[48px] md:text-[18px] text-[16px] font-[500] text-center leading-[160%]">
          Biz yuqori natijalarga erishish uchun qulay muhit, shaxsiy rivojlanish
          imkoniyatlari va kuchli jamoa kerakligini tushunamiz. Yo'nalishni
          o'zing tanla
        </p>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="flex flex-wrap gap-4 mt-4"
      >
        {categories.slice(0, 3).map((category) => (
          <SwiperSlide
            key={category?.id}
            onClick={() => handleCategoryClick(category)}
            className="cursor-pointer flex flex-col items-center space-y-10 pt-[15px] px-[10px] w-[380px] direction-slider h-[450px] rounded-[20px] bg-[#efefef]"
          >
            <h4 className="text-[18px] font-[500] leading-[160%] text-center">
              {category?.name}
            </h4>
            <img
              src={category?.icon?.url}
              alt={category?.name}
              className="w-[305px] h-[346px] mb-2 mx-auto"
            />
          </SwiperSlide>
        ))}
        <SwiperSlide className=" flex flex-col items-center space-y-10 pt-[15px] px-[10px] w-[380px] h-[450px] direction-slider rounded-[20px] bg-[#efefef]">
          <h4 className="text-[18px] font-[500] leading-[160%] text-center">
            Va boshqa yo'nalishlar
          </h4>
          <img
            src={Others}
            alt="Static card"
            className="w-[305px] h-[346px] mb-2 mx-auto"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default DirectionSection;

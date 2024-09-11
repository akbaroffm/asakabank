import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import LightLogo from '../../assets/images/logo-light.png';
import { useTranslation } from 'react-i18next';

function FeedbackSection() {
  const [feedback, setFeedback] = useState([]);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState(null);
  const { t, i18n } = useTranslation('common');
  const { language } = i18n;

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await api({ url: '/feedback-list/' });
        const results = response?.data?.results;
        const feedbackData = Array.isArray(results) ? results : [];
        setFeedback(feedbackData);
      } catch (error) {
        console.error('Error fetching feedback data', error);
      }
    };

    fetchFeedbackData();
  }, [language, t]);

  const truncateText = (text, wordCount) => {
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };

  const handleReadMore = (id) => {
    setExpandedFeedbackId(id);
  };

  const handleClose = () => {
    setExpandedFeedbackId(null);
  };

  return (
    <div className="py-10 bg-[#F8F8F8] px-4">
      <h3 className="font-[700] md:text-[36px] text-[24px] max-w-[600px] mx-auto text-center">
        {t('feedback-title')}
      </h3>
      <div className="pt-[40px]">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
        >
          {feedback.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex flex-col p-[18px] cursor-pointer bg-white border border-gray-200 rounded-[20px] mb-6"
            >
              <div className="flex flex-col pt-[24px] pb-[12px] relative ">
                <div className="absolute right-0 top-[-10px]">
                  <svg fill="none" height="56" viewBox="0 0 56 56" width="56">
                    <path
                      d="M26.1147 36.7663C26.1147 34.713 25.578 32.991 24.5047 31.5933C23.744 30.632 22.7127 29.9996 21.4083 29.6986C20.125 29.4 18.9117 29.379 17.815 29.6333C17.4417 27.4166 18.0483 25.0693 19.5883 22.582C21.1283 20.097 23.1233 18.2256 25.557 16.975L21.868 11.6666C20.0013 12.5906 18.228 13.762 16.5947 15.1783C14.938 16.5946 13.468 18.2233 12.1613 20.0643C10.8547 21.9053 9.87465 23.9843 9.24465 26.341C8.61465 28.6976 8.43965 31.101 8.74065 33.5743C9.13265 36.841 10.1873 39.4543 11.9047 41.391C13.6197 43.3533 15.7593 44.3333 18.3167 44.3333C20.5683 44.3333 22.4373 43.6566 23.9167 42.2846C25.382 40.9406 26.11 39.0996 26.11 36.7593L26.1147 36.7663ZM47.404 36.7663C47.404 34.713 46.8673 32.991 45.794 31.5933C45.0333 30.6133 43.9973 29.9786 42.6977 29.687C41.391 29.3976 40.194 29.3836 39.1043 29.6356C38.731 27.4423 39.3143 25.0856 40.859 22.589C42.399 20.1156 44.3893 18.249 46.823 16.989L43.1433 11.6666C41.2767 12.5906 39.515 13.762 37.87 15.1783C36.1982 16.6156 34.7135 18.2571 33.4507 20.0643C32.1533 21.9076 31.1873 23.9843 30.5573 26.341C29.9199 28.6962 29.7479 31.1532 30.051 33.5743C30.4383 36.841 31.4883 39.4543 33.201 41.391C34.9113 43.337 37.044 44.3123 39.6013 44.3123C41.8577 44.3123 43.7267 43.6356 45.206 42.266C46.669 40.922 47.404 39.081 47.404 36.7406V36.7663Z"
                      fill="#E11E32"
                    ></path>
                  </svg>
                </div>
                <img
                  src={item.image.url}
                  alt={item.image.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 mx-auto"
                />
                <h4 className="text-[18px] text-center font-[700] pt-[12px]">
                  {item.first_name} {item.last_name}
                </h4>
                <p className="text-center mt-[4px] text-[16px] font-[500]">
                  {item.position}
                </p>
              </div>
              <div className="border border-[#EDEDED] mb-2"></div>
              <div
                style={{
                  backgroundImage: `url(${LightLogo})`,
                  backgroundPosition: 'right top',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '50%',
                  margin: '16px 0px 0px',
                  position: 'relative',
                }}
              >
                <p className="text-[#828282] text-[16px] font-[500] leading-[28px] transition-[200ms]">
                  {expandedFeedbackId === item.id
                    ? item.letter
                    : truncateText(item.letter, 28)}
                </p>
              </div>

              <div className="mt-2 flex justify-end">
                {expandedFeedbackId === item.id ? (
                  <button
                    onClick={handleClose}
                    className="text-red-500 font-[500] hover:underline"
                  >
                    {t('close')}
                  </button>
                ) : (
                  <button
                    onClick={() => handleReadMore(item.id)}
                    className="text-red-500 font-[500] hover:underline"
                  >
                    {t('open')}
                  </button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default FeedbackSection;

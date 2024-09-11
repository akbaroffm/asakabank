import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import './About.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { CountUp } from 'countup.js';
import about_1 from '../../assets/images/about-1.png';
import about_2 from '../../assets/images/about-2.png';
import about_3 from '../../assets/images/about-3.png';
import about_4 from '../../assets/images/about-4.png';
import about_5 from '../../assets/images/about-5.png';
import Award from '../../assets/images/design.png';
import MDH from '../../assets/images/mdh.png';
import Invt from '../../assets/images/invistit.png';
import Top from '../../assets/images/top.png';
import Year from '../../assets/images/year.png';
import Borrower from '../../assets/images/borrower.png';
import { useTranslation } from 'react-i18next';

function AboutBank() {
  const countRefs = useRef([]);

  const { t, i18n } = useTranslation('common');
  const { language } = i18n;

  useEffect(() => {
    const countUps = countRefs.current.map((ref, index) => {
      const targetValue = [2000, 1500, 1100][index];
      return new CountUp(ref, targetValue, {
        startVal: 0,
        duration: 2,
        separator: ',',
      });
    });

    const handleScroll = () => {
      countRefs.current.forEach((ref, index) => {
        const rect = ref.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          countUps[index].start();
          window.removeEventListener('scroll', handleScroll);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [language, t]);
  return (
    <div className="px-4 ">
      <div className="container mx-auto">
        <div className="about-bg">
          <div className="content flex flex-col items-center md:items-start justify-center md:max-w-[470px] md:h-[550px] text-center md:text-start px-4">
            <h2 className="text-[24px] md:text-[36px] font-[700] leading-[133%] md:mt-[-100px]">
              {t('about-title')}
            </h2>
            <p className="text-[16px] md:text-[20px] font-[500] leading-[150%] my-[24px]">
              {t('about-discription')}
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start py-[60px] md:py-[60px]">
          <div className="w-full lg:w-1/2 mb-6 md:mb-0 left slide-image about-img">
            <Swiper
              className="rounded-[20px] max-h-[400px]"
              spaceBetween={10}
              slidesPerView={1}
              loop
              navigation
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              modules={[Autoplay, Pagination]}
            >
              <SwiperSlide>
                <img
                  src={about_1}
                  alt="about"
                  className="w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={about_2}
                  alt="about"
                  className="w-full  object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={about_3}
                  alt="about"
                  className="w-full  object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={about_4}
                  alt="about"
                  className="w-full object-cover"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src={about_5}
                  alt="about"
                  className="w-full  object-cover"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="w-full lg:w-1/2 flex flex-wrap lg:pl-[20px] mt-[20px]">
            <div className="w-full md:w-1/2 md:px-[20px] mb-[20px] md:mb-[32px]">
              <h4 className="text-[28px] md:text-[36px] font-[700] mb-[20px] text-red-500">
                07/11/1995
              </h4>
              <h5 className="md:text-[17px] font-[500]">{t('about-year')}</h5>
            </div>
            <div className="w-full md:w-1/2 md:px-[20px] mb-[20px] md:mb-[32px]">
              <h4 className="text-[28px] md:text-[36px] font-[700] mb-[20px] text-red-500">
                21
              </h4>
              <h5 className="md:text-[17px] font-[500]">{t('about-branch')}</h5>
            </div>
            <div className="w-full md:w-1/2 md:px-[20px] mb-[20px] md:mb-[32px]">
              <h4 className="text-[28px] md:text-[36px] font-[700] mb-[20px] text-red-500">
                TOP-4
              </h4>
              <h5 className="md:text-[17px] font-[500]">{t('about-top')}</h5>
            </div>
            <div className="w-full md:w-1/2 md:px-[20px] mb-[20px] md:mb-[32px]">
              <h4 className="text-[28px] md:text-[36px] font-[700] mb-[20px] text-red-500">
                14
              </h4>
              <h5 className="md:text-[17px] font-[500]">
                {t('about-service')}
              </h5>
            </div>
          </div>
        </div>

        <div
          className="flex flex-wrap mx-[-12px] pb-[60px] "
          style={{ width: 'calc(100% + 24px)' }}
        >
          <div className="info">
            <svg fill="none" height="40" viewBox="0 0 50 40" width="50">
              <path
                d="M7.5 17.5C10.2578 17.5 12.5 15.2578 12.5 12.5C12.5 9.74219 10.2578 7.5 7.5 7.5C4.74219 7.5 2.5 9.74219 2.5 12.5C2.5 15.2578 4.74219 17.5 7.5 17.5ZM42.5 17.5C45.2578 17.5 47.5 15.2578 47.5 12.5C47.5 9.74219 45.2578 7.5 42.5 7.5C39.7422 7.5 37.5 9.74219 37.5 12.5C37.5 15.2578 39.7422 17.5 42.5 17.5ZM45 20H40C38.625 20 37.3828 20.5547 36.4766 21.4531C39.625 23.1797 41.8594 26.2969 42.3438 30H47.5C48.8828 30 50 28.8828 50 27.5V25C50 22.2422 47.7578 20 45 20ZM25 20C29.8359 20 33.75 16.0859 33.75 11.25C33.75 6.41406 29.8359 2.5 25 2.5C20.1641 2.5 16.25 6.41406 16.25 11.25C16.25 16.0859 20.1641 20 25 20ZM31 22.5H30.3516C28.7266 23.2812 26.9219 23.75 25 23.75C23.0781 23.75 21.2812 23.2812 19.6484 22.5H19C14.0312 22.5 10 26.5313 10 31.5V33.75C10 35.8203 11.6797 37.5 13.75 37.5H36.25C38.3203 37.5 40 35.8203 40 33.75V31.5C40 26.5313 35.9688 22.5 31 22.5ZM13.5234 21.4531C12.6172 20.5547 11.375 20 10 20H5C2.24219 20 0 22.2422 0 25V27.5C0 28.8828 1.11719 30 2.5 30H7.64844C8.14062 26.2969 10.375 23.1797 13.5234 21.4531Z"
                fill="url(#paint0_linear_1521_380)"
              ></path>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1521_380"
                  x1="50"
                  x2="43.7984"
                  y1="2.5"
                  y2="44.0389"
                >
                  <stop stop-color="#F61E2E"></stop>
                  <stop offset="1" stop-color="#920448"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h4
              ref={(el) => (countRefs.current[0] = el)}
              className="text-[32px] font-[700] mt-[24px]"
            >
              2000+
            </h4>
            <h5 className="text-[17px] font-[500] mt-[12px] leading-[150%]">
              {t('about-workers')}
            </h5>
          </div>
          <div className="info">
            <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
              <path
                d="M36.4113 30.255C35.7388 29.5952 27.5894 26.4543 26.1106 25.8619C24.6396 25.2797 24.0528 23.6666 24.0528 23.6666C24.0528 23.6666 23.3907 24.0314 23.3907 23.0068C23.3907 21.981 24.0528 23.6666 24.7149 19.7107C24.7149 19.7107 26.552 19.1971 26.1872 14.9502H25.7458C25.7458 14.9502 26.8493 10.4096 25.7458 8.87277C24.6383 7.33595 24.2047 6.31141 21.773 5.57663C19.3452 4.84315 20.228 4.98933 18.4649 5.06436C16.6992 5.1381 15.2296 6.0902 15.2296 6.60118C15.2296 6.60118 14.126 6.67491 13.6872 7.11474C13.2457 7.55457 12.5109 9.60366 12.5109 10.1159C12.5109 10.6282 12.8783 14.0744 13.2457 14.804L12.8082 14.9463C12.4408 19.1945 14.2779 19.7094 14.2779 19.7094C14.94 23.6653 15.6022 21.9797 15.6022 23.0055C15.6022 24.0301 14.94 23.6653 14.94 23.6653C14.94 23.6653 14.3519 25.2771 12.8822 25.8606C11.4125 26.4466 3.25403 29.5952 2.5906 30.2537C1.92847 30.9264 2.00247 34 2.00247 34H36.9968C36.9968 34 37.0786 30.9238 36.4087 30.2524L36.4113 30.255ZM28.1866 33.1656H22.2637V31.5486H28.1866V33.1656Z"
                fill="url(#paint0_linear_1521_364)"
              ></path>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1521_364"
                  x1="37"
                  x2="30.9705"
                  y1="5"
                  y2="39.1196"
                >
                  <stop stop-color="#F61E2E"></stop>
                  <stop offset="1" stop-color="#920448"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h4 className="text-[32px] font-[700] mt-[24px]">25%+</h4>
            <h5 className="text-[17px] font-[500] mt-[12px] leading-[150%]">
              {t('about-adault')}
            </h5>
          </div>
          <div className="info">
            <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
              <g clip-path="url(#clip0_1521_370)">
                <path
                  d="M7.994 16.4L20 23.6L38 12.8L20 2L2 12.8H20V16.4H7.994ZM2 16.4V30.8L5.6 26.804V18.56L2 16.4ZM20 38L11 32.6L7.4 30.44V19.64L20 27.2L32.6 19.64V30.44L20 38Z"
                  fill="url(#paint0_linear_1521_370)"
                ></path>
              </g>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1521_370"
                  x1="38"
                  x2="29.0896"
                  y1="2"
                  y2="43.7777"
                >
                  <stop stop-color="#F61E2E"></stop>
                  <stop offset="1" stop-color="#920448"></stop>
                </linearGradient>
                <clipPath id="clip0_1521_370">
                  <rect width="40" height="40" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
            <h4
              ref={(el) => (countRefs.current[1] = el)}
              className="text-[32px] font-[700] mt-[24px]"
            >
              1500+
            </h4>
            <h5 className="text-[17px] font-[500] mt-[12px] leading-[150%]">
              {t('about-high')}
            </h5>
          </div>
          <div className="info">
            <svg fill="none" height="40" viewBox="0 0 40 40" width="40">
              <path
                d="M18.28 3.87497C18.7794 3.51034 19.3817 3.31384 20 3.31384C20.6183 3.31384 21.2206 3.51034 21.72 3.87497L34.0883 12.9016C35.7167 14.0883 34.8783 16.6633 32.865 16.6683H7.13333C5.12 16.6633 4.28333 14.0883 5.91 12.9016L18.2783 3.87497H18.28ZM21.6667 10.4166C21.6667 9.97461 21.4911 9.55069 21.1785 9.23813C20.8659 8.92557 20.442 8.74998 20 8.74998C19.558 8.74998 19.134 8.92557 18.8215 9.23813C18.5089 9.55069 18.3333 9.97461 18.3333 10.4166C18.3333 10.8587 18.5089 11.2826 18.8215 11.5952C19.134 11.9077 19.558 12.0833 20 12.0833C20.442 12.0833 20.8659 11.9077 21.1785 11.5952C21.4911 11.2826 21.6667 10.8587 21.6667 10.4166ZM18.75 26.6666H15.4167V18.3333H18.75V26.6666ZM24.5833 26.6666H21.25V18.3333H24.5833V26.6666ZM30.8333 26.6666H27.0833V18.3333H30.8333V26.6666ZM31.25 28.3333H8.75C7.75544 28.3333 6.80161 28.7284 6.09835 29.4317C5.39509 30.1349 5 31.0887 5 32.0833V32.9166C5 33.6083 5.56 34.1666 6.25 34.1666H33.75C34.0815 34.1666 34.3995 34.0349 34.6339 33.8005C34.8683 33.5661 35 33.2482 35 32.9166V32.0833C35 31.0887 34.6049 30.1349 33.9016 29.4317C33.1984 28.7284 32.2446 28.3333 31.25 28.3333ZM12.9167 26.6666H9.16667V18.3333H12.9167V26.6666Z"
                fill="url(#paint0_linear_1533_307)"
              ></path>
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id="paint0_linear_1533_307"
                  x1="35"
                  x2="27.1662"
                  y1="3.31384"
                  y2="39.0286"
                >
                  <stop stop-color="#F61E2E"></stop>
                  <stop offset="1" stop-color="#920448"></stop>
                </linearGradient>
              </defs>
            </svg>
            <h4
              ref={(el) => (countRefs.current[2] = el)}
              className="text-[32px] font-[700] mt-[24px]"
            >
              1100+
            </h4>
            <h5 className="text-[17px] font-[500] mt-[12px] leading-[150%]">
              {t('about-proffesionals')}
            </h5>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between pb-[60px] px-4">
          <div className="left w-full md:max-w-[400px] mb-6 md:mb-0">
            <h2 className="text-[28px] md:text-[36px] font-[700] leading-[150%]">
              {t('about-slide-title')}
            </h2>
            <h3 className="text-[15px] md:text-[20px] font-[500] leading-[160%] mt-[24px]">
              {t('about-slide-discription')}
            </h3>
          </div>
          <div className="about-right w-full md:w-2/3">
            <Swiper
              slidesPerView={1}
              modules={[Autoplay]}
              spaceBetween={30}
              autoplay={{ delay: 3000 }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
                1260: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
            >
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={Award} alt="award" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    {t('about-slider-title')}
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    {t('about-slider-discription')}
                  </h5>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={MDH} alt="award" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    {t('about-slider-title2')}
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    {t('about-slider-discription2')}
                  </h5>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={Invt} alt="award" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    {t('about-slider-title3')}
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    {t('about-slider-discription3')}
                  </h5>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={Top} alt="award" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    {t('about-slider-title4')}
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    {t('about-slider-discription4')}
                  </h5>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={Year} alt="award" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    {t('about-slider-title5')}
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    {t('about-slider-discription')}
                  </h5>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="bg-white aboutBank-slider rounded-[12px] flex flex-col items-center border border-[#dadada] md:border-none">
                  <img src={Borrower} alt="award" className="" />
                  <h4 className="text-[16px] font-[700] leading-[160%] mt-[12px] mx-[20px]">
                    Borrower of the year
                  </h4>
                  <h5 className="text-[13px] font-[500] leading-[150%] mt-[12px] mx-[20px]">
                    Financial CBONDS Information - Borrower of the year
                  </h5>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBank;

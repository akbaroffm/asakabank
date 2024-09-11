import React from 'react';
import ProcessSection from '../Home/ProcessSection';
import FeedBackSection from '../Home/FeedbackSection';
import AsakaLogo from '../../assets/images/asakalogo.png';
import asakaWomen from '../../assets/images/asaka-women.png';
import asakaEmployees from '../../assets/images/asaka-employees.png';
import asakaCollective from '../../assets/images/asaka-collective.png';
import asakaEvent from '../../assets/images/asaka-event.png';
import './Career.css';
import { useTranslation } from 'react-i18next';

function Career() {
  const { t, i18n } = useTranslation('common');
  const { language } = i18n;

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="career-bg">
          <div className="content flex flex-col items-center md:items-start justify-center md:max-w-[550px] md:h-[550px] text-center md:text-start px-4">
            <h2 className="text-[24px] md:text-[36px] font-[700] leading-[133%] md:mt-[-100px] ">
              {t('career-title')}
            </h2>
            <p className="text-[16px]  md:text-[20px] font-[500] leading-[150%] my-[24px]">
              {t('career-disctiption')}
            </p>
            {/* <button
              // onClick={handleScrollToVacancies}
              className="rounded-[12px] text-[17px] font-[500] h-[52px] px-[40px] bg-red-500 text-white"
            >
              IT vakansiyalar
            </button> */}
          </div>
        </div>
        <div className="pt-[60px]">
          <ProcessSection />
        </div>
        <div className="flex justify-between mt-[60px] p-[40px] rounded-[24px] bg-[#f6f6f6]">
          <div className=" hidden bg-white rounded-[20px] lg:flex md:flex-col md:items-center md:justify-center h-[320px] w-[320px] border border-[#d4d4d4]">
            <span className="text-[56px] font-[700] text-red-500">ONE</span>
            <span className="text-[56px] font-[700]">DAY</span>
            <span className="text-[56px] font-[700]">OFFER</span>
          </div>
          <div className="flex flex-col items-center justify-center max-w-[730px]">
            <h3 className="text-[24px] md:text-[36px] font-[700] leading-[140%] max-w-[650px] text-center">
              {t('oneday-title')}
            </h3>
            <p className="text-[18px] font-[400] md:font-[500] leading-[140%] mt-[18px] max-w-[650px] text-center">
              {t('oneday-discription')}
            </p>
            <img
              className="w-[180px] md:w-[228px] mt-[24px]"
              src={AsakaLogo}
              alt="logo"
            />
          </div>
        </div>
        <div className="py-[60px] px-4">
          <div className="flex flex-wrap gap-y-5 justify-between mt-[20px]">
            <div className="max-w-[580px]">
              <img className="" src={asakaWomen} alt="asaka-women" />
            </div>
            <div className="max-w-[580px]">
              <img src={asakaEmployees} alt="asaka-women" />
            </div>
          </div>
          <div className="career-text">
            <p>{t('oneday-discription1')}</p>
            <h3 className="text-[24px] md:text-[28px] font-[700] leading-[140%] mt-[20px]">
              {t('oneday-title1')}
            </h3>
            <p>{t('oneday-discription2')}</p>
            <div className="flex flex-wrap gap-y-5 justify-between mt-[20px]">
              <div className="max-w-[580px]">
                <img src={asakaCollective} alt="collect" />
              </div>
              <div className="max-w-[580px]">
                <img src={asakaEvent} alt="event" />
              </div>
            </div>
            <p>{t('oneday-discription3')}</p>
            <h3 className="text-[24px] md:text-[28px] font-[700] leading-[140%] mt-[20px]">
              <span className="text-red-500"></span> {t('oneday-title2')}
            </h3>
            <p>{t('oneday-discription4')}</p>
            <p>{t('oneday-discription5')}</p>
            <p>{t('oneday-discription6')}</p>
            <div className="gap-y-5 flex flex-wrap justify-between mt-[20px]">
              <div className="max-w-[580px]">
                <img src={asakaCollective} alt="collect" />
              </div>
              <div className="max-w-[580px]">
                <img src={asakaEvent} alt="event" />
              </div>
            </div>
          </div>
          <FeedBackSection />
        </div>
      </div>
    </div>
  );
}

export default Career;

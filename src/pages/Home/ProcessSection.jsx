import React, { useState } from 'react';
import Interview from '../../assets/images/interview.png';
import Customer from '../../assets/images/customer.png';
import Security from '../../assets/images/security.png';
import JobOffer from '../../assets/images/job-offer.png';
import Modal from '../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';

function ProcessSection() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t, i18n } = useTranslation('process');
  const { language } = i18n;

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="pb-[60px] px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-[750px] mx-auto mb-16">
          <h3 className="font-bold text-[24px] lg:text-[36px]">
            {t('process')}
          </h3>
          <p className="font-normal text-[16px] lg:text-[18px] mt-4">
            {t('process-title')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-[36px]">
          <div className="flex flex-col text-center relative">
            <div className="bg-[#f8f8f8] border border-[#e3e3e3] p-[12px] rounded-[16px] flex items-center justify-center h-[230px] relative">
              <span className="bg-white font-[700] text-[20px] text-blue-500 rounded-full border border-[#e3e3e3] flex justify-center items-center w-10 h-10 absolute top-[16px] left-[16px]">
                1
              </span>
              <img src={Interview} alt="HR bilan suhbat" className="" />
            </div>
            <p className="font-medium mt-4 text-[18px]">{t('hr')}</p>
          </div>
          <div className="flex flex-col text-center relative">
            <div className="bg-[#f8f8f8] border border-[#e3e3e3] p-[12px] rounded-[16px] flex items-center justify-center h-[230px] relative">
              <span className="bg-white font-[700] text-[20px] text-blue-500 rounded-full border border-[#e3e3e3] flex justify-center items-center w-10 h-10 absolute top-[16px] left-[16px]">
                2
              </span>
              <img
                src={Customer}
                alt="Buyurtmachi bilan suhbatlar"
                className=""
              />
            </div>
            <p className="font-medium mt-4 text-[18px]">{t('customer')}</p>
          </div>
          <div className="flex flex-col text-center relative">
            <div className="bg-[#f8f8f8] border border-[#e3e3e3] p-[12px] rounded-[16px] flex items-center justify-center h-[230px] relative">
              <span className="bg-white font-[700] text-[20px] text-blue-500 rounded-full border border-[#e3e3e3] flex justify-center items-center w-10 h-10 absolute top-[16px] left-[16px]">
                3
              </span>
              <img
                src={Security}
                alt="Xavfsizlik va komplaeans tekshiruvi"
                className=""
              />
            </div>
            <p className="font-medium mt-4 text-[18px]">{t('safety')}</p>
          </div>
          <div className="flex flex-col text-center relative">
            <div className="bg-[#f8f8f8] border border-[#e3e3e3] p-[12px] rounded-[16px] flex items-center justify-center h-[230px] relative">
              <span className="bg-white font-[700] text-[20px] text-blue-500 rounded-full border border-[#e3e3e3] flex justify-center items-center w-10 h-10 absolute top-[16px] left-[16px]">
                4
              </span>
              <img src={JobOffer} alt="Ishga taklif" className="" />
            </div>
            <p className="font-medium mt-4 text-[18px]">{t('work')}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleModalOpen}
            className="rounded-[12px] bg-red-500 flex justify-center font-[500] text-[17px] md:px-[30px] px-[30px] py-[15px] md:py-[15px] text-white"
          >
            {t('resume')}
          </button>
        </div>
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
    </div>
  );
}

export default ProcessSection;

import React, { useState, useEffect } from 'react';
import animation from '../../assets/images/animationHero.mp4';
import Modal from '../../components/Modal/Modal';
import { useTranslation } from 'react-i18next';

function Hero() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { t, i18n } = useTranslation('hero');
  const { language } = i18n;

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  // useEffect(() => {
  //   // Disable body scroll when the modal is open
  //   document.body.style.overflow = isModalVisible ? 'hidden' : 'auto';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, [isModalVisible]);

  return (
    <div className="">
      <div className="relative md:h-screen overflow-hidden md:py-[50px] md:px-4">
        <div className="md:absolute inset-0 w-full md:h-full object-cover">
          <video
            className="w-full h-full object-cover"
            src={animation}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>
        <div className="container mx-auto">
          <div className="relative z-10 flex flex-col items-center md:items-start justify-start md:h-full text-center">
            <h1 className="text-[20px] md:text-[25px] font-bold mb-4 animate-fade-in mt-4 md:mt-0">
              {t('selection')}
            </h1>
            <button
              onClick={handleModalOpen}
              className="md:mt-[32px] px-[25px] py-2 md:px-[35px] md:py-3 bg-red-500 text-white text-[17px] font-[500] rounded-lg hover:bg-red-600 transition-colors"
            >
              {t('subscribe')}
            </button>
          </div>
        </div>
      </div>
      <Modal isVisible={isModalVisible} onClose={handleModalClose} />
    </div>
  );
}

export default Hero;

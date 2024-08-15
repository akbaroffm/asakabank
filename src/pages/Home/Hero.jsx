import React from 'react';
import animation from '../../assets/images/animationHero.mp4';

function Hero() {
  return (
    <div>
      <div className="relative md:h-screen overflow-hidden md:py-[50px]">
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
              To'gri tanlov - muvaffaqiyatli natija
            </h1>
            <button className="md:mt-[32px] px-[25px] py-2 md:px-[35px] md:py-3 bg-red-500 text-white text-[17px] font-[500] rounded-lg hover:bg-red-600 transition-colors">
              Jamoa a'zosi bo'lish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

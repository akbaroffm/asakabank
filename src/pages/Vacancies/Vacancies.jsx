import React from 'react';
import HeroImg from '../../assets/images/heroImg.png';
import Filter from './Filter/Filter';
import ListVacancies from './ListVacancies/ListVacancies';

function Vacancies() {
  return (
    <div>
      <div
        className="heroBg px-3"
        style={{
          background: `url(${HeroImg}) center center / cover no-repeat rgb(230, 230, 230)`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="md:pb-[80px] md:pt-[112px] text-left md:text-left pt-[60px] pb-[40px] ">
            <h2 className="text-2xl md:text-4xl leading-snug font-semibold mb-6">
              Orzuingizdagi ishni toping
            </h2>
            <p className="text-base md:text-lg leading-relaxed font-medium mx-auto md:mx-0 max-w-[480px]">
              Ish qidiryapsizmi? Bugungi kundagi eng so'ngi vakansiyalarimiz bilan tanishib chiqing va o'zizga munosibini tanlang!
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:space-x-6 pt-12 p-2">
          <div className="mb-8 md:mb-0 md:w-3/7">
            <Filter />
          </div>
          <div className="md:w-2/3">
            <ListVacancies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vacancies;

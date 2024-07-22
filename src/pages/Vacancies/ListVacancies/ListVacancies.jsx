import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const results = [
    {
      title: 'Ekspert (Ekspert)-tahli guruh',
      direction: 'To’liq stavka',
      filial: '"Asaka Bank" AJ bosh ofisi',
      date: '2024.03.29', 
      description: 'Bankka biriktirilgan shahar / tumanlar bo’yicha berilgan topshiriqlarning ijrosi haqida ma’lumotlarni jamlash, to’plangan ma’lumotlar asosida Bank rahbariyatiga takliflar tayyorlash haqida kelishi mumkin...',
    },
    {
      title: 'Senior PHP backend dasturchi',
      direction: 'To’liq stavka',
      filial: '"Asaka Bank" AJ bosh ofisi',
      description: "Veb-ilovalarni ishlab chiqish va qo'llab-quvvatlash, veb-ilovalarda ishlatiladigan ma'lumotlarni saqlash va qayta ishlash uchun ma'lumotlar bazalari bilan ishlash. Ishlashni optimallashtirish, sinovdan o'tkazish va tuzatishni amalga oshirish",
      date: '2024.08.19',
    },
    {
      title: 'XTT bo’limining bosh mutaxassisi (xalqaro to’lov tizimlari)',
      direction: 'To’liq stavka',
      filial: '"Asaka Bank" AJ bosh ofisi',
      description: "Xalqaro to'lov tizimi-bu naqd pulsiz va naqd pul shaklida pul va pul ekvivalentlarini o'tkazish xizmati. Xalqaro to'lov tizimlarining funktsiyalari va elementlari.",
      date: '2024.02.13',
    },
    {
      title: 'QA Engineer',
      direction: 'To’liq stavka',
      filial: '"Asaka Bank" AJ bosh ofisi',
      description: "Testlovchi - komponent yoki tizimni sinovdan o'tkazishda ishtirok etadigan mutaxassis. Uning mas'uliyati sinov ob'ektining ishlashida mumkin bo'lgan xatolar va nosozliklarni qidirishdir.",
      date: '2024.05.21',
    },
  ];

  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[730px] mx-auto bg-white border border-gray-300 rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row md:space-x-3 mb-4">
        <div className="relative w-full mb-3 sm:mb-0 ">
          <input
            type="text"
            placeholder="Qidiring"
            className="w-full p-3 border border-gray-300 rounded-[12px] bg-gray-100 outline-none pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className='mt-3 sm:mt-0 px-4 py-2 rounded-[12px] bg-red-500 text-white text-center font-medium hover:bg-red-600 transition'>
          Qidirish
        </button>
      </div>
      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg hover:border-red-500 transition">
              <h2 className="font-medium text-lg mb-1">{result.title}</h2>
              <div className='flex flex-wrap space-x-2 text-sm text-gray-600 mb-2'>
                <span>{result.direction}</span>
                <span>{result.filial}</span>
                <span>{result.date}</span>
              </div>
              <p className="text-gray-800 text-base font-[500] my-4">{result.description}</p>
              <div className='flex flex-wrap gap-2'>
                <span className='text-gray-700 cursor-pointer rounded-full py-1 px-3 text-sm font-medium bg-gray-200 border'>
                  Excel
                </span>
                <span className='text-gray-700 cursor-pointer rounded-full py-1 px-3 text-sm font-medium bg-gray-200 border'>
                  Python
                </span>
                <span className='text-gray-700 cursor-pointer rounded-full py-1 px-3 text-sm font-medium bg-gray-200 border'>
                  MySQL
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center">
            <p className="text-gray-600">Information not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

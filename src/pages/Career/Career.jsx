import React from 'react';
import ProcessSection from '../Home/ProcessSection';
import FeedBackSection from '../Home/FeedbackSection';
import AsakaLogo from '../../assets/images/asakalogo.png';
import asakaWomen from '../../assets/images/asaka-women.png';
import asakaEmployees from '../../assets/images/asaka-employees.png';
import asakaCollective from '../../assets/images/asaka-collective.png';
import asakaEvent from '../../assets/images/asaka-event.png';
import './Career.css';

function Career() {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <div className="career-bg">
          <div className="content flex flex-col items-center md:items-start justify-center md:max-w-[550px] md:h-[550px] text-center md:text-start px-4">
            <h2 className="text-[24px] md:text-[36px] font-[700] leading-[133%] md:mt-[-100px] ">
              Zamonaviy fikrlash taraqqiyot asosidir
            </h2>
            <p className="text-[16px]  md:text-[20px] font-[500] leading-[150%] my-[24px]">
              O'zing uchun imkoniyatlar eshigini och va biz bilan o'z
              maqsadlaring sari qadam bos
            </p>
            <button
              // onClick={handleScrollToVacancies}
              className="rounded-[12px] text-[17px] font-[500] h-[52px] px-[40px] bg-red-500 text-white"
            >
              IT vakansiyalar
            </button>
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
              “Asakabank” har yili talabalar uchun "One day offer" dasturini
              o'tkazib boradi
            </h3>
            <p className="text-[18px] font-[400] md:font-[500] leading-[140%] mt-[18px] max-w-[650px] text-center">
              Ushbu loyihada “Asakabank” AJ Mamlakatimizning ko'zga ko'ringan
              nufuzli Oliy o'quv yurtlari talabalari uchun o‘z eshiklarini ochib
              tadbirida qatnashgan talabalar orasida eng iqtidorli va
              salohiyyatli yoshlar amaliyot o‘tash va natijada bank xodimi
              bo‘lish imkoniyatiga ega bo‘ladilar
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
            <p>
              Asakabankdan "One day offer" taklif o'zi nima: bu tezlashtirilgan
              amaliyot tanlovi dasturi bo'lib, keyinchalik talabalar uchun ish
              bilan ta'minlanish imkoniyatini beradi. Barcha sinovlarni
              muvaffaqiyatli yakunlay oladiganlar shu kuni ish beruvchidan ishga
              taklifnoma olishadi.
            </p>
            <h3 className="text-[24px] md:text-[28px] font-[700] leading-[140%] mt-[20px]">
              Talaba uchun bir kunda ish topish mumkinmi?
            </h3>
            <p>
              Bu savol har doim talabalar o'qish paytida yoki o'qishni
              tugatgandan so'ng ish topishga urinishlarida berilgan. Shunday
              qilib, Asakabankning "bir kunlik taklif" ochiq tadbiri tufayli bir
              qator omadli talabalar uchun bu juda yaxshi imkoniyatni berdi.
            </p>
            <div className="flex flex-wrap gap-y-5 justify-between mt-[20px]">
              <div className="max-w-[580px]">
                <img src={asakaCollective} alt="collect" />
              </div>
              <div className="max-w-[580px]">
                <img src={asakaEvent} alt="event" />
              </div>
            </div>
            <p>
              Ushbu tadbirda Toshkent shahrida joylashgan nufuzli Oliy o'quv
              yurtlari talabalari xalqaro Tashkent mehmonxonasining
              konferentsiya zalida bank tomonidan tashkil etilgan musobaqada
              bo'lajak stajyorlar ishtirok etish uchun yig'ilishdi. 100 dan
              ortiq talabalar o'zlarining omadlarini sinab ko'rishga va bank va
              ixtisoslashtirilgan mavzular bo'yicha bilimlarini namoyon etish
              uchun taklif qilindi, ularning maqsadi Asakabank – da amaliyot
              o'tash bilan o'z faoliyatini boshlashdir.
            </p>
            <h3 className="text-[24px] md:text-[28px] font-[700] leading-[140%] mt-[20px]">
              <span className="text-red-500">One Day Offer</span> nima:
            </h3>
            <p>
              Bu tezlashtirilgan amaliyot tanlovi dasturi bo'lib, keyinchalik
              talabalar uchun ish bilan ta'minlanadi. Ushbu tadbirda
              ishtirokchilarga bir nechta mashqlarda (mantiq,
              ixtisoslashtirilgan yo'nalish hamda mamlakat bozorining
              xususiyatlarini bilish) bir-biri bilan raqobatlashish, biznes
              holatlarini tayyorlash va himoya qilish jarayonida jamoaviy ish va
              o'zini o'zi tashkil etish ko'nikmalarini namoyish etish taklif
              qilindi. Va eng muhimi, potentsial Rahbarlaringiz bilan suxbat.
            </p>
            <p>
              Belgilangan vaqtda hamma ham vazifalarni to'liq bajara olmadi,
              buning uchun bu tanlov tadbiridir. Ammo shunga qaramay, 36 ta
              omadli odam departamentdan o'zlari tanlagan ish taklifi bilan
              qimmatbaho konvertni ish joyi sifatida olishdi. Va 2022 yil yanvar
              oyidan boshlab ular amaliyotni boshlashlari va keyin Asakabankning
              to'laqonli xodimlariga aylanishlari mumkin.
            </p>
            <p>
              Bu ASAKA bankning so'nggi tadbiri emas, kelgusi yilda ONE DAY
              OFFER va "Hackathonlar" ham talabalar va bozorda allaqachon
              shakllangan mutaxassislar uchun o'tkaziladi.
            </p>
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

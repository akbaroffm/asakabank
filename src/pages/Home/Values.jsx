import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import api from '../../services/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Values.css';

function Values() {
  const [valuesData, setValuesData] = useState([]);

  useEffect(() => {
    const fetchValuesData = async () => {
      try {
        const response = await api({ url: '/home-page/' });
        const results = response?.data?.results || [];
        const formattedData = results.map((item) => ({
          title: item.title_uz || item.title,
          imgSrc: item.icon.url,
          alt: item.icon.name,
          backInfo: {
            description: item.description_uz || item.description,
          },
        }));
        setValuesData(formattedData);
      } catch (error) {
        console.error('Error fetching values data', error);
      }
    };

    fetchValuesData();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="my-[40px] px-1">
        <div className="px-2">
          <h2 className="md:text-[36px] text-[24px] font-[700]">
            Bizning <span className="text-red-500">qadriyatlar</span>
          </h2>
        </div>
        <div className="md:mt-[60px] mt-[20px]">
          <Slider {...settings}>
            {valuesData.map((value, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flip-card my-10 mx-2">
                  <div className="flip-card-inner">
                    <div className="flip-card-front ">
                      <div className="pt-[20px] py-[20px] bg-[#EFEFEF] pb-[50px] rounded-[20px] px-[20px]">
                        <h4 className="font-[700] text-[22px] text-center pb-[20px]">
                          {value.title}
                        </h4>
                        <img
                          className="carusel-img mx-auto mt-[70px]"
                          src={value.imgSrc}
                          alt={value.alt}
                        />
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div className="card-content p-[20px] text-white rounded-[20px]">
                        <h4 className="font-[700] text-[22px] text-center">
                          {value.title}
                        </h4>
                        <p className="text-center mt-5">
                          {value.backInfo.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Values;

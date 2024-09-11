import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useTranslation } from 'react-i18next';

function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const { t, i18n } = useTranslation('common');
  const { language } = i18n;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogsData = async () => {
      try {
        const response = await api({ url: '/blogs/' });
        const results = response?.data?.results;
        const blogs = Array.isArray(results) ? results : [];
        setBlogs(blogs);
        console.log(blogs);
      } catch {
        console.error('Error fetching blogs data');
      }
    };
    fetchBlogsData();
  }, [language, t]);

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  const createMarkup = (html) => ({ __html: html });

  return (
    <div className="md:pt-[40px] pb-[80px] px-4">
      <div className="container mx-auto ">
        <h3 className="font-[700] md:text-[36px] text-[24px] text-center mb-8">
          {t('asaka-life')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 6).map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-[20px] p-[18px] overflow-hidden flex flex-col justify-between h-full shadow-custom-light cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              <img
                src={blog.image.url}
                alt={blog.image.name}
                className="w-full h-[200px] object-cover rounded-[12px]"
              />
              <div className="flex-1 mt-4">
                <h4 className="font-bold text-[17px]">{blog.title}</h4>
                <p
                  className="text-[#555] mt-2 text-[15px] font-[500] leading-[150%]"
                  dangerouslySetInnerHTML={createMarkup(blog.short_description)}
                />
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center text-red-500 font-semibold cursor-pointer">
                  {t('more')}
                  {''}
                  <span className="ml-3">
                    <svg fill="red" height="24" viewBox="0 0 24 24" width="24">
                      <circle cx="12" cy="12" r="12" fill="red"></circle>
                      <path
                        d="M12.4663 15.95C12.3108 16.0389 12.1719 16.0249 12.0497 15.908C11.9275 15.7911 11.9108 15.6551 11.9997 15.5L13.6163 12.6667H5.99968C5.81079 12.6667 5.65234 12.6027 5.52434 12.4747C5.39634 12.3467 5.33257 12.1884 5.33301 12C5.33301 11.8111 5.39701 11.6527 5.52501 11.5247C5.65301 11.3967 5.81123 11.3329 5.99968 11.3333H13.6163L11.9997 8.49999C11.9108 8.34444 11.9275 8.20821 12.0497 8.09132C12.1719 7.97444 12.3108 7.96066 12.4663 8.04999L17.783 11.4333C17.9941 11.5667 18.0997 11.7555 18.0997 12C18.0997 12.2444 17.9941 12.4333 17.783 12.5667L12.4663 15.95Z"
                        fill="white"
                      ></path>
                    </svg>
                  </span>
                </span>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.modified_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BlogSection;

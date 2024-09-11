import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { useTranslation } from 'react-i18next';
import Video from '../../components/Video';
function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const { t, i18n } = useTranslation('common');
  const { language } = i18n;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await api({ url: `/blogs/${id}/` });
        setBlog(response?.data);
      } catch {
        console.error('Error fetching blog data');
      }
    };
    fetchBlogData();
  }, [id, language, t]);

  const renderVideo = () => {
    if (blog?.link) {
      return (
        <div className="mt-8">
          <Video source={blog?.link} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pt-[50px] pb-[80px] px-4">
      <div className="container mx-auto px-4 py-8">
        {blog ? (
          <div className="flex justify-center">
            <div className="rounded-[24px] max-w-[816px] md:p-[32px] bg-white">
              <h1 className="text-[24px] md:text-[32px] font-[700] leading-[150%] ">
                {blog.title}
              </h1>
              <p className="text-[#555] font-[500] leading-[160%] mt-[20px]">
                {t('blog-chempion')}
              </p>
              <img
                src={blog.image.url}
                alt={blog.title}
                className="w-full object-cover mt-6 rounded-[16px] blog-img"
              />
              {renderVideo()}
              <div
                dangerouslySetInnerHTML={{ __html: blog.description }}
                className="mt-8 text-[16px] leading-[150%] blog-description"
              />
              <p className="mt-4 text-gray-600">
                {new Date(blog.modified_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;

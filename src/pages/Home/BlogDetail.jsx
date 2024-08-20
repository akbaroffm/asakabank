import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

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
  }, [id]);

  const renderVideo = () => {
    if (blog?.link && blog.link.includes('youtube.com')) {
      const videoId = blog.link.split('v=')[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return (
        <div className="mt-8">
          <iframe
            width="100%"
            src={embedUrl}
            title="YouTube video"
            className="rounded-[16px]"
            frameBorder="0"
            allowFullScreen
          />
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
            <div className="rounded-[24px] max-w-[816px] p-[32px] bg-white">
              <h1 className="text-[24px] md:text-[32px] font-[700] leading-[150%] ">
                {blog.title}
              </h1>
              <p className="text-[#555] font-[500] leading-[160%] mt-[20px]">
                Asakabankning o'z chempionlari bor
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

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import HeroImg from '../../../assets/images/heroImg.png';
import ClearIcon from '@mui/icons-material/Clear';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import api from '../../../services/api';
import axios from 'axios';

const SingleVacancy = () => {
  const nameInputRef = useRef(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('singleVacancy');
  const { language } = i18n;
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarVacancies, setSimilarVacancies] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    phone: '+998',
    email: '',
    cv: null,
    agreement: false,
    vacancy: null,
  });
  console.log(formData);
  console.log(vacancy);

  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleModalClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await api({
          url: `/vacancies/${slug}/`,
        });
        setVacancy(response.data);

        if (response.data.category) {
          fetchSimilarVacancies(response.data.category.id);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarVacancies = async (categoryId) => {
      try {
        const response = await api({
          url: `/vacancies?category=${categoryId}`,
        });
        setSimilarVacancies(response.data.results);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchVacancy();
  }, [slug, language]);

  useEffect(() => {
    if (vacancy) {
      const { id, slug, title } = vacancy;
      setFormData((prevFormData) => ({
        ...prevFormData,
        vacancy: vacancy.id,
      }));
    }
  }, [vacancy]);

  const handleModalOpen = () => {
    setIsModalVisible(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 100);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    document.body.style.overflow = '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Telefon raqam noto'g'ri kiritilgan.");
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (name === 'phone') {
      let phoneValue = value.replace(/[^\d+]/g, '');

      if (!phoneValue.startsWith('+998')) {
        phoneValue = '+998';
      }

      if (phoneValue.length > 13) {
        phoneValue = phoneValue.slice(0, 13);
      }

      setFormData({
        ...formData,
        [name]: phoneValue,
      });

      validatePhone(phoneValue);
    } else {
      setFormData({
        ...formData,
        [name]:
          type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
      });
    }
  };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2NzUwODMxLCJpYXQiOjE3MjY3MjIwMzEsImp0aSI6IjFiMWM3NmE0MmZhNDQ4MTM4ODIzMmIxNjViYjI2NWExIiwidXNlcl9pZCI6MX0.UlpmA55RwpOWgOmuU-PgAYxwY9x4dZhnHKBv8ieWdY8';

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast.error("Iltimos, telefon raqamni to'g'ri kiriting.");
      return;
    }

    if (!formData.agreement) {
      alert(
        "Iltimos, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildiring."
      );
      return;
    }

    setSubmitting(true);

    try {
      const cvFormData = new FormData();
      cvFormData.append('file', formData.cv);

      // Upload CV
      const cvResponse = await axios.post(
        'http://127.0.0.1:8000/upload/',
        cvFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cvId = cvResponse.data.id;

      const applicationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        father_name: formData.middleName,
        phone: formData.phone,
        email: formData.email,
        cv: cvId,
        agreement: formData.agreement,
        vacancy: formData.vacancy,
      };

      // Submit application
      await axios.post('http://127.0.0.1:8000/apply/job/', applicationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Ariza muvaffaqiyatli yuborildi!');
      handleModalClose();
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        phone: '+998',
        email: '',
        cv: null,
        agreement: false,
        vacancy: null,
      });
    } catch (error) {
      toast.error('Ariza yuborishda xato yuz berdi.');
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleVacancyClick = (vacancySlug) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    navigate(`/vacancies/${vacancySlug}`);
  };

  const handleFileSelect = () => {
    document.getElementById('cv-upload').click();
  };

  const truncateDescription = (description, wordLimit = 24) => {
    const words = description.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return description;
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <CircularProgress />
      </div>
    );
  }

  if (!vacancy) {
    return <div className="text-center p-4">{t('vacancy-not-found')}</div>;
  }

  const createMarkup = (html) => ({ __html: html });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="px-[4] md:overflow-hidden overflow-hidden">
      <ToastContainer position="top-right" />
      <div
        className="heroBg px-3"
        style={{
          background: `url(${HeroImg}) center center / cover no-repeat rgb(230, 230, 230)`,
        }}
      >
        <div className="container mx-auto ">
          <div className="max-w-[700px] md:pb-[80px] md:pt-[112px] text-left md:text-left py-[60px]">
            <h1 className="font-[700] leading-[150%] mb-[24px] text-[24px] md:text-[36px]">
              {vacancy.title}
            </h1>
            <p className="font-[500] leading-[150%] text-[16px] md:text-[18px]">
              {vacancy.description}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="pt-[60px]">
          <div className="bg-white md:border md:border-gray-300 rounded-[24px] px-[12px] md:p-[32px]">
            <div className="">
              <div>
                <div className="mb-[16px]">
                  <span className="text-[#b9b8b8] font-[500] text-[17px]">
                    {t('about-work')}
                  </span>
                </div>
                <h2 className="font-[700] text-[22px] md:text-[24px] leading-[150%]">
                  {vacancy.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-[10px]">
                  {vacancy.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF] transition"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <span className="text-[#b9b8b8]">
                  {t('created-data')}:{' '}
                  <span className="text-[#000] ml-[10px] font-[500]">
                    {formatDate(vacancy.created_date)}
                  </span>
                </span>
                <div className="mt-[20px]">
                  <button
                    type="button"
                    onClick={handleModalOpen}
                    className="bg-red-500 rounded-[12px] text-white font-[500] text-[17px] px-[36px] py-[14px]"
                  >
                    {t('application-fill')}
                  </button>
                </div>
              </div>
              <div className="md:border-t md:mt-[32px] pt-[24px] md:pt-[32px] md:border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">{t('tasks')}</strong>
                <div
                  className="mt-[16px] vacancy-item text-[18px]"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.responsibilities[0]?.description
                  )}
                />
              </div>
              <div className="md:border-t mt-[16px] md:mt-[32px] md:pt-[32px] border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">
                  {t('demand')}
                </strong>
                <div
                  className="vacancy-item mt-[16px]"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.requirements[0]?.description
                  )}
                />
              </div>
              <div className="md:border-t mt-[16px] md:mt-[32px] md:pt-[32px] border-[#CCCCCC]">
                <strong className="font-[700] text-[20px]">
                  {t('conditions')}
                </strong>
                <div
                  className="vacancy-item mt-[16px]"
                  dangerouslySetInnerHTML={createMarkup(
                    vacancy.conditions[0]?.description
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-[60px] md:max-w-[816px] w-full px-4">
          <h2 className="text-[24px] mb-[60px] font-[700] ">
            {t('similar-vacancy')}
          </h2>
          <div className="grid gap-5 max-w-[810px] ">
            {similarVacancies.map((similarVacancy) => (
              <div
                key={similarVacancy.id}
                className="bg-white border border-gray-300 rounded-[20px] p-[20px] hover:border-red-500 transition cursor-pointer"
                onClick={() => handleVacancyClick(similarVacancy.slug)}
              >
                <h2 className="font-medium text-lg">{similarVacancy.title}</h2>
                <div className="flex flex-wrap space-x-2 text-[15px] text-customGray my-1 leading-[150%]">
                  <span>{similarVacancy.job_type}</span>
                  <span>{similarVacancy.branch.city_name}</span>
                  <span>{formatDate(similarVacancy.created_date)}</span>
                </div>
                <p className="text-[#444] text-[17px] font-[500] my-5 leading-[150%]">
                  {truncateDescription(similarVacancy.description)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {similarVacancy.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[#494949] cursor-pointer rounded-full py-1 px-3 text-[13px] font-[500] bg-[#F5F5F5] border border-[#EFEFEF] transition"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isModalVisible && (
        <div
          className="fixed inset-0 bg-gray-300 bg-opacity-50 flex md:flex md:justify-center md:items-center z-50 overflow-auto md:pt-[50px] p-4 md:pb-[40px]"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white py-[30px] px-[24px] rounded-[24px] w-full max-w-[780px] modal-content h-[850px] md:h-auto"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-[22px] font-[700] mb-[20px] inline-block">
                {t('success')}
              </h2>
              <button
                className="bg-gray-200 rounded-[50%] px-[4px] py-[3px]"
                onClick={handleModalClose}
              >
                <ClearIcon />
              </button>
            </div>
            <form
              onSubmit={handleModalSubmit}
              className="flex flex-wrap gap-x-4"
            >
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  {t('name')} *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                  ref={nameInputRef}
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  {t('surname')} *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  {t('middlename')} *
                </label>
                <input
                  autoComplete="off"
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  {t('phone')} *
                </label>
                <input
                  autoComplete="off"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]">
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  Email *
                </label>
                <input
                  autoComplete="off"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className=" font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500"
                  required
                />
              </div>
              <div className="flex flex-col w-full pt-[24px]">
                <button
                  type="button"
                  onClick={handleFileSelect}
                  className="font-[500] text-[17px] mt-1 block w-full border-dashed border-2 border-black rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] text-gray-800"
                >
                  {formData.cv ? formData.cv.name : t('resume')}
                </button>
                <input
                  id="cv-upload"
                  type="file"
                  name="cv"
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
              <div className="flex flex-col w-full pt-[24px]">
                <label className="flex items-center text-[16px] font-[500]">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    className="hidden-checkbox"
                  />
                  <div className="custom-checkbox-container">
                    <div
                      className={`custom-checkbox ${
                        formData.agreement ? 'checked' : ''
                      }`}
                    />
                    <span className="ml-2">{t('agree')}</span>
                  </div>
                </label>
              </div>
              <div className="flex justify-end w-full pt-[24px]">
                <button
                  type="submit"
                  className={`bg-red-500 rounded-[12px] text-white font-[500] text-[17px] px-[36px] py-[14px] ${
                    formData.agreement
                      ? 'cursor-pointer'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                  disabled={submitting || !formData.agreement}
                >
                  {submitting ? t('wait') : t('success')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVacancy;

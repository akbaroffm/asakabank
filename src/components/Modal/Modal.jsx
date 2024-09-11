import React, { useState, useEffect, useRef } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import api from '../../services/api';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Modal = ({ isVisible, onClose }) => {
  const modalRef = useRef(null);
  const nameInputRef = useRef(null);
  const { t, i18n } = useTranslation('modal');
  const { language } = i18n;

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
  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);

      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose, language, t]);

  if (!isVisible) return null;

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

  const handleFileSelect = () => {
    document.getElementById('cv-upload').click();
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast.error("Iltimos, telefon raqamni to'g'ri kiriting.");
      return;
    }

    if (!formData.agreement) {
      toast.error(
        "Iltimos, shaxsiy ma'lumotlarni qayta ishlashga rozilik bildiring."
      );
      return;
    }

    setSubmitting(true);

    try {
      const cvFormData = new FormData();
      cvFormData.append('file', formData.cv);

      const cvResponse = await api({
        url: '/upload/',
        method: 'POST',
        data: cvFormData,
      });

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

      await api({
        url: '/apply/job/',
        method: 'POST',
        data: applicationData,
      });

      toast.success('Ariza muvaffaqiyatli yuborildi!');
      onClose();
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
      toast.error('Ariza yuborishda xato yuz berdi. CV yuklang');
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-auto fixed inset-0 bg-gray-300 bg-opacity-50 flex md:flex md:justify-center md:items-center z-50 overflow-auto p-4">
      <div
        ref={modalRef}
        className="bg-white py-[30px] px-[24px] rounded-[24px] w-full h-[850px] md:h-auto max-w-[780px]"
      >
        <div className="flex justify-between items-start mb-[20px]">
          <h2 className="text-[22px] font-[700]">{t('success')}</h2>
          <button className="bg-gray-200 rounded-[50%] p-2" onClick={onClose}>
            <ClearIcon />
          </button>
        </div>
        <form onSubmit={handleModalSubmit} className="flex flex-wrap gap-x-4">
          {['firstName', 'lastName', 'middleName', 'phone', 'email'].map(
            (field) => (
              <div
                className="flex flex-col w-full sm:w-[calc(50%-8px)] pt-[24px]"
                key={field}
              >
                <label className="block text-[15px] font-[500] text-[#A3A3A3]">
                  {field === 'firstName' && t('name') + ' *'}
                  {field === 'lastName' && t('surname') + ' *'}
                  {field === 'middleName' && t('middlename') + ' *'}
                  {field === 'phone' && t('phone') + ' *'}
                  {field === 'email' && 'Email *'}
                </label>

                <input
                  autoComplete="off"
                  type={
                    field === 'phone'
                      ? 'tel'
                      : field === 'email'
                      ? 'email'
                      : 'text'
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`font-[500] text-[17px] mt-1 block w-full border rounded-[12px] px-3 py-3 outline-none bg-[#FAFAFA] focus:border-red-500 ${
                    field === 'phone' && phoneError ? 'border-red-500' : ''
                  }`}
                  required
                  ref={field === 'firstName' ? nameInputRef : null}
                />
                {field === 'phone' && phoneError && (
                  <span className="text-red-500 text-[14px]">{phoneError}</span>
                )}
              </div>
            )
          )}
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
                required
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
          <div className="flex justify-center md:justify-end w-full pt-[24px]">
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
  );
};

export default Modal;

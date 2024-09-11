import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';
import ClearIcon from '@mui/icons-material/Clear';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
  faSms,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

function ContactShare() {
  const [isOpen, setIsOpen] = useState(false);
  const contactOptionsRef = useRef(null);
  const contactIconRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      contactOptionsRef.current &&
      !contactOptionsRef.current.contains(event.target) &&
      contactIconRef.current &&
      !contactIconRef.current.contains(event.target) &&
      modalRef.current &&
      !modalRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleModalClose();
  };

  return (
    <div className="contact-share fixed bottom-10 right-10 z-50">
      <div
        className="contact-icon"
        onClick={toggleOptions}
        ref={contactIconRef}
      >
        <FontAwesomeIcon
          icon={faComment}
          size="2x"
          className="w-[25px] h-[25px]"
        />
      </div>
      <div
        className={`contact-options ${isOpen ? 'open' : ''}`}
        ref={contactOptionsRef}
      >
        <a href="mailto:recruitment@asakabank.uz" className="option email">
          <FontAwesomeIcon
            icon={faEnvelope}
            size="2x"
            className="w-[23px] h-[23px]"
          />
        </a>
        <a href="tel:1152" className="option phone">
          <FontAwesomeIcon
            icon={faPhone}
            size="2x"
            className="w-[23px] h-[23px]"
          />
        </a>
        <a className="option sms" onClick={handleModalOpen}>
          <FontAwesomeIcon
            icon={faSms}
            size="2x"
            className="w-[23px] h-[23px]"
          />
        </a>
      </div>

      {isModalOpen && (
        <div className="fixed z-50 inset-0  p-4 flex items-center justify-center bg-gray-300 bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-[28px] rounded-[20px] w-[450px] relative"
          >
            <h2 className="text-[20px] font-[700] mb-[20px]">Qayta aloqa</h2>
            <button
              className="bg-gray-200 rounded-[50%] p-1 absolute right-2 top-2"
              onClick={handleModalClose}
            >
              <ClearIcon />
            </button>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email:
                </label> */}
                <input
                  placeholder="Elektron pochta"
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full outline-none bg-[#fafafa] border border-[#EEF0F0] rounded-[12px] text-[16px] font-[500] h-[44px] mb-[12px] pl-[15px] focus:border-red-500"
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone:
                </label> */}
                <input
                  placeholder="Telefon raqam"
                  autoComplete="off"
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full outline-none bg-[#fafafa] border border-[#EEF0F0] rounded-[12px] text-[16px] font-[500] h-[44px] mb-[12px] pl-[15px] focus:border-red-500"
                />
              </div>
              <div className="mb-2">
                {/* <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message:
                </label> */}
                <input
                  placeholder="Xabar matni"
                  autoComplete="off"
                  type="text"
                  id="message"
                  name="message"
                  required
                  className="w-full outline-none flex text-start bg-[#fafafa] border border-[#EEF0F0] rounded-[12px] text-[16px] font-[500] py-[10px] pb-[120px] pr-[10px] mb-[12px] pl-[15px] focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 rounded-[12px] text-[16px] font-[500] h-[48px] mt-[4px] outline-none text-white"
              >
                Jo'natish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactShare;

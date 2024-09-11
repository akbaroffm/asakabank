import React, { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Header/Navbar/Navbar';
import Vacancies from './pages/Vacancies/Vacancies';
import Digital from './pages/Digital/Digital';
import Career from './pages/Career/Career';
import Blog from './pages/Blog/Blog';
import AboutBank from './pages/AboutBank/AboutBank';
import Footer from './components/Footer/Footer';
import SingleVacancy from './pages/Vacancies/SingleVacancies/SingleVacancies';
import './components/i18n';
import Home from './pages/Home/Home';
import BlogDetail from './pages/Home/BlogDetail';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import ContactShare from './components/Contact/Contact';

function App() {
  const [language, setLanguage] = useState('uz');
  const [showContactShare, setShowContactShare] = useState(true);

  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setShowContactShare(footerTop > windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      <div className="md:pt-[60px] pt-[45px]">
        <Navbar />
      </div>
      <main className="flex-grow">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/vacancies"
            element={<Vacancies language={language} />}
          />
          <Route path="/vacancies/:slug" element={<SingleVacancy />} />
          <Route path="/digital" element={<Digital />} />
          <Route path="/career" element={<Career />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/about" element={<AboutBank />} />
        </Routes>
      </main>
      <Footer ref={footerRef} />
      {showContactShare && <ContactShare />}
    </div>
  );
}

export default App;

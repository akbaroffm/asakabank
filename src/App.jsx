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
import { useState } from 'react';
import Home from './pages/Home/Home';

function App() {
  const [language, setLanguage] = useState('uz'); // Default language
  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:py-[12px]">
        <Navbar />
      </div>
      <main className="flex-grow">
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
          <Route path="/about" element={<AboutBank />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

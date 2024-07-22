import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Header/Navbar/Navbar';
import Vacancies from './pages/Vacancies/Vacancies';
import Digital from './pages/Digital/Digital';
import Career from './pages/Career/Career';
import Blog from './pages/Blog/Blog';
import AboutBank from './pages/AboutBank/AboutBank';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-[16px]">
        <Navbar />
      </div>
      <main className="flex-grow">
        <Routes>
          <Route path="/vacancies" element={<Vacancies />} />
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

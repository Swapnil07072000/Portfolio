import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Navbar from './pages/NavBar';
import DayTime from './pages/DayTime';
import DayNightCycle from './pages/DayNightCycle';
import Copyright from './pages/CopyRight';
import NotFound from './pages/NotFound';
import ExperienceTimeline from './pages/ExperienceTimeline';
import EducationTimeline from './pages/EducationTimeline';
import './index.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <BrowserRouter basename="/Portfolio">
        <DayNightCycle />
        <Navbar />
        <DayTime />

        <main className="flex-grow overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/experience" element={<ExperienceTimeline />} />
            <Route path="/education" element={<EducationTimeline />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Copyright />
      </BrowserRouter>
    </div>
  );
}

export default App;

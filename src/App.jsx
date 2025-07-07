import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import About from './pages/About';
import Projects from './pages/Projects';
import Navbar from './pages/NavBar';
import DayTime from './pages/DayTime';
import DayNightCycle from './pages/DayNightCycle';
import Copyright from './pages/CopyRight';
import './index.css'
function App(){
    return (<>
        <BrowserRouter>
            <DayNightCycle />
            <Navbar />
            <DayTime />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Projects />} />
            </Routes>
            <Copyright />
        </BrowserRouter>
    </>);
}

export default App;
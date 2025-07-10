import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h3 className="text-5xl font-bold mb-2 text-white drop-shadow-[0_0_2px_black]">Hi, I'm Swapnil Pawar</h3>
        <h4 className="text-2xl font-medium text-white drop-shadow-[0_0_2px_black]">Welcome to my Portfolio.</h4>
        <h4 className="text-yellow-300 font-semibold">I am into Web Development | DSA | Machine Learning </h4>
        <div className="mt-6 flex justify-center">
          <a
            href="https://www.linkedin.com/in/swapnil-pawar-07/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-600 transition-colors duration-300 text-4xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;

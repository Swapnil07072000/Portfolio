import React from 'react';
import myImage from '../assets/images/my_image.png';

function About() {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      {/* Text Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:p-12 text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-[0_0_2px_black]">
          About Me
        </h1>
        <p className="text-base sm:text-lg leading-relaxed text-white drop-shadow-[0_0_2px_black]">
          Hi! I’m Swapnil Pawar, a passionate developer into Web Development, DSA, and Machine Learning.
          I enjoy building scalable, efficient applications and solving complex problems.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-6">
        <div className="rounded-xl shadow-lg overflow-hidden border border-white/10 bg-white/5 p-2">
          <img
            src={myImage}
            alt="About me"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default About;

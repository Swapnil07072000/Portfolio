import React from 'react';
import myImage from '../assets/images/my_image.png';

function About() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen text-white">
      {/* Left side - Info */}
      <div className="md:w-1/2 flex flex-col justify-center p-8 bg-transparent">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
          About Me
        </h1>
        <p className="text-lg leading-relaxed drop-shadow-md">
          Hi! I’m Swapnil Pawar, a passionate developer into Web Development, DSA, and Machine Learning.
          I enjoy building scalable, efficient applications and solving complex problems.
        </p>
      </div>

      {/* Right side - Image */}
      <div className="md:w-1/2 bg-transparent">
        <img
          src={myImage}
          alt="About me"
          className="w-full h-full object-cover opacity-90" // slight transparency if you want
        />
      </div>
    </div>
  );
}

export default About;

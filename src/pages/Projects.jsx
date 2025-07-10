import React from 'react';
import project1Img from '../assets/images/Project1.jpg';
import project2Img from '../assets/images/Project2.jpg';
import project3Img from '../assets/images/Project3.png';

const projects = [
  {
    title: "Space Invader Game (Space Battle Game)",
    description: "Game which we can increase the points on taking down the enemy space ships.",
    tech: ["Python", "pygame"],
    image: project1Img,
    liveLink: "",
    github: "https://github.com/Swapnil07072000/Space-Invader-Game-Space-Battle-Game-",
  },
  {
    title: "Chat Application",
    description: "Good Chat Application with instant real time messaging.",
    tech: ["socket.io", "Express JS", "MongoDB", "Mongoose"],
    image: project2Img,
    liveLink: "",
    github: "https://github.com/Swapnil07072000/Chat-Application",
  },
  {
    title: "Handwritten Text Prediction (Working)",
    description: "Any written text on paper cursive included are predicted with system.",
    tech: ["tensorflow", "pandas", "image processing", "python"],
    image: project3Img,
    liveLink: "",
    github: "",
  }
];

function Projects() {
  return (
    <section className="py-12 bg-transparent text-white min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
     <div className="max-w-6xl mx-auto grid gap-8 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(({ title, description, tech, image, liveLink, github }, idx) => (
          <div
            key={idx}
            className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-300 mb-3">{description}</p>
              <div className="mb-3">
                {tech.map((t, i) => (
                  <span
                    key={i}
                    className="inline-block bg-yellow-500 text-gray-900 text-xs font-semibold mr-2 px-2 py-1 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                {liveLink && (
                  <a
                    href={liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;

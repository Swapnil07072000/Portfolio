import React from "react";

const educationData = [
  {
    degree: "Master of Science in Information Technology (MSc-IT)",
    institution: "ML Dahanukar College, Mumbai",
    university: "University of Mumbai",
    location: "Mumbai, India",
    duration: "2021 – 2023",
  },
  {
    degree: "Bachelor of Science in Information Technology (BSc-IT)",
    institution: "ML Dahanukar College, Mumbai",
    university: "University of Mumbai",
    location: "Mumbai, India",
    duration: "2018 – 2021",
  },
];

const EducationTimeline = () => {
  return (
    <section className="py-12 text-white drop-shadow-[0_0_2px_black]">
      <h2 className="text-3xl font-bold text-center mb-10">Education</h2>

      <div className="max-w-4xl mx-auto border-l-2 border-white px-4 sm:px-6">
        {educationData.map((edu, idx) => (
          <div key={idx} className="relative pl-8 mb-10">
            {/* Timeline Dot */}
            <div className="absolute -left-1.5 top-2.5 w-3 h-3 bg-black rounded-full border border-white" />

            {/* Boxed Degree Info */}
            <div className="bg-gray-800 bg-opacity-70 rounded-lg p-5 shadow-md">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-semibold text-yellow-400">{edu.degree}</h3>
                <span className="text-sm text-gray-400">{edu.duration}</span>
              </div>
              <p className="text-gray-300">{edu.institution}</p>
              <p className="text-sm text-white italic mb-2">{edu.university}</p>
              <p className="text-sm text-gray-400 italic">{edu.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationTimeline;

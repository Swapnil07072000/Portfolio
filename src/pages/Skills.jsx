import React from "react";

const skillCategories = [
  {
    title: "🧠 Languages",
    skills: ["JavaScript", "Python", "C++", "PHP"],
  },
  {
    title: "⚛️ Frameworks / Libraries",
    skills: ["React", "Node.js", "Express", "Tailwind CSS", "Laravel", "CodeIgniter"],
  },
  {
    title: "🗄️ Databases",
    skills: ["MySQL", "MongoDB"],
  },
  {
    title: "☁️ Deployment & DevOps",
    skills: [ "Docker", "Kubernetes"],
  },
  {
    title: "🛠️ Tools & Platforms",
    skills: ["VS Code", "Git", "Postman", "Linux", "Windows 10"],
  },
  {
    title: "⚡ Caching",
    skills: ["Redis"],
  },
];

function Skills() {
  return (
    <section className="px-6 py-12 md:py-16 bg-gradient-to-b from-black/10 to-black/30 drop-shadow-[0_0_2px_black]  rounded-xl">
      <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white drop-shadow-md">
        💼 My Skills
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {skillCategories.map((category, i) => (
          <div
            key={i}
            className="p-6 bg-white/10 rounded-2xl shadow hover:shadow-lg transition duration-300 border border-white/10"
          >
            <h3 className="text-xl font-semibold mb-4 text-white/90">
              {category.title}
            </h3>
            <ul className="space-y-2 text-white/80 text-sm sm:text-base">
              {category.skills.map((skill, j) => (
                <li
                  key={j}
                  className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-white/60"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;

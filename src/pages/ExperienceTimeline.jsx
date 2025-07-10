import React from "react";

const experiences = [
  {
    company: "Convergence Services",
    location: "Mumbai, India",
    roles: [
      {
        position: "Software Developer",
        duration: "May 2025 – Present",
        roleType: "Full-Time",
        description:
          "Handling client side requirement's, BRD to production",
        tech: ["PHP", "JavaScript", "MySQL", "jQuery", "Git"],
      },
      {
        position: "Jr. PHP Developer",
        duration: "Jul 2023 – May-2025",
        roleType: "Full-Time",
        description:
          "Worked on core product and contributed feature to the core. Core uKnowva HRMS.",
        tech: ["PHP", "JavaScript", "MySQL", "jQuery", "Git"],
      },
    ],
  },
  {
    company: "XLNC Technologies",
    location: "Mumbai, India",
    roles: [
      {
        position: "Software Engineer",
        duration: "Jan 2022 – Aug 2022",
        roleType: "Internship",
        description:
          "Built full-stack apps and worked on chat-app",
        tech: ["RPA", "UIPath", "Automation Anywhere"],
      },
    ],
  },
  {
    company: "Towards Technology",
    location: "Mumbai, India",
    roles: [
      {
        position: "Jr. Web Developer",
        duration: "Jun 2021 – Dec 2021",
        roleType: "Internship",
        description:
          "Built full-stack apps and worked on chat-app",
        tech: ["PHP", "Laravel", "CodeIgniter", "JavaScript", "MySQL"],
      },
    ],
  },
];

const ExperienceTimeline = () => {
  return (
    <section className="py-12 text-white drop-shadow-[0_0_2px_black]">
      <h2 className="text-3xl font-bold text-center mb-10">Professional Experience</h2>

      <div className="max-w-4xl mx-auto border-l-2 border-white-500 px-4 sm:px-6">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative pl-8 mb-10">
            {/* Timeline Dot */}
            <div className="absolute -left-1.5 top-2.5 w-3 h-3 bg-black rounded-full border border-white" />

            <h3 className="text-xl font-semibold text-yellow-400 mb-1">{exp.company}</h3>
            <p className="text-sm text-white  italic mb-3">{exp.location}</p>

            <div className="space-y-6">
              {exp.roles.map((role, i) => (
                <div
                  key={i}
                  className="bg-gray-800 bg-opacity-70 rounded-lg p-5 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-lg font-semibold">{role.position}</h4>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          role.roleType === "Internship"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {role.roleType}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 mt-1 sm:mt-0">
                      {role.duration}
                    </span>
                  </div>

                  <p className="text-gray-200 mt-2">{role.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {role.tech.map((t, j) => (
                      <span
                        key={j}
                        className="bg-yellow-500 text-gray-900 text-xs px-2 py-1 rounded font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;

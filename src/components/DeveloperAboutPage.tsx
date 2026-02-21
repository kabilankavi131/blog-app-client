import React from "react";
import { useNavigate } from "react-router-dom";

const DeveloperAboutPage: React.FC = () => {
  const navigate = useNavigate();
  const portfolioProjects = [
    {
      title: "Blog Space",
      description:
        "A full-featured blogging platform with curated feeds, authentication, and reader-focused UI.",
      stack: ["React", "TypeScript", "Firebase"],
      link: "/home",
      linkLabel: "Explore App",
    },
    {
      title: "Developer Toolkit",
      description:
        "A utility-first set of components and reusable hooks for rapidly building polished interfaces.",
      stack: ["React Hooks", "REST APIs", "Testing"],
      link: "https://github.com/kabilankavi131",
      linkLabel: "View Code",
    },
    {
      title: "AI Learning Notes",
      description:
        "A growing knowledge base where I share practical machine learning experiments and outcomes.",
      stack: ["Python", "Data Science", "Visualization"],
      link: "https://www.linkedin.com/in/kabilankavi131",
      linkLabel: "Follow Journey",
    },
  ];

  return (
    <div className="about-page">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="var(--primary-text)"
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        onClick={() => navigate("/home")}
      >
        <g>
          <g>
            <g>
              <path d="M490.667,234.667H158.17l112.915-112.915c8.331-8.331,8.331-21.839,0-30.17s-21.839-8.331-30.17,0L91.582,240.915     c-0.497,0.497-0.967,1.02-1.413,1.563c-0.202,0.246-0.378,0.506-0.568,0.759c-0.228,0.304-0.463,0.601-0.674,0.917     c-0.203,0.303-0.379,0.618-0.564,0.929c-0.171,0.286-0.351,0.566-0.509,0.861c-0.169,0.317-0.313,0.643-0.465,0.966     c-0.145,0.308-0.299,0.611-0.43,0.926c-0.13,0.314-0.235,0.635-0.349,0.953c-0.122,0.338-0.251,0.672-0.356,1.018     c-0.096,0.318-0.167,0.642-0.248,0.963c-0.089,0.353-0.188,0.702-0.259,1.061c-0.074,0.372-0.117,0.747-0.171,1.122     c-0.045,0.314-0.105,0.623-0.136,0.941c-0.068,0.693-0.105,1.388-0.105,2.083c0,0.007-0.001,0.015-0.001,0.022     s0.001,0.015,0.001,0.022c0.001,0.695,0.037,1.39,0.105,2.083c0.031,0.318,0.091,0.627,0.136,0.941     c0.054,0.375,0.097,0.75,0.171,1.122c0.071,0.36,0.17,0.708,0.259,1.061c0.081,0.322,0.151,0.645,0.248,0.963     c0.105,0.346,0.234,0.68,0.356,1.018c0.114,0.318,0.219,0.639,0.349,0.953c0.131,0.316,0.284,0.618,0.43,0.926     c0.152,0.323,0.296,0.649,0.465,0.966c0.158,0.295,0.338,0.575,0.509,0.861c0.186,0.311,0.361,0.626,0.564,0.929     c0.211,0.316,0.447,0.613,0.674,0.917c0.19,0.253,0.365,0.513,0.568,0.759c0.446,0.544,0.916,1.067,1.413,1.563l149.333,149.333     c8.331,8.331,21.839,8.331,30.17,0s8.331-21.839,0-30.17L158.17,277.333h332.497c11.782,0,21.333-9.551,21.333-21.333     S502.449,234.667,490.667,234.667z" />
              <path d="M21.333,85.333C9.551,85.333,0,94.885,0,106.667v298.667c0,11.782,9.551,21.333,21.333,21.333     c11.782,0,21.333-9.551,21.333-21.333V106.667C42.667,94.885,33.115,85.333,21.333,85.333z" />
            </g>
          </g>
        </g>
      </svg>
      {/* Header Section */}
      <header className="about-header">
        <h1>About Me</h1>
        <p>
          Welcome to my blog application! Here, I combine my passion for coding,
          web development, and sharing knowledge to create an engaging platform
          for readers and tech enthusiasts alike.
        </p>
      </header>

      {/* Main Content Section */}
      <main>
        <section className="about-section">
          <h2>Who Am I?</h2>
          <div className="about-card">
            <p>
              My name is <span className="highlight">Kabilan K</span>, a
              4th-year student at KIT - Kalaignar Karunanidhi Institute of
              Technology, Coimbatore, specializing in Artificial Intelligence &
              Data Science. I am passionate about coding, web development, and
              exploring the latest technologies. My journey into tech has been
              driven by curiosity and a love for creating impactful solutions.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>My Blog App</h2>
          <div className="about-card">
            <p>
              This blog app is designed to provide a seamless reading
              experience, with features like dynamic content, responsive design,
              and user-friendly navigation. It showcases my skills in modern web
              technologies like{" "}
              <span className="highlight">
                React, TypeScript, PostgreSQL, MySQL, Node.js and Firebase
              </span>
              . Whether you're here for tech articles or tutorials, my aim is to
              deliver quality content and insights.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>Skills & Tools</h2>
          <div className="skills-grid">
            {[
              "HTML",
              "CSS",
              "JavaScript",
              "TypeScript",
              "React",
              "Node.js",
              "PostgreSQL",
              "MySQL",
              "Firebase",
              "REST APIs",
              "Git",
              "Python",
            ].map((skill, index) => (
              <div key={index} className="skill-item">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2>Get in Touch</h2>
          <div className="about-card">
            <p>
              I'm always open to collaboration, learning, and discussing new
              opportunities. Feel free to reach out via the links below:
            </p>
            <div className="contact-links">
              <a
                href="https://www.linkedin.com/in/kabilankavi131"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1pi2lzz"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="LinkedInIcon"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                </svg>
              </a>
              <a href="mailto:kabilankavi131@gmail.com">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g id="style=linear">
                    <g id="email">
                      <path
                        id="vector"
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="transparent"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        id="vector_2"
                        d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
                        stroke="var(--border-color)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                    </g>
                  </g>
                </svg>
              </a>
              <a
                href="https://github.com/kabilankavi131"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <svg
                  width="30px"
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1pi2lzz"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="GitHubIcon"
                >
                  <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <section className="about-section portfolio-section">
          <h2>My Portfolio</h2>
          <p className="portfolio-intro">
            Here are a few projects that represent my design taste, engineering
            depth, and constant focus on delightful user experiences.
          </p>
          <div className="portfolio-grid">
            {portfolioProjects.map((project) => (
              <article key={project.title} className="portfolio-card">
                <div className="portfolio-glow"></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="portfolio-tags">
                  {project.stack.map((item) => (
                    <span key={`${project.title}-${item}`}>{item}</span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="portfolio-link"
                  target={project.link.startsWith("http") ? "_blank" : "_self"}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {project.linkLabel}
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} Kabilan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeveloperAboutPage;

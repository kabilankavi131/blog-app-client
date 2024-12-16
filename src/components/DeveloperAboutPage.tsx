import React from "react";
import { useNavigate } from "react-router-dom";

const DeveloperAboutPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <div
        onClick={() => navigate("/")}
        style={{
          width: "50px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor: "skyblue",
          cursor: "pointer",
        }}
      >
        Back
      </div>
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
                React, TypeScript, PostgreSQL, MySQL, and Node.js
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
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:your.email@example.com">Email</a>
              <a
                href="https://github.com/your-github-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="about-footer">
        <p>&copy; 2024 Kabilan K. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeveloperAboutPage;

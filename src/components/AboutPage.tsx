import React from "react";
import { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

// Define the props interface if the About section will accept any props.
interface AboutProps {
  appName: string;
  features: string[];
  technologies: string[];
}

const About: React.FC<AboutProps> = ({ appName, features, technologies }) => {
  const navigateTo = useNavigate();
  return (
    <section className="about-section" style={styles.section}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="var(--primary-text)"
        height="30px"
        width="30px"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 512 512"
        onClick={() => navigateTo("/home")}
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
      <div style={styles.container}>
        <h1 style={styles.heading}>About {appName}</h1>
        <p style={styles.paragraph}>
          Welcome to <strong>{appName}</strong>, your go-to platform for sharing
          and discovering insightful blogs. Our app is designed to provide a
          seamless and user-friendly experience for both writers and readers.
          Whether you want to share your thoughts with the world or explore
          content from diverse perspectives, {appName} is the perfect place for
          you.
        </p>

        <h2 style={styles.subheading}>Key Features</h2>
        <ul style={styles.list}>
          {features.map((feature, index) => (
            <li key={index} style={styles.listItem}>
              {feature}
            </li>
          ))}
        </ul>

        <h2 style={styles.subheading}>Technologies Used</h2>
        <ul style={styles.list}>
          {technologies.map((tech, index) => (
            <li key={index} style={styles.listItem}>
              {tech}
            </li>
          ))}
        </ul>

        <p style={styles.paragraph}>
          Our mission is to empower individuals to express themselves and
          connect with a community of like-minded enthusiasts. Start your
          journey today and let your ideas make an impact!
        </p>
      </div>
    </section>
  );
};

// Inline styles for the component
const styles: Record<string, CSSProperties> = {
  section: {
    padding: "2rem",
    backgroundColor: "var(--background)",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "var(--primary-text)",
  },
  subheading: {
    fontSize: "1.75rem",
    margin: "1.5rem 0 1rem",
    color: "var(--primary-text)",
  },
  paragraph: {
    fontSize: "1rem",
    color: "var(--primary-text)",
    lineHeight: "1.6",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "1.5rem",
    textAlign: "left",
  },
  listItem: {
    fontSize: "1rem",
    color: "var(--primary-text)",
    marginBottom: "0.5rem",
  },
};

export default About;

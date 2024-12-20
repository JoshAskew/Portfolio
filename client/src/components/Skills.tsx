import { useEffect, useState } from "react";
import { Text, Box } from "@chakra-ui/react";

const skills = [
  "ReactJS",
  "Node.js & Express",
  "MongoDB & SQL",
  "GraphQL",
  "Next.js",
  "JSON",
  "TypeScript",
  "RESTful APIs",
  "Authentication",
  "Python",
  "Version Control",
  "Web Design & UX/UI",
  "Responsive Design",
  "Testing & Debugging",
  "Agile Methodologies",
];

const SkillsSection = () => {
  const [opacities, setOpacities] = useState<number[]>([]);
  const baseOpacity = 0.2; // Minimum opacity for visibility

  useEffect(() => {
    const handleScroll = () => {
      const skillElements = document.querySelectorAll<HTMLDivElement>(".skill-text");
      const updatedOpacities = Array.from(skillElements).map((el) => {
        const rect = el.getBoundingClientRect();
        const fadeStart = window.innerHeight * 0.6; // Start fading in
        const fadeEnd = window.innerHeight * 0.001; // Start fading out

        if (rect.top < fadeEnd || rect.bottom > fadeStart) {
          return baseOpacity; // Set to minimum visibility when out of range
        } else {
          const opacity = (rect.top - fadeEnd) / (fadeStart - fadeEnd);
          return Math.max(baseOpacity, Math.min(opacity, 1)); // Clamp between baseOpacity and 1
        }
      });
      setOpacities(updatedOpacities);
    };

    handleScroll(); // Initial check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      {skills.map((skill, index) => (
        <Text
          key={index}
          className="skill-text"
          fontSize="32px"
          fontWeight="extrabold"
          lineHeight="1.4"
          fontFamily="Lato, sans-serif"
          textAlign="left"
          color="transparent"
          background="white"
          backgroundClip="text"
          opacity={opacities[index] || baseOpacity}
          transition="opacity 0.4s ease"
        >
          {skill}
        </Text>
      ))}
    </Box>
  );
};

export default SkillsSection;

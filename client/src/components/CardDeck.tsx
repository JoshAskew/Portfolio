import { Box, Flex, Text, Image, Link, Button } from '@chakra-ui/react';
import { useState } from 'react';
import TriviaTitans from "../images/trivia-titans-logo.png"; 
import Aline from "../images/alineold.webp"; 
import Cypress from "../images/cypress.png"; 
import BookSearch from "../images/booksearch.png"; 
import Skull from "../images/Skull-tune-forge.png"; 
import Candidate from "../images/Candidate.png";
import Employee from "../images/Employee.png";
import Readme from '../images/readme.png';

const images = [
  TriviaTitans,
  Aline,
  Cypress,
  BookSearch,
  Skull,
  Candidate,
  Readme,
  Employee,
];

const gitHubLinks = [
  'https://github.com/kyand38/Trivia-Titans',
  'https://github.com/JoshAskew/Aline-Events',
  'https://github.com/JoshAskew/CI-CD-Setup',
  'https://github.com/JoshAskew/Book-Search-Engine',
  'https://github.com/JoshAskew/TuneForge',
  'https://github.com/JoshAskew/Candidate-Finder',
  'https://github.com/JoshAskew/README-Generator',
  'https://github.com/JoshAskew/Employee-Tracker',
];

const deployedLinks = [
  'https://trivia-titans.onrender.com/',
  'https://aline-events.onrender.com/',
  'https://drive.google.com/file/d/1dStDaVlv8MsPqQEgRrCM4VF6fS5d1l3F/view?usp=sharing',
  'https://book-search-engine-1m61.onrender.com/',
  'https://yahye-mohamed101.github.io/TuneForge/',
  'https://candidate-finder.onrender.com/',
  'https://drive.google.com/file/d/17jJPLocSZPg2-Nmu7JCSovt07bV2Yt0O/view?usp=sharing',
  'https://drive.google.com/file/d/1yquAxd2P-zdMhfMQ_Fr8S1LJSVSJ1pHz/view?usp=sharing',
];

const Card = ({
  image,
  gitHubLink,
  deployedLink,
  description,
  details,
  onExpand,
  expanded,
}: {
  image: string;
  gitHubLink: string;
  deployedLink: string;
  description: string;
  details: string;
  onExpand: () => void;
  expanded: boolean;
}) => {
  return (
    <Box
      w="250px"
      minHeight="400px" 
      position="relative"
      overflow="hidden"
      boxShadow="lg"
      background="#1a1a1a"
      border="1px solid white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="all 0.6s ease-in-out"
      transform={expanded ? 'translateY(-100px)' : 'translateY(0)'}
      _hover={!expanded ? { transform: "scale(1.05)" } : undefined}
    >
      {/* Front Side */}
      {!expanded && (
        <>
          <Box borderBottom="1px solid white" w="100%">
            <Image src={image} alt="Project Image" w="100%" h="150px" objectFit="cover" />
          </Box>
          <Box p={4} textAlign="center" flexGrow={1}>
            <Text fontWeight="bold" fontSize="lg" mb={2} color="white" fontFamily={"Lato, sans-serif"}>
              {description}
            </Text>
          </Box>
          <Flex justify="center" gap={4} p={4}>
            <Button onClick={onExpand} color="white" variant="outline" fontFamily={"Lato, sans-serif"} backgroundColor="#242424">
              More Details
            </Button>
          </Flex>
        </>
      )}

      {/* Expanded View */}
      {expanded && (
        <Box p={6} 
        textAlign="center" 
        color="white" 
        fontFamily={"Lato, sans-serif"}
        height="100%" 
        display="flex" 
        flexDirection="column"
        backgroundColor="#242424"
          >
          <Text fontSize="18px" fontWeight="bold">{description}</Text>
          <Box
            mt={4}
            overflowY="auto"
            maxHeight="200px" // Add a max height to limit the scrollable area
            flexGrow={1} // This will allow the content to expand and take remaining space
          >
            <Text
              fontSize="14px"
              textAlign="left"
              fontFamily={"Lato, sans-serif"}
            >{details}</Text>
          </Box>
          <Flex justify="center" gap={4} mt={6}>
            <Link href={gitHubLink} target="_blank" color="white" fontWeight="bold">
              GitHub
            </Link>
            <Link href={deployedLink} target="_blank" color="white" fontWeight="bold">
              Live Demo
            </Link>
          </Flex>
          <Button onClick={onExpand} mt={6} color="white" variant="outline" border="1px solid #1a1a1a" fontFamily={"Lato, sans-serif"}>
            Close
          </Button>
        </Box>
      )}
    </Box>
  );
};


const Deck = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const descriptions = [
    'Trivia Titans: A trivia game for all knowledge enthusiasts.',
    'Aline Events: Manage your events with ease.',
    'CI/CD Setup: Automate your development pipeline.',
    'Book Search Engine: Find and save your favorite books.',
    'TuneForge: A platform for music creation.',
    'Candidate Finder: Discover candidates effortlessly.',
    'README Generator: Create professional READMEs.',
    'Employee Tracker: Manage your employees with ease.',
  ];

  const details = [
    'This project is a trivia game that allows users to test their knowledge in a variety of categories. Users can sign up and login if they wish to track their scores. The game features a leaderboard that displays the top players. The project was built using a MERN stack along with other complimenting programs.',
    'Aline Events is a full-stack application that allows users to create and manage events. Users can sign up and login to create events, view events, and save events to their profile. The project was built using a MERN stack along with other complimenting programs like Chakra UI. The project features 2 different API calls for ticket data and weather data to help plant outtings accordingly.',
    'This project is a demonstration of a CI/CD setup using Cypress. The project is a simple React application that is deployed to Render. The CI/CD pipeline is set up to run tests on each push to the main branch and deploy the application to Render on each push to the main branch if the testing is successful.',
    'This project is a book search engine that allows users to search for books and save them to their profile. The project was built using a MERN stack along with other complimenting programs like Apollo Server and GraphQL. The project features a search bar that allows users to search for books by title or author.',
    'This was my first group project. We created a playlist organizer that allows users to create playlists by pulling the url from whatever music platform they use.',
    'This project is a candidate finder that allows users to search for candidates that have set their settings in GitHub to looking for work. The users can login and save candidates to their profile.',
    'This project is a README generator that allows users to create professional READMEs for their projects. The project was built using Node.js and Inquirer. The project features a series of prompts that the user can answer to generate a README file.',
    'This project is an employee tracker that allows users to manage their employees. The project was built using Node.js and Inquirer. The project features a series of prompts that the user can answer to view, add, update, and delete employees, roles, and departments.',
  ];

  return (
    <Box w="100%" h="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Text fontFamily={"Lato, sans-serif"}>SOME LIVE DEMOS MAY TAKE UP TO 2 MINUTES TO SPIN BACK UP</Text>
      <Flex wrap="wrap" justify="center" gap={6} p={4}>
        {images.map((image, i) => (
          <Card
            key={i}
            image={image}
            gitHubLink={gitHubLinks[i]}
            deployedLink={deployedLinks[i]}
            description={descriptions[i]}
            details={details[i]}
            onExpand={() => setExpandedIndex(expandedIndex === i ? null : i)}
            expanded={expandedIndex === i}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Deck;

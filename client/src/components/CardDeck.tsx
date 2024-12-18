import { Box, Flex, Text, Image, Link } from '@chakra-ui/react';
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
}: {
  image: string;
  gitHubLink: string;
  deployedLink: string;
  description: string;
}) => {
  return (
    <Box
      w="250px"
      h="400px"
      borderRadius="3px"
      overflow="hidden"
      boxShadow="lg"
      background="#1a1a1a"
      border="1px solid white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between" // Space out content
      _hover={{ transform: "scale(1.05)", transition: "0.7s" }}
    >
      {/* Image */}
      <Image src={image} alt="Project Image" w="100%" h="150px" objectFit="cover" />

      {/* Description */}
      <Box p={4} textAlign="center" flexGrow={1}>
        <Text fontWeight="bold" fontSize="lg" mb={2} color="white" fontFamily={"Lato, sans-serif"}>
          {description}
        </Text>
      </Box>

      {/* Links */}
      <Flex justify="center" gap={4} p={4} >
        <Link href={gitHubLink} target="_blank" color="white" fontWeight="bold" fontFamily={"Lato, sans-serif"}>
          GitHub -
        </Link>
        <Link href={deployedLink} target="_blank" color="white" fontWeight="bold" fontFamily={"Lato, sans-serif"}>
          Live Demo -
        </Link>
      </Flex>
    </Box>
  );
};



const Deck = () => {
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

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
      
    >
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        position="relative"
        direction={{ base: 'column', md: 'row' }}
        p={4}
      >
        {images.map((image, i) => (
          <Card
            key={i}
            image={image}
            gitHubLink={gitHubLinks[i]}
            deployedLink={deployedLinks[i]}
            description={descriptions[i]}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Deck;

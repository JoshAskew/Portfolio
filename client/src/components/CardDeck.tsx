import { useState } from 'react';
import { Box, Flex, Button, Link, Image } from '@chakra-ui/react';
import gsap from 'gsap'; // Import GSAP
import Github from "../images/Github.png"; 
import Linked from "../images/link.png"; 
import TriviaTitans from "../images/trivia-titans-logo.png"; 
import Aline from "../images/alineold.webp"; 
import Cypress from "../images/cypress.png"; 
import BookSearch from "../images/booksearch.png"; 
import Skull from "../images/skull-tune-forge.png"; 
import LeftArrow from "../images/leftchevron.png"; 
import RightArrow from "../images/chevronright.png"; 
import Candidate from "../images/candidate.png";


// Sample image URLs for the backgrounds
const backgrounds = [
  `url(${TriviaTitans})`, // Image 1
  `url(${Aline})`, // Image 2
  `url(${Cypress})`, // Image 3
  `url(${BookSearch})`, // Image 4
  `url(${Skull})`, // Image 5
  `url(${Candidate})`, // Image 6
  'url(https://via.placeholder.com/250x350/FF5733/FFFFFF?text=Card+7)', // Image 7
  'url(https://via.placeholder.com/250x350/33FF57/FFFFFF?text=Card+8)', // Image 8
  'url(https://via.placeholder.com/250x350/3357FF/FFFFFF?text=Card+9)', // Image 9
  'url(https://via.placeholder.com/250x350/FF5733/FFFFFF?text=Card+10)', // Image 10
];

// GitHub links for each card
const gitHubLinks = [
  'https://github.com/kyand38/Trivia-Titans', 
  'https://github.com/JoshAskew/Aline-Events',
  'https://github.com/JoshAskew/CI-CD-Setup', 
  'https://github.com/JoshAskew/Book-Search-Engine', 
  'https://github.com/JoshAskew/TuneForge', 
  'https://github.com/JoshAskew/Candidate-Finder',
  'https://github.com/user/project7',
  'https://github.com/user/project8',
  'https://github.com/user/project9',
  'https://github.com/user/project10',
];

// Deployed links for each card
const deployedLinks = [
  'https://trivia-titans.onrender.com/', 
  'https://aline-events.onrender.com/', 
  'https://github.com/JoshAskew/CI-CD-Setup', 
  'https://book-search-engine-1m61.onrender.com/', 
  'https://yahye-mohamed101.github.io/TuneForge/', 
  'https://candidate-finder.onrender.com/',
  'https://user.github.io/project7',
  'https://user.github.io/project8',
  'https://user.github.io/project9',
  'https://user.github.io/project10',
];

const Card = ({ isVisible, offset, background, gitHubLink, deployedLink }: { content: string, isVisible: boolean, offset: number, background: string, gitHubLink: string, deployedLink: string }) => (
  <Flex
    align="center"
    justify="center"
    borderRadius="lg"
    boxShadow="lg"
    background={background}
    backgroundColor="rgba(255, 255, 255, 0.9)"    
    backgroundSize="contain"
    backgroundPosition="center" 
    backgroundRepeat="no-repeat" 
    color="#white"
    w="250px"
    h="350px"
    textAlign="center"
    fontSize="lg"
    fontWeight="bold"
    transformStyle="preserve-3d"
    transition="transform 0.6s, opacity 0.6s"
    opacity={isVisible ? 1 : 0.4}
    position="absolute"
    top={`${offset * 10}px`}
    zIndex={isVisible ? 10 : 5}
    direction="column"
    justifyContent="space-between"
    p={4}
    transform={`rotate(${isVisible ? 0 : Math.random() * 20 - 10}deg) scale(${isVisible ? 1 : 0.8})`} 
  >
    <Box position="absolute" bottom="10px" width="100%" display="flex" justifyContent="space-between" px={4}>
      <Link href={gitHubLink}>
        <Button
          size="sm"
          variant="ghost"
          p={0}
          _hover={{
            backgroundColor: 'transparent',
            transform: 'scale(1.3)',
            transition: 'transform 0.2s ease-in-out'
          }}
          _active={{ backgroundColor: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
        >
          <Image src={Github} alt="GitHub" boxSize="40px" />
        </Button>
      </Link>
      <Link href={deployedLink}>
        <Button
          size="sm"
          variant="ghost"
          p={0}
          _hover={{
            backgroundColor: 'transparent',
            transform: 'scale(1.3)',
            transition: 'transform 0.2s ease-in-out'
          }}
          _active={{ backgroundColor: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
        >
          <Image src={Linked} alt="Link" boxSize="40px" />
        </Button>
      </Link>
    </Box>
  </Flex>
);

const Deck = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = Array.from({ length: 6 }).map((_, i) => `Card ${i + 1}`);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    animateButton('next'); // Trigger the bounce animation for the next button
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    animateButton('prev'); // Trigger the bounce animation for the prev button
  };

  const animateButton = (direction: string) => {
    const button = direction === 'next' ? document.getElementById('next-button') : document.getElementById('prev-button');
    
    gsap.fromTo(button, 
      { y: 0 }, 
      { 
        y: -100, 
        duration: 0.2, 
        ease: 'bounce.out', 
        yoyo: true, 
        repeat: 1 
      });
  };

  return (
    <Box
      w="100%"
      h="100vh"
      marginTop={-40}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      position="relative"
    >

      <Box position="relative" h="350px" w="250px">
        {cards.map((content, i) => {
          const isVisible = i === currentIndex; 
          const offset = Math.abs(i - currentIndex);
          const background = backgrounds[i % backgrounds.length];
          const gitHubLink = gitHubLinks[i];
          const deployedLink = deployedLinks[i];

          return (
            <Card
              key={i}
              content={content}
              isVisible={isVisible}
              offset={offset}
              background={background}
              gitHubLink={gitHubLink}
              deployedLink={deployedLink}
            />
          );
        })}
      </Box>

      <Button
        id="prev-button"
        zIndex={5}
        onClick={prevCard}
        size="lg"
        variant="ghost"
        position="absolute"
        left="25%"
        top="50%"
        _hover={{
          background: 'transparent',
          transform: 'scale(1.2)',
          transition: 'transform 0.3s ease-in-out',
        }}
        _focus={{ boxShadow: 'none' }}
        _active={{ backgroundColor: 'transparent' }}
      >
        <Image src={LeftArrow} alt="Previous" boxSize="40px" />
      </Button>

      <Button
        id="next-button"
        zIndex={5}
        onClick={nextCard}
        size="lg"
        variant="ghost"
        position="absolute"
        right="25%"
        top="50%"
        _hover={{
          background: 'transparent',
          transform: 'scale(1.2)',
          transition: 'transform 0.3s ease-in-out',
        }}
        _focus={{ boxShadow: 'none' }}
        _active={{ backgroundColor: 'transparent' }}
      >
        <Image src={RightArrow} alt="Next" boxSize="40px" />
      </Button>
    </Box>

  );
};

export default Deck;

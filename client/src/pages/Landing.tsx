import { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text, VStack, Flex, Button } from '@chakra-ui/react';
import { gsap } from 'gsap';
import './index.css';
import Resume from '../assets/Resume.pdf'
import Spin from "../images/spinner.png"
import JA from "../images/JA.png"
import Globe from "../images/globe.png"
import Card from '../components/CardDeck';
import Dots from '../images/dots.png';


const LandingPage = () => {
  const [isSkillsVisible, setIsSkillsVisible] = useState(false); // Track visibility of Skills section
  const [isSvgVisible, setIsSvgVisible] = useState(true); // Track visibility of SVG
  const skillsRef = useRef<HTMLDivElement | null>(null); // Reference to the skills section
  const svgRef = useRef<SVGSVGElement | null>(null); // Reference to the SVG
  const scrollRef = useRef(null);
  const workRef = useRef(null);

  const useCustomCursor = () => {
    useEffect(() => {
      const cursorDot = document.createElement('div');
      const cursorCircle = document.createElement('div');
      cursorDot.classList.add('cursor-dot');
      cursorCircle.classList.add('cursor-circle');
      document.body.appendChild(cursorDot);
      document.body.appendChild(cursorCircle);

      const moveCursor = (e: MouseEvent) => {
        // Set position of cursors
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
        cursorCircle.style.left = `${e.clientX}px`;
        cursorCircle.style.top = `${e.clientY}px`;

      };

      document.addEventListener('mousemove', moveCursor);

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        document.body.removeChild(cursorDot);
        document.body.removeChild(cursorCircle);
      };
    }, []);
  };


  useCustomCursor();

  useEffect(() => {
    gsap.fromTo(
      scrollRef.current,
      {
        opacity: 0,
        y: -600,  // Start from above
      },
      {
        opacity: 1,  // End at fully visible
        y: 0,        // End at the normal position
        duration: 3,
        ease: 'power4.out',
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      workRef.current,
      {
        opacity: 0,
        y: -600,  // Start from above
      },
      {
        opacity: 1,  // End at fully visible
        y: 0,        // End at the normal position
        duration: 3,
        ease: 'power4.out',
      }
    );
  }, []);

  useEffect(() => {
    gsap.from('.header', {
      duration: 3,
      opacity: 0,
      x: 600,  // Start from the right
      ease: 'power4.out',  // Smooth easing for the effect
    });

    gsap.from('.icon', {
      duration: 3,
      opacity: 0,
      y: 600,  // Start from the right
      ease: 'power4.out',  // Smooth easing for the effect
    });

    gsap.from('.hello', {
      duration: 3,
      opacity: 0,
      x: -400,  // Start from the left
      ease: 'power4.out',  // Smooth easing for the effect
    });
    

    gsap.from('.text', {
      duration: 1.5,
      opacity: 0,
      x: -100,
      ease: 'power4.out',
      delay: 0.5,
    });

    gsap.from('.letter', {
      color: '#d43131', // Color to pulse to
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse the animation on each repeat
      duration: 2, // Duration for one pulse cycle
      stagger: 0.1, // Delay each letter's pulse
      ease: 'power1.inOut', // Smooth color transition
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSkillsVisible(true);
        } else {
          setIsSkillsVisible(false);
        }
      },
      {
        threshold: 0.5, // Trigger when at least 50% of the Skills section is visible
      }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSkillsVisible) {
      gsap.to('.skills-text', { opacity: 1, duration: 1 });
    } else {
      gsap.to('.skills-text', { opacity: 0, duration: 1 });
    }
  }, [isSkillsVisible]);

  useEffect(() => {
    const onScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      setIsSvgVisible(!isAtBottom); // Hide the SVG if the user is at the bottom
    };
  
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const name = 'Full-Stack Developer';

  const nameLetters = name.split(' ').map((word, wordIndex) => (
    <span
      key={wordIndex}
      className="word"
      style={{ display: 'block', marginBottom: wordIndex === 0 ? '50px' : '0' }}
    >
      {word.split('').map((letter, index) => (
        <span key={`${wordIndex}-${index}`} className="letter">
          {letter}
        </span>
      ))}
    </span>
  ));

  return (
    <Box className='landing-page'
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      color="white"
      padding={4}
      position="relative"
      backgroundColor="#1b1b1"
    >


      <VStack >
        <Box
          position="absolute"
          top={{ base: '50px', md: '15px', lg: '15px' }}
          left={{ base: '28px', md: '28px', lg: '28px' }}
        >
          <img src={JA} alt="Joshua Askew" className='icon' />
          <Text
          className='hello'
            fontSize={{ base: '18px', md: '38px', lg: '38px' }}
            textAlign="start"
            fontFamily={'Lato, sans-serif'}
          >
            Hello. I'm Joshua Askew, a
          </Text>
          <Heading
            as="h1"
            className="header"
            fontSize={{ base: '4xl', md: '78px', lg: '98px' }}
            textAlign="start"
            fontFamily="'Lato', sans-serif"
            color="white"
            marginBottom={8}
            marginTop={8}
          >
            {nameLetters}
          </Heading>
          <Text
            className='hello'
            fontSize={{ base: '18px', md: '38px', lg: '38px' }}
            textAlign="start"
            fontFamily={'Lato, sans-serif'}
          >
            Specializing in React & UI Design
          </Text>
        </Box>
        {/* Scroll divider*/}
        <Box
          position="absolute"
          left="20px"
          height="400px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          opacity={0}  // Start with hidden state
          ref={scrollRef}
        >
          <Text
            fontFamily="Lato, sans-serif"
            fontSize="14px"
            fontWeight="bold"
            marginBottom="40px"
            color="white"
            style={{ transform: 'rotate(90deg)' }}
          >
            SCROLL
          </Text>
          <Box
            width="1px"
            height="400px"
            backgroundColor="white"
          />
        </Box>

        {/* Open to Work Section */}
        <Box
          position="absolute"
          bottom="80px"
          right="120px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding="10px"
          borderRadius="8px"
          color="white"
          zIndex={1}
          opacity={0}  // Start with hidden state
          ref={workRef}
        >
          <Text
            marginRight="8px"
            fontFamily="'Lato', sans-serif"
            fontSize="18px"
            fontWeight="bold"
          >
            OPEN TO WORK<br></br><Text
              fontSize="14px"
              fontWeight="normal"
              fontFamily="'Lato', sans-serif"
            >BASED IN MINNESOTA</Text>
          </Text>
          <img
            src={Spin}
            alt="Spinning icon"
            className="spin-animation"
            style={{ width: '32px', height: '32px' }}
          />
        </Box>

      </VStack>


      {/* Arrow SVG */}
      {isSvgVisible && (
        <svg ref={svgRef} className="arrows">
          <path className="a1" d="M0 0 L30 32 L60 0"></path>
          <path className="a2" d="M0 20 L30 52 L60 20"></path>
          <path className="a3" d="M0 40 L30 72 L60 40"></path>
        </svg>
      )}

      <Flex
        ref={skillsRef}
        direction={{ base: 'column', md: 'row' }}
        align="flex-start"
        justify="space-between"
        marginTop="1vh"
        padding={4}
        position="absolute"
        top="100vh"
        left="5%"
        zIndex={1}
        width="90%"
      >
        {/* Skills Section */}
        <Box
          flex="1"
          width={{ base: '100%', md: '40%' }}
          marginRight={{ base: 0, md: 8 }}
        >
          <Box
            flex="1"
            width={{ base: '100%', md: '40%' }}
            marginRight={{ base: 0, md: 8 }}
          >
            <Box
              position="relative"
              width="400px"
              display="flex"
              flexDirection="row"  // Use row direction to align text and line horizontally
              alignItems="center"  // Vertically center the text and line
              justifyContent="flex-start"  // Align to the left
            >
              <Text
                fontFamily="Lato, sans-serif"
                fontSize="14px"
                fontWeight="bold"
                marginRight="22px" // Add margin to the right of text for spacing from line
                color="white"
              >
                SKILLS
              </Text>
              <Box
                height="1px"
                width="100%"  // Make the line stretch to fill available space
                backgroundColor="white"
              />
            </Box>
          </Box>


          <Text
            className="skills-text"
            fontSize="32px"
            fontWeight="extrabold"
            lineHeight="1.4"
            fontFamily="Lato, sans-serif"
            textAlign="left"
            color="transparent"  // Set text color to transparent to show the gradient
            background="linear-gradient(45deg, #d43131, white)"  // Gradient from bottom right (red) to top left (white)
            backgroundClip="text"  // Apply the background to the text
            opacity={0}
          >
            • ReactJS <br />
            • Node.js & Express <br />
            • MongoDB & SQL <br />
            • GraphQL <br />
            • Next.js <br />
            • JSON <br />
            • TypeScript <br />
            • RESTful APIs <br />
            • Authentication <br />
            • Python <br />
            • Version Controll <br />
            • Web Design & UX/UI <br />
            • Responsive Design <br />
            • Testing & Debugging <br />
            • Agile Methodologies <br />
          </Text>
        </Box>
        <Box position="absolute" width="100%" marginTop={{ base: '10vh', md: '0', lg:'0' }}>
          <img src={Dots} alt="Globe" className="spinning-globe"
            style={{
              width: '350px',
              height: '350px',
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
            }}
          />
        </Box>
        <Box position="relative" width="100%">
          <img src={Globe} alt="Globe" className="spinning-globe"
            style={{
              width: '350px',
              height: '350px',
              position: 'absolute',
              top: '100px',
              right: '100px',
              zIndex: 1,
            }}
          />
        </Box>
       
      </Flex>

      {/* Featured Work Section */}
      <Box
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        marginTop="3vh" // Adjust spacing from the skills section
        padding={4}
        position="absolute"
        top="180vh" // Positioning for the new section below Skills
        left="5%"
        zIndex={1}
        width="90%"
      >
        {/* Divider */}
        <Box
          position="relative"
          width="400px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Text
            fontFamily="Lato, sans-serif"
            fontSize="14px"
            fontWeight="bold"
            marginRight="8px"
            color="white"
          >
            FEATURED WORK
          </Text>
          <Box height="1px" width="100%" backgroundColor="white" />
        </Box>

        {/* Featured Work Content */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          marginTop="2vh"
          width="100%"
          justifyContent="space-around"
        >
          <Card />
        </Flex>
      </Box>

      {/* Get in Touch Section */}
      <Box
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        marginTop="100px" // Adjust spacing from the previous section
        padding={4}
        position="absolute"
        top="240vh" // Positioning for the new section below Featured Work
        left="5%"
        zIndex={1}
        width="90%"
      >
        {/* Divider */}
        <Box
          position="relative"
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
          marginTop={{ base: 0, md: 30, lg: 10 }}
        >
          <Text
            fontFamily="Lato, sans-serif"
            fontSize="14px"
            fontWeight="bold"
            color="white"
          >
            GET IN TOUCH
          </Text>
          <Box height="1px" width="100%" backgroundColor="white" />
        </Box>

        {/* Contact Content */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          marginTop="2vh"
          width="100%"
          justifyContent="space-around"
          color="white"
        >
          {/* Left side content */}
          <Box flex="1" marginRight="4">
            <Text
              fontFamily="Lato, sans-serif"
              fontSize="24px"
              fontWeight="bold"
              lineHeight="1.6"
              marginBottom="2"
              marginTop={{ base: 0, md: 4 }}
            >
              Reach Out
            </Text>
            <Text
              fontFamily="Lato, sans-serif"
              fontSize="16px"
              lineHeight="1.8"
            >
              Have a project in mind? I'd love to collaborate or help with any questions.
              Drop me a message, and I'll get back to you as soon as possible!
            </Text>
            <a href={Resume} download>
            <Button
              display={"flex"}
              size="lg"
              variant="solid"
              fontFamily="'Lato', sans-serif"
              position={{ base: 'absolute', md: 'absolute', lg: 'absolute' }}
              top={{ base: '99%', md: '80%', lg: '80%' }}
              left={{ base: '20%', md: '0%', lg: '0%' }}
              fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
              backgroundColor="#353535"
              color="white"
              _hover={{
                transform: "scale(1.1)", // Slightly enlarge the button
                transition: "all 0.5s ease-in-out",
                backgroundColor: "#d43131", // Change the background color on hover
              }}
            >
              Resume Download
            </Button>
          </a>
          </Box>

          {/* Right side content (e.g., email and social links) */}
          <Box flex="1" textAlign="left">
            <Text
              fontFamily="Lato, sans-serif"
              fontSize="18px"
              fontWeight="bold"
              marginBottom="1"
            >
              Email:
            </Text>
            <Text fontFamily="Lato, sans-serif" fontSize="16px">
              Joshua.Askew43@gmail.com
            </Text>

            <Text
              fontFamily="Lato, sans-serif"
              fontSize="18px"
              fontWeight="bold"
              marginTop="3"
              marginBottom="1"
            >
              LinkedIn:
            </Text>
            <Text fontFamily="Lato, sans-serif" fontSize="16px">
              <a
                href="https://www.linkedin.com/in/joshua-askew-0293bb338/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d43131' }}
              >
                https://www.linkedin.com/in/joshua-askew-0293bb338/ 
               </a>
            </Text>

            <Text
              fontFamily="Lato, sans-serif"
              fontSize="18px"
              fontWeight="bold"
              marginTop="3"
              marginBottom="1"
            >
              GitHub:
            </Text>
            <Text fontFamily="Lato, sans-serif" fontSize="16px">
              <a
                href="https://github.com/JoshAskew"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d43131' }}
              >
                https://github.com/JoshAskew
              </a>
            </Text>
          </Box>
        </Flex>
      </Box>



    </Box>
  );
};

export default LandingPage;

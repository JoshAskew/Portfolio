import { useEffect, useRef, useState } from 'react';
import { Box, Heading, Text, VStack, Flex, Button, Image, Link } from '@chakra-ui/react';
import { gsap } from 'gsap';
import './index.css';
import Resume from '../assets/Resume.pdf'
import Spin from "../images/Spinner.png"
import JA from "../images/JA.png"
import Globe from "../images/Globe.png"
import Card from '../components/CardDeck';
import Dots from '../images/Dots.png';



const LandingPage = () => {
  const [isSkillsVisible, setIsSkillsVisible] = useState(false); // Track visibility of Skills section
  const [isSvgVisible, setIsSvgVisible] = useState(true); // Track visibility of SVG
  const skillsRef = useRef<HTMLDivElement | null>(null); // Reference to the skills section
  const svgRef = useRef<SVGSVGElement | null>(null); // Reference to the SVG
  const scrollRef = useRef(null);
  const workRef = useRef(null);
  const [opacity, setOpacity] = useState(1); // Initial opacity (fully visible)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;  // Current scroll position
      const fadeStartPoint = 10;  // Where fading should begin
      
      let newOpacity = 1;

      // Only start fading once the scroll position exceeds the fadeStartPoint
      if (scrollTop > fadeStartPoint) {
        // Calculate how far the user has scrolled past the fadeStartPoint
        const fadeDistance = scrollTop - fadeStartPoint;
        // Calculate new opacity based on how far the user has scrolled
        const fadeFactor = 0.002; // Lower value for faster fading
        newOpacity = 1 - (fadeDistance * fadeFactor);
        
        // Ensure opacity doesn't go below 0
        newOpacity = Math.max(0, newOpacity);
      }

      setOpacity(newOpacity);
    };
    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        threshold: 0.4, // Trigger when at least 50% of the Skills section is visible
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

  

  const name = 'FULL-STACK DEVELOPER';

  const nameLetters = name.split(' ').map((word, wordIndex) => (
    <Box
      key={wordIndex}
      className="word"
      display="block"
      marginBottom={wordIndex === 0 ? { base: '0px', md: '50px', lg: '50px' } : '0'}
    >
      {word.split('').map((letter, index) => (
        <span key={`${wordIndex}-${index}`} className="letter">
          {letter}
        </span>
      ))}
    </Box>
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
            className="hello"
            fontSize={{ base: '18px', md: '38px', lg: '38px' }}
            textAlign="start"
            fontFamily="Lato, sans-serif"
          >
            Hello. I'm{' '}
            <Link
              href="mailto:Joshua.Askew43@gmail.com?subject=Hello%20Joshua"
              textDecoration="none"
              _hover={{ textDecoration: 'underline', color: "#d43131" }}
            >
              Joshua Askew
            </Link>
            , a
          </Text>
          <Link
            href="https://github.com/JoshAskew"
            target="_blank"
            textDecoration= "none"
          >
            <Heading
              as="h1"
              className="header"
              fontSize={{ base: '4xl', md: '78px', lg: '98px' }}
              textAlign="start"
              fontFamily="'Lato', sans-serif"
              color="white"
              marginBottom={{ base: 1, md: 4, lg: 8 }}
              marginTop={{ base: 1, md: 4, lg: 8 }}
            >
              {nameLetters}
            </Heading>
          </Link><br />
          <Link
            href="https://www.linkedin.com/in/joshua-askew-0293bb338/"
            target="_blank"
            rel="noopener noreferrer"
            className="hello"
            fontSize={{ base: '18px', md: '38px', lg: '38px' }}
            textAlign="start"
            fontFamily="Lato, sans-serif"
            _hover={{ textDecoration: 'underline', color: "#d43131" }}
          >
            Specializing in React & UI Design
          </Link>
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
          ref={scrollRef}
          marginTop={{ base: '-60px', md: '50px', lg: '100px' }}
        >
          <Text
            fontFamily="Lato, sans-serif"
            fontSize="14px"
            fontWeight="bold"
            marginBottom="40px"
            color="white"
            opacity={opacity} 
            style={{ transform: 'rotate(90deg)' }}
          >
            SCROLL
          </Text>
          <Box
          opacity={opacity} 
            width="1px"
            height="400px"
            backgroundColor="white"
          />
        </Box>

        {/* Open to Work Section */}
        <Box
          position="absolute"
          bottom={{ base: '0px', md: '15px', lg: '80px' }}
          right={{ base: '0px', md: '15px', lg: '120px' }}
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
            marginRight={{ base: 0, md: 4, lg: 8 }}
            fontFamily="'Lato', sans-serif"
            fontSize={{ base: '14px', md: '16px', lg: '18px' }}
            fontWeight="bold"
          >
            OPEN TO WORK<br></br><Text
              fontSize={{ base: '12px', md: '14px', lg: '16px' }}
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
        <svg ref={svgRef} className="arrows" style={{ opacity }}>
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
          marginTop={{ base: '50px', md: '130px', lg: '200px' }}
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
            background="white"  // Gradient from bottom right (red) to top left (white)
            backgroundClip="text"  // Apply the background to the text
            opacity={0}
          >
             ReactJS <br />
             Node.js & Express <br />
             MongoDB & SQL <br />
             GraphQL <br />
             Next.js <br />
             JSON <br />
             TypeScript <br />
             RESTful APIs <br />
             Authentication <br />
             Python <br />
             Version Controll <br />
             Web Design & UX/UI <br />
             Responsive Design <br />
             Testing & Debugging <br />
             Agile Methodologies <br />
          </Text>
        </Box>
        <Box position="absolute" width="100%" marginTop={{ base: '10vh', md: '0', lg: '0' }}>
          <Image
            src={Dots}
            alt="Globe"
            className="spinning-globe"
            position="absolute"
            top={{ base: '150px', md: '230px', lg: '250px' }}
            right={{ base: '10px', md: '80px', lg: '100px' }}
            zIndex={1}
            width={{ base: '100px', md: '250px', lg: '350px' }} // Responsive sizes
            height={{ base: '100px', md: '250px', lg: '350px' }} // Responsive sizes
          />
        </Box>
        <Box position="absolute" width="100%">
          <Image
            src={Globe}
            alt="Globe"
            className="spinning-globe"
            position="absolute"
            top={{ base: '250px', md: '300px', lg: '350px' }}
            right={{ base: '50px', md: '180px', lg: '250px' }}
            zIndex={1}
            width={{ base: '100px', md: '250px', lg: '350px' }} // Responsive sizes
            height={{ base: '100px', md: '250px', lg: '350px' }} // Responsive sizes
          />
        </Box>

      </Flex>

      {/* Featured Work Section */}
      <Box
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        padding={4}
        position="absolute"
        top="180vh" // Positioning for the new section below Skills
        left="5%"
        zIndex={1}
        width="90%"
        marginTop={{ base: '900px', md: '540px', lg: '530px' }}
      >
        {/* Divider */}
        <Box
          position="absolute"
          top={{ base: '-800px', md: '-110px', lg: '-70px' }}
          width="400px"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
           className="custom-divider"
          marginBottom={{ base: 0, md: "100px", lg: 40 }}  
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
          marginTop={{ base: '8vh', md: '4vh', lg: '9vh' }}
          width="100%"
          marginLeft={{ base: "0", md: 4 }}
          justifyContent="space-around"
        >
          <Card />
        </Flex>
      </Box>

      {/* Get in Touch Section */}
      <Box
        direction={{ base: 'column', md: 'row' }}
        alignItems="flex-start"
        marginTop={{ base: '2200px', md: '950px', lg: '850px' }}
        padding={4}
        paddingBottom="80px"
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
          marginTop={{ base: 0, md: 30, lg: 40 }}
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
              marginBottom="2px"
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
                top={{ base: '88%', md: '82%', lg: '82%' }}
                left={{ base: '30%', md: '0%', lg: '0%' }}
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
              <a
                href="mailto:Joshua.Askew43@gmail.com?subject=Hello%20Joshua"
                style={{ color: '#d43131', textDecoration: 'none' }}
              >
                Joshua.Askew43@gmail.com
              </a>
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

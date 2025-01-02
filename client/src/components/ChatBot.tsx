import { useState, useEffect, useRef } from 'react';
import { Button } from '@chakra-ui/react';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Josh's Assistant. How can I assist you today?" },
  ]);
  const [isFetching, setIsFetching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);  // State for controlling drawer visibility
  const chatbotRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInput.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: userInput },
      ]);
      setIsFetching(true);
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userInput }],
          }),
        });

        const data = await response.json();
        const botResponse = data.choices[0].message.content;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: botResponse },
        ]);
      } catch (error) {
        console.error('Error fetching bot response:', error);
      } finally {
        setIsFetching(false);
      }
      setUserInput('');
    }
  };

  // Close chatbot if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: "#333232", color: "white", fontFamily: "Lato" }}>
        Ask About Me
      </Button>

      {isOpen && (
        <div
          ref={chatbotRef}
          style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            width: '350px',
            height: '350px',
            backgroundColor: '#333232',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
          }}
        >
          <div style={{ flex: 1, overflowY: 'scroll', padding: '10px', marginBottom: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ margin: '10px 0' }}>
                <strong>{msg.sender === 'bot' ? "Josh's Assistant" : 'You'}:</strong>
                <p
                  style={{
                    backgroundColor: msg.sender === 'bot' ? '#444' : '#f55d5d', // Darker grey for bot, lighter for user
                    color: 'white',
                    fontFamily: "Lato",
                    padding: '10px',
                    borderRadius: '6px',
                    margin: '5px 0',
                    display: 'inline-block',
                  }}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              style={{ padding: '10px', marginTop: '10px', flex: 'none', fontFamily: "Lato" }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#525252',
                color: 'white',
                padding: '10px',
                width: '100%',
                border: 'none',
                marginTop: '10px',
                cursor: isFetching ? 'not-allowed' : 'pointer',
              }}
              disabled={isFetching}
            >
              {isFetching ? 'Typing...' : 'Send'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Navbar, Button, Textarea, Card, Flowbite } from 'flowbite-react';

// Define message types
type MessageType = 'user' | 'bot';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

// Sample suggestions
const suggestions = [
  "What's the weather like today?",
  "Tell me a fun fact",
  "How can I improve my productivity?",
  "Recommend a good book to read",
  "What are some healthy meal ideas?"
];

// Sample bot responses
const botResponses: Record<string, string> = {
  "What's the weather like today?": "I don't have access to real-time weather data, but I'd recommend checking a weather app!",
  "Tell me a fun fact": "Honey never spoils. Archaeologists found pots in Egyptian tombs over 3,000 years old that are still good!",
  "How can I improve my productivity?": "Try the Pomodoro Technique: work for 25 minutes, then take a 5-minute break!",
  "Recommend a good book to read": "'Atomic Habits' by James Clear is a great read on personal development!",
  "What are some healthy meal ideas?": "Quinoa bowls, grilled chicken with salad, or a veggie stir-fry are great options!"
};

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: "Hello! I'm your chatbot. How can I help?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = botResponses[userMessage.text] || "I'm not sure how to respond. Try another question!";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), type: 'bot', text: botResponse, timestamp: new Date() }]);
    }, 1000);
  };

  return (
    <Flowbite>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <Navbar fluid rounded className="bg-indigo-400 text-white shadow-md">
          <Navbar.Brand className="container mx-auto flex items-center">
            <Bot className="mr-2" size={24} />
            <span className="text-xl font-bold">ChatBot Assistant</span>
          </Navbar.Brand>
        </Navbar>

        <main className="flex-1 container mx-auto p-4 flex flex-col">
          <Card className="flex-1 overflow-y-auto p-4 bg-gray-800 shadow-md rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user' ? ' bg-indigo-400 hover:bg-indigo-500 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                  <p className="font-semibold flex items-center mb-1">
                    {message.type === 'bot' ? <Bot size={16} className="mr-1" /> : <User size={16} className="mr-1" />}
                    {message.type === 'user' ? 'You' : 'ChatBot'}
                  </p>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Card>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Sparkles size={24} className="text-indigo-400 mr-1" />
              <h3 className="text-sm font-medium text-gray-300">Suggestions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button key={index} color="purple" className="text-sm py-1 px-3 rounded-full bg-indigo-400 hover:bg-indigo-500" onClick={() => setInputValue(suggestion)}>{suggestion}</Button>
              ))}
            </div>
          </div>

          <div className="flex items-end bg-gray-800 rounded-lg shadow-md p-3">
            <Textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type your message here..." rows={3} className="flex-1 resize-none border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white" />
            <Button color="purple" className="ml-2 p-3 rounded-full bg-indigo-400 hover:bg-indigo-500" onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={20} />
            </Button>
          </div>
        </main>
      </div>
    </Flowbite>
  );
}

export default App;
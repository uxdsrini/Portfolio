import React, { useState, useEffect, useRef } from 'react';
import { ref, push, onValue, serverTimestamp } from 'firebase/database';
import { rtdb } from '../lib/firebase';
import { Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messagesRef = ref(rtdb, 'messages');
    
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, value]: [string, any]) => ({
          id,
          ...value
        }));
        setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messagesRef = ref(rtdb, 'messages');
      await push(messagesRef, {
        text: newMessage,
        sender: name,
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsNameSet(true);
    }
  };

  if (!isNameSet) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-6">Enter Your Name</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              placeholder="Your name"
              required
            />
            <button
              type="submit"
              className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md h-[70vh] flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-primary">Live Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.sender === name ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === name
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100'
                  }`}
                >
                  <p className="text-sm font-semibold mb-1">{message.sender}</p>
                  <p>{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : 'Sending...'}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="bg-secondary text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
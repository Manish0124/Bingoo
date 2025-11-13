import { memo, useState, useEffect, useRef } from 'react';

interface Message {
  player: string;
  text?: string;
  emoji?: string;
  time: number;
}

interface ChatProps {
  roomId: string;
  playerName: string;
  socket: any;
}

const emojis = ['👍', '🎉', '😊', '🔥', '❤️', '😂', '👏', '🎯'];

function Chat({ roomId, playerName, socket }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('chat-message', (msg: Message) => setMessages(prev => [...prev, msg]));
    socket.on('emoji-reaction', (msg: Message) => setMessages(prev => [...prev, msg]));
    return () => {
      socket.off('chat-message');
      socket.off('emoji-reaction');
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    socket.emit('chat-message', { roomId, player: playerName, text: input });
    setInput('');
  };

  const sendEmoji = (emoji: string) => {
    socket.emit('emoji-reaction', { roomId, player: playerName, emoji });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col h-96">
      <h3 className="font-bold mb-2 text-gray-800">Chat</h3>
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={msg.emoji ? 'text-center' : 'bg-gray-100 p-2 rounded'}>
            {msg.emoji ? (
              <span className="text-2xl">{msg.emoji} <span className="text-xs text-gray-600">{msg.player}</span></span>
            ) : (
              <><span className="font-semibold text-sm">{msg.player}:</span> <span className="text-sm">{msg.text}</span></>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1 mb-2 flex-wrap">
        {emojis.map(e => (
          <button key={e} onClick={() => sendEmoji(e)} className="text-xl hover:scale-125 transition">{e}</button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && send()}
          placeholder="Type message..."
          className="flex-1 px-3 py-2 border rounded-lg text-sm"
        />
        <button onClick={send} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Send</button>
      </div>
    </div>
  );
}

export default memo(Chat);

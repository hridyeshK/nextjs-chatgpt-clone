import Image from 'next/image'
import React, { useState } from 'react';
import { OpenAI } from 'openai';

const Sidebar = () => {
    return (
        <div className="h-screen w-1/4 bg-gray-900 p-4">
            <h1 className="mb-4 text-2xl font-semibold text-gray-400">ChatGPT</h1>
            {/* Add your sidebar content here */}
        </div>
    );
}

const Message = ({ isBot, message }: { isBot: boolean, message: string }) => {
    const messageColor = isBot ? 'bg-gray-800 text-white' : 'bg-blue-500 text-black';
  
    return (
      <div className={`mb-2 max-w-[90%] rounded-3xl px-4 py-2 ${messageColor} overflow-hidden`}>
        <div className="whitespace-pre-wrap rounded-full">
          {message}
        </div>
      </div>
    );
  }
  
  
  

const MainDiv = () => {
  const [messages, setMessages] = useState<Array<{userIsBot: boolean, message: string}>>([]);
    const [input, setInput] = useState<string>("");

    const handleSend = async () => {
        // Append the user's message first
        setMessages([...messages, {message: input, userIsBot: false}]);

        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY as string;
        const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: 'gpt-3.5-turbo',
        });
        const data = completion.choices[0].message.content;
        // Then append the bot's response
        setMessages(prevMessages => [...prevMessages, { userIsBot: true, message: data || ''}]);
        setInput("");
    }

    return (
        <div className="flex-grow flex flex-col-reverse bg-black p-4">
          <div>
              <div className="mt-4 max-h-[500px] overflow-y-auto bg-inherit p-4 shadow-md">
                  {messages.map((message: any, index: number) => (
                      <Message key={index} isBot={message.userIsBot} message={message.message} />
                  ))}
              </div>

              <div className="mt-4 bg-inherit p-4 shadow-md">
                  <div className="flex">
                      <input
                          type="text"
                          placeholder="Type your message..."
                          className="flex-grow rounded-l-lg border bg-gray-900 px-4 py-2 text-white focus:border-blue-300 focus:outline-none focus:ring"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                      />
                      <button
                          className="rounded-r-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:border-blue-300 focus:outline-none focus:ring"
                          onClick={handleSend}
                      >
                          Send
                      </button>
                  </div>
              </div>
          </div>
      </div>
    )
}




export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <MainDiv/>
    </div>
  )
}



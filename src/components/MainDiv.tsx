import React, { useState } from 'react';
import { Message } from './Message';
import { OpenAI } from 'openai';

export const MainDiv = () => {
    const [messages, setMessages] = useState<Array<{userIsBot: boolean, message: string}>>([]);
    const [input, setInput] = useState<string>("");

    const handleSend = async () => {
        // Append the user's message first
        setMessages([...messages, {message: input, userIsBot: false}]);

        const apiKey = process.env.OPENAI_API_KEY as string;
        const openai = new OpenAI({ apiKey });
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
        <div>
            {messages.map((message: any, index: number) => (
                <Message key={index} userIsBot={message.userIsBot} message={message.message} />
            ))}
            <div className="input-container">
                <input value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}
import { useEffect, useState, useCallback } from 'react';
import './chatbox.scss';

export default function Chatbox( {socket} ) {
    const [messages, setMessages] = useState([])
    const user = localStorage.getItem('user')

    const handleNewMessage = useCallback((data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        
        setTimeout(() => {
            const el = document.querySelector('#lastmessage');
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }, []);
    
    useEffect(() => {
        socket.on("ROOM:NEW_MESSAGE", handleNewMessage);
    
        return () => {
            socket.off("ROOM:NEW_MESSAGE", handleNewMessage);
        };
    }, [handleNewMessage, socket]);

    const length = messages.length - 1;

    return (
        <div className='chatbox-wrapper'>

            {   
                messages.map((message, i) => (
                    <div key={message.key} className={message.user === user ? 'message my-message' : 'message'} id={i === length ? 'lastmessage': ''}>
                        <div className='message_header'>
                            <span className='name'>{message.user}</span>
                            <span className='time'>{message.time}</span>
                        </div>
                        <p>{message.text}</p>
                    </div>
                ))
            }
            
        </div>
    )
}

import { useEffect, useState } from 'react';
import './chatbox.scss';

export default function Chatbox( {socket} ) {
    const [messages, setMessages] = useState([])
    const user = localStorage.getItem('user')

    useEffect(() => {
        socket.on("ROOM:NEW_MESSAGE", (data) => {
            setMessages([...messages, data])
        })
    },[messages, socket])


    return (
        <div className='chatbox-wrapper'>

            {
                messages.map((message) => (
                    <div className={message.user === user ? 'message my-message' : 'message'}>
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

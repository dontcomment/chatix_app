import { useState } from 'react';
import './chatinput.scss';

export default function ChatInput({ socket }) {
  const [messageValue, setMessageValue] = useState('')
  const user = localStorage.getItem('user')
  const room = localStorage.getItem('room')


  const onSendMessage = (e) => {
    e.preventDefault()
    socket.emit("ROOM:NEW_MESSAGE", {
      text: messageValue,
      user: user,
      room: room
    })
    setMessageValue('')
  }

  return (
    <div className='chatinput-wrapper'>
        <div className='line'></div>
        <form onSubmit={onSendMessage}>
            <input
            className='textinput'
            type="text"
            placeholder='message'
            onChange={(e) => {setMessageValue(e.target.value)}}
            value={messageValue} />
            <input className='submit' type="submit" defaultValue="сообщение"/>
        </form>
    </div>
  )
}

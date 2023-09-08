import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../store/Reducer";
import { useDispatch } from 'react-redux';

export default function Login({socket}) {
  const [user, setUser] = useState('')
  const [room, setRoom] = useState('')
  const dispatcher = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem('user', user)
    localStorage.setItem('room', room)

    socket.emit('ROOM:NEWLOGIN', {
      room: room,
      user: user
    })
    dispatcher(login())
    navigate('/chat')
  }

  return (
    <div className="login-wrapper" >
        <form className="login" onSubmit={handleSubmit}>
            <input type="text" placeholder="комната" onChange={(e) => {setRoom(e.target.value)}} required/>
            <input type="text" placeholder="ник" onChange={(e) => {setUser(e.target.value)}} required/>
            <button type="submit">log in</button>
        </form>
    </div>
  )
}

import "./header.scss";
import { logout } from "../store/Reducer";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


export default function Header({ socket }) {
  const logged = useSelector((state) => state.logged)
  const dispatcher = useDispatch()
  const navigate = useNavigate()

  const logginOut = (e) => {
    e.preventDefault()
    socket.emit('ROOM:LEAVE')
    localStorage.removeItem('user')
    localStorage.removeItem('room')
    dispatcher(logout())
    navigate('/')
  }

  return (
    <div className="header-wrapper">
      <div className="header">
        <img src="union.svg" alt="logo" />
        {
          logged.logged ? <p>room {localStorage.getItem('room')}</p> : null
        }
        {
          logged.logged ? <span onClick={(e) => logginOut(e)} >log out</span> : <p>hello, welcome!</p>
        }        
      </div>
      <div className="line"></div>   
    </div>
  )
}

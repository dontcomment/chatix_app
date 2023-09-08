import { Route, Routes } from 'react-router-dom';
import Chatbox from './components/chatbox/Chatbox';
import ChatInput from './components/chatinput/ChatInput';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import UsersList from './components/userslist/UsersList';

function App({socket}) {
  return (
      <Routes>
        <Route
        path='/'
        element={
          <>
            <Header socket={socket}/>
            <Login socket={socket}/>
            <Footer />
          </>   
        } />
        <Route
          path='/chat'
          element={
            <>
              <Header socket={socket}/>
              <UsersList socket={socket}/>
              <Chatbox socket={socket}/>
              <ChatInput socket={socket} />
              <Footer />
            </>  
        } />
      </Routes>
  );
}

export default App;

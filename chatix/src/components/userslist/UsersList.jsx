import { useEffect, useState } from 'react';
import './userslist.scss';

export default function UsersList({socket}) {
    // const initialUser = localStorage.getItem('user')
    const [users, setUsers] = useState([])

    useEffect(() => {
        
        socket.on('ROOM:USER_UPDATE', (data) => {
            setUsers([...data]);
        })

    }, [socket])

    

    return (
        <div className='userslist-wrapper'>
                <span>online:</span>
                <ul>
                    {
                        users.map((name, index) => (
                            <li key={name + index}>{name}</li>
                        ))
                    }
                </ul>
        </div>
    
    );
}

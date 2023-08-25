import React, { useEffect, useState } from 'react'
import '../Sass/ConnectionComponent.scss'
import { addConnection, getAllUsers, getConnections } from '../api/FirestoreAPI'
import ConnectedUsers from './common/ConnectedUsers'

export default function ConnectionComponent({ currentUser }) {
    const [users, setUsers] = useState([])

    const getCurrentUser = (id) => {
        addConnection(currentUser.userID, id);
    }

    useEffect(() => {
        getAllUsers(setUsers);
    }, [])

  return (
    <div className='connections-main'>
        {users.map((user, idx) => {
            return user.id !== currentUser.userID && (
                <ConnectedUsers user={user} getCurrentUser={getCurrentUser} currentUser={currentUser} key={idx} />
            )
        })}
    </div>
  )
}

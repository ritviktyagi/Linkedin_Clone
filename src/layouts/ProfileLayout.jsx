import React, { useMemo, useState } from 'react'
import Topbar from '../components/common/Topbar'
import { getCurrentUser } from '../api/FirestoreAPI'
import Profile from '../pages/Profile'

export default function ProfileLayout() {
    const [currentUser, setCurrentUser] = useState({})

    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])

  return (
    <div>
        <Topbar currentUser={currentUser} />
        <Profile currentUser={currentUser} />
    </div>
  )
}

import React, { useMemo, useState } from 'react'
import Topbar from '../components/common/Topbar'
import { getCurrentUser } from '../api/FirestoreAPI'
import Connections from '../pages/Connections'

export default function ConnectionLayout() {
  const [currentUser, setCurrentUser] = useState({})

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, [])

  return (
    <div>
        <Topbar currentUser={currentUser} />
        <Connections currentUser={currentUser} />
    </div>
  )
}

import React, { useMemo, useState } from 'react'
import './index.scss'
import { onLogout } from '../../../api/AuthAPI'
import { useNavigate } from 'react-router-dom'
import Button from '../Button';
import { getCurrentUser } from '../../../api/FirestoreAPI';

export default function ProfilePopup({ loading }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({})

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, [])

  return (
    loading && (
      <div className='popup-card'>
        <p className='name'>{currentUser.name}</p>
        <p className='headline'>{currentUser.headline}</p>
        <Button 
          title="View Profile"
          onClick={() => navigate("/profile", {
            state: {
              id: currentUser?.userID, email: currentUser?.email
            }
          })}
        />
        <Button 
          title="Logout"
          onClick={onLogout}
        />
        {/* <ul className='popup-options'>
            <li className='popup-option' onClick={onLogout}>Logout</li>
        </ul> */}
    </div>
    )
  )
}

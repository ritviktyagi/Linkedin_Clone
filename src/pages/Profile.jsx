import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Loader from '../components/common/Loader';
import ProfileComponent from '../components/ProfileComponent'

export default function Profile({ currentUser }) {
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if(!res?.accessToken){
        navigate("/")
      }
      else{
        setLoading(false)
      }
    })
  }, [])
  return (
    loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />
  )
}

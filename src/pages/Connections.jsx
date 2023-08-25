import React, { useEffect, useState } from 'react'
import ConnectionComponent from '../components/ConnectionComponent';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import Loader from '../components/common/Loader';

export default function Connections({ currentUser }) {
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
    loading ? <Loader /> : <ConnectionComponent currentUser={currentUser} />
  )
}

import React, { useState } from 'react'
import { GoogleSignInAPI,  RegisterAPI } from '../api/AuthAPI'
import '../Sass/LoginComponent.scss';
import Linkedinlogo from '../assets/Linkedinlogo.png'
import GoogleButton from 'react-google-button'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postUserData } from '../api/FirestoreAPI';
import { getUniqueID } from '../helpers/getUniqueId';

export default function RegisterComponent() {
    const [credentials, setCredentials] = useState({})
    const navigate = useNavigate()

    const register = async () => {
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Account Created!")
            postUserData({
                userID: getUniqueID(),
                name: credentials.name, 
                email: credentials.email,
                imageLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0p8-U7IDPdexpel86E3AIK2NPDpf6gbdCA&usqp=CAU'
            });
            localStorage.setItem('userEmail', res.user.email);
            navigate("/home")
        } catch (error) {
            toast.error("Cannot Create your Account!")
        }
    }

    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        navigate("/home")
        console.log(response, "response")
    }

  return (
    <div className='login-wrapper'>
        <img src={Linkedinlogo} alt="" className='linkedinlogo'/>
        <div className='login-wrapper-inner'>
        <h1 className='heading'>Make the most of your professional life</h1>
        <div className='login-wrapper-inner'>
        <div className='auth-inputs'>
        <input
            onChange={(event) => {
                setCredentials({...credentials, name: event.target.value})
            }}
            type='text'
            className='common-input'
            placeholder='Your Name'
        />

            <input
            onChange={(event) => {
                setCredentials({...credentials, email: event.target.value})
            }}
            type='email'
            className='common-input'
            placeholder='Email or phone number'
            />
            <input
            onChange={(event) => {
                setCredentials({...credentials, password: event.target.value})
            }}
            type='Password (6 or more characters)'
            className='common-input'
            placeholder='Password'
            />
        </div>
        <button onClick={register} className='login-btn'>Agree & Join</button>
        </div>
        </div>
        <hr className='hr-text' data-content='OR' />
        <div className='google-btn-container'>
            <GoogleButton
                className='google-btn'
                onClick={googleSignIn}
            />
            <p className='go-to-signup'>
                Already on LinkedIn? <span className='join-now' onClick={() => navigate("/")}>Sign in</span>
            </p>
        </div>
    </div>
  )
}

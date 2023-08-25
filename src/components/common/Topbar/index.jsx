import React, { useEffect, useState } from 'react'
import './index.scss'
import LinkedinLogo from  '../../../assets/Linkedinlogo.png'
import { AiOutlineBell, AiOutlineHome, AiOutlineMessage, AiOutlineSearch, AiOutlineUserSwitch } from 'react-icons/ai';
import { BsBriefcase } from 'react-icons/bs'
import user from '../../../assets/user.png'
import { useNavigate } from 'react-router-dom';
import ProfilePopup from '../ProfilePopup';
import SearchUsers from '../SearchUsers';
import { getAllUsers } from '../../../api/FirestoreAPI';

export default function Topbar({ currentUser }) {
  const  navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isSearch, setIsSearch] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])

  const goToRoute = (route) => {
    navigate(route)
  }

  useEffect(() => {
    getAllUsers(setUsers);
  }, [])

  const handleSearch = () => {
    if(searchInput !== ''){
      let searched = users.filter((user) => {
        return Object.values(user)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      })

      setFilteredUsers(searched);
    }
    else{
      setFilteredUsers(users);
    }
  }

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000)

    return () => clearTimeout(debounced);
  }, [searchInput])

  const openUser = (user) => {
    navigate("/profile", {
      state : {
        id: user.id,
        email: user.email,
      }
    })
  }

  return (
    <div className='topbar-main'>
        <img src={LinkedinLogo} alt="linkedinlogo" className='linkedin-logo' />
        {isSearch ? (
          <SearchUsers setIsSearch={setIsSearch} setSearchInput={setSearchInput} />
        ) : (
          <div className='react-icons'>
            <AiOutlineSearch size={30} className='react-icon' onClick={() => setIsSearch(true)} />
            <AiOutlineHome size={30} className='react-icon' onClick={() => {goToRoute("/home")}} />
            <AiOutlineUserSwitch size={30} className='react-icon' onClick={() => {goToRoute("/connections")}} />
            <BsBriefcase size={30} className='react-icon' />
            <AiOutlineMessage size={30} className='react-icon' />
            <AiOutlineBell size={30} className='react-icon' />
        </div>
        )}
        <img src={currentUser.imageLink} alt="user" className='user-logo' onClick={() => setLoading(!loading)}/>
        <ProfilePopup loading={loading}/>

        {searchInput.length > 0 && <div className='search-results'>
          {filteredUsers.length === 0 ? (
            <div className='search-inner'>No Results Found..</div>
          )  : (
            filteredUsers.map((user, idx) => (
            <div className='search-inner' onClick={() => openUser(user)} key={idx}>
              <img src={user.imageLink} alt="" />
              <p className='name'>{user.name}</p>
            </div>
          ))
          )
        }
          </div>}
    </div>
  )
}

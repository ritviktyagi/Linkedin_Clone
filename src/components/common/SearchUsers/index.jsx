import React from 'react'
import './index.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export default function SearchUsers({ setIsSearch, setSearchInput }) {
  return (
    <div className='search-users'>
        <input type="text" placeholder='Search Users..' onChange={(event) => setSearchInput(event.target.value)} />
        <AiOutlineCloseCircle size={20} onClick={() => {setIsSearch(false); setSearchInput("")}} className='close-icon' />
    </div>
  )
}

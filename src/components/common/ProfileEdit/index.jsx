import React, { useState } from 'react'
import './index.scss'
import { editProfile } from '../../../api/FirestoreAPI';
import { AiOutlineClose } from 'react-icons/ai'

export default function ProfileEdit({ onEdit, currentUser }) {
    const [editInputs, setEditInputs] = useState(currentUser)

    const getInput = (event) => {
        let { name, value } = event.target;
        let input = { [name]: value };
        setEditInputs({ ...editInputs, ...input })
    }

    const updateProfileData = async () => {
        await editProfile(currentUser?.userID, editInputs);
        await onEdit()
    }

  return (
    <div className='profile-card'>
        <div className='edit-btn'>
            <AiOutlineClose className='close-icon' onClick={onEdit} size={20} />
        </div>
        <div className='profile-edit-inputs'>
            <label>Name</label>
            <input onChange={getInput} value=
            {editInputs.name} name="name" className='common-input' placeholder='Name' />
            <label>Headline</label>
            <input onChange={getInput} value=
            {editInputs.headline} name="headline" className='common-input' placeholder='Headline' />
            <label>Country</label>
            <input onChange={getInput} value=
            {editInputs.country} name="country" className='common-input' placeholder='Country' />
            <label>City</label>
            <input onChange={getInput} value=
            {editInputs.city} name="city" className='common-input' placeholder='City' />
            <label>Company</label>
            <input onChange={getInput} value=
            {editInputs.company} name="company" className='common-input' placeholder='Company' />
            <label>Industry</label>
            <input onChange={getInput} value=
            {editInputs.industry} name="industry" className='common-input' placeholder='Industry' />
            <label>College</label>
            <input onChange={getInput} value={editInputs.college} name="college" className='common-input' placeholder='College' />
            <label>Website</label>
            <input onChange={getInput} value=
            {editInputs.website} name="website" className='common-input' placeholder='Website' />
            <label>About</label>
            <textarea 
              placeholder='About Me'
              className='common-textArea'
              onChange={getInput}
              rows={5}
              name='aboutMe'
              value={editInputs.aboutMe}  
            />
            <label>Skills</label>
            <input onChange={getInput} value=
            {editInputs.skills} name="skills" className='common-input' placeholder='Skills' />
        </div>
        <div className='save-container'>
            <button className='save-btn' onClick={updateProfileData}>Save</button>
        </div>
    </div>
  )
}

import React, { useMemo, useState } from 'react'
import './index.scss'
import { getSingleStatus, getSingleUser } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from "react-icons/hi";
import { uploadImageAPI } from '../../../api/ImageUpload';
import FileUploadModal from '../FileUploadModal';

export default function ProfileCard({ currentUser, onEdit }) {
  let location = useLocation();
  const [allStatus, setAllStatus] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [modalOpen, setModalOpen] = useState(false)
  const [progress, setProgress] = useState(0)

  const getImage = (event) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser?.userID, setModalOpen, setProgress, setCurrentImage);
  }
  
  useMemo(() => {
    if(location?.state?.email){
      getSingleStatus(setAllStatus, location?.state?.email)
    }

    if(location?.state?.email){
      getSingleUser(setCurrentProfile, location?.state?.email)
    }
  }, [])


  return (
    <>
      <FileUploadModal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        getImage={getImage}
        uploadImage={uploadImage}
        currentImage={currentImage}
        progress={progress}
     />
      <div className='profile-card'>
        <div className='edit-btn'>
          {currentUser?.userID === currentProfile?.id &&
            <HiOutlinePencil className="edit-icon" onClick={onEdit} />
            }
        </div>
          <div className='profile-info'>
            <div>
              <img 
                src={
                    Object.values(currentProfile).length === 0
                      ? currentUser.imageLink
                      : currentProfile?.imageLink
                } 
                alt="profile-img" 
                className='profile-image'
                onClick={() => setModalOpen(true)}
              />
              <h3 className='userName'>
                {Object.values(currentProfile).length === 0
                  ? currentUser.name
                  : currentProfile?.name}
              </h3>
              <p className='heading'>
                {Object.values(currentProfile).length === 0
                  ? currentUser.headline
                  : currentProfile?.headline}
              </p>
              <p className='location'>
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country}`
                  : `${currentProfile?.city}, ${currentProfile?.country}`}
              </p>
              <a 
                className='website'
                target='_blank'
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                } rel="noreferrer"
              >
                {Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website}
              </a>
            </div>

            <div className='right-info'>
              <p className='college'>
                {Object.values(currentProfile).length === 0
                  ? currentUser.college
                  : currentProfile?.college}
              </p>
              <p className='company'>
                {Object.values(currentProfile).length === 0
                  ? currentUser.company
                  : currentProfile?.company}
              </p>
            </div>
          </div>
          <p className='about-me'>
                {Object.values(currentProfile).length === 0
                  ? currentUser.aboutMe
                  : currentProfile?.aboutMe}
          </p>

          <p className='skills'>
            <span className='skill-label'>Skills</span>&nbsp;
                {Object.values(currentProfile).length === 0
                  ? currentUser.skills
                  : currentProfile?.skills}
          </p>
    </div>

    <div className='post-status-main'>
          {allStatus
            .map((posts) => {
            return (
              <div key={posts.id}>
                <PostCard posts={posts} />
              </div>
            )
          })}
        </div>
    </>
  )
}

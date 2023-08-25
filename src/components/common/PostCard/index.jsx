/* eslint-disable react/no-danger-with-children */
import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom'
import LikeButton from '../LikeButton';
import { deletePost, getAllUsers, getConnections, getCurrentUser } from '../../../api/FirestoreAPI';
import { BsPencil, BsTrash } from 'react-icons/bs'
import { Modal } from 'antd';

export default function PostCard({ posts, id, getEditData }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [imageModal, setImageModal] = useState(false)

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers)
  }, [])

  useEffect(() => {
    getConnections(currentUser.userID, posts.userID, setIsConnected)
  }, [currentUser.userID, posts.userID])

  return (isConnected || posts.userID === currentUser.userID) && (  
    <div className='post-card' key={id}>
      <div className='post-image-wrapper'>
        {currentUser.userID === posts.userID && (
          <div className='action-container'>
            <BsPencil size={20} className='action-icon' onClick={() => getEditData(posts)} />
            <BsTrash size={20} className='action-icon' onClick={() => deletePost(posts.id)} />
        </div>
        )}
        <img 
          src={
            allUsers
            .filter((item) => item.id === posts.userID)
            .map((item) => item.imageLink)[0]} 
            alt="profile-img"
            className='profile-image' 
        />
        <div>
          <p 
            className='name' 
            onClick={() => navigate("/profile", {
              state: { id: posts?.postID, email: posts.userEmail },
            })} >
              {allUsers.filter((user) => user.userID === posts.userID)[0]?.name}
          </p>
          <p className='headline'>{allUsers.filter((user) => user.userID === posts.userID)[0]?.headline}</p>
          <p className='timestamp'>{posts.timeStamp}</p>
        </div>
      </div>
      {posts.postImage && (
        <img src={posts.postImage} alt="post-img" onClick={() => setImageModal(true)} className='post-image' />
      )}
      <p 
        className='status'
        dangerouslySetInnerHTML={{__html: posts.status}}  
      ></p>

      <LikeButton userId={currentUser?.userID} postId={posts.id} currentUser={currentUser} />

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img src={posts.postImage} alt="post-img" onClick={() => setImageModal(true)} className='post-image modal' />
      </Modal>
    </div>
  )
}

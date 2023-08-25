import React, { useMemo, useState } from 'react'
import './index.scss'
import ModalComponent from '../Modal'
import { getStatus, postStatus, updatePost } from '../../../api/FirestoreAPI'
import PostCard from '../PostCard'
import { getCurrentTimeStamp } from '../../../helpers/useMoment'
import { getUniqueID } from '../../../helpers/getUniqueId'
import { uploadPostImage } from '../../../api/ImageUpload'

export default function PostStatus({ currentUser }) {
  // let userEmail = localStorage.getItem("userEmail");
  const [modalOpen, setModalOpen] = useState(false)
  const [status, setStatus] = useState('')
  const [allStatus, setAllStatus] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  const [postImage, setPostImage] = useState('')

  const sendStatus = async () => {
    let object = {
      status: status,
      timeStamp: getCurrentTimeStamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueID(),
      userID: currentUser.userID,
      postImage: postImage,
    }
    await postStatus(object);
    await setModalOpen(false);
    await setStatus("");
    setIsEdit(false);
  }

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
    setIsEdit(false);
  }

  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  }

  useMemo(() => {
    getStatus(setAllStatus);
  }, [])

  return (
    <div className='post-status-main'>
      <div className='user-details'>
        <img src={currentUser.imageLink} alt="imageLink" />
        <p className='name'>{currentUser.name}</p>
        <p className='heading'>{currentUser.headline}</p>
      </div>
        <div className='post-status'>
            <img className='post-image' src={currentUser.imageLink} alt="imageLink" />
            <button className='open-post-modal' onClick={() => setModalOpen(true)}>Start a Post</button>
        </div>
        <ModalComponent 
          status={status} 
          setStatus={setStatus} 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen}
          sendStatus={sendStatus}
          isEdit={isEdit}
          updateStatus={updateStatus}
          setIsEdit={setIsEdit}
          uploadPostImage={uploadPostImage}
          setPostImage={setPostImage}
          postImage={postImage}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
        />

        <div>
          {allStatus.map((posts) => {
            return (
              <div key={posts.id}>
                <PostCard posts={posts} getEditData={getEditData} />
              </div>
            )
          })}
        </div>
    </div>
  )
}

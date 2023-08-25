import React, { useState } from 'react';
import { Button, Modal, Progress } from 'antd';
import './index.scss';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';

const ModalComponent = ({ 
  modalOpen, 
  setModalOpen, 
  setStatus, 
  status, 
  sendStatus, 
  isEdit, 
  updateStatus, 
  setIsEdit,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost 
}) => {
  const [progress, setProgress] = useState(0)
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false)
          setIsEdit(false)
          setPostImage("")
          setCurrentPost({})
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false)
          setIsEdit(false)
          setPostImage("")
          setCurrentPost({})
        }}
        footer={[
            <Button
              onClick={isEdit ? updateStatus : sendStatus}
              key="submit"
              type="primary"
              disabled={status.length > 0 && status !== '<p><br></p>' ? false : true}
            >
              {isEdit ? "Update" : "Post"}
            </Button>,
          ]}
      >
        
        <div className='posts-body'>

          <ReactQuill 
            theme='snow' 
            value={status} 
            onChange={setStatus} 
            className='modal-input' 
            placeholder='What do you want to talk about?' 
          />

            {progress === 0 || progress === 100 ? (
              <></>
            ) : (
              <div className='progress-bar'>
                  <Progress type="circle" percent={progress} />
              </div>
            )}

          {(postImage?.length > 0 || currentPost?.postImage?.length)&& (
            <img src={postImage || currentPost?.postImage} alt="post-img" className='preview-image' />
          )}
        </div>

        <label htmlFor='pic-upload'>
          <AiOutlinePicture size={35} className='picture-icon' />
        </label>
        <input type="file" id='pic-upload' onChange={(event) => uploadPostImage(event.target.files[0], setPostImage, setProgress)} hidden />
      </Modal>
    </>
  );
};

export default ModalComponent;
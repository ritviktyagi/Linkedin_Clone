import React, { useMemo, useState } from 'react'
import './index.scss'
import { AiFillLike, AiOutlineComment, AiOutlineLike } from 'react-icons/ai'
import { getComments, getLikesByUser, likePost, postComment } from '../../../api/FirestoreAPI'
import { getCurrentTimeStamp } from '../../../helpers/useMoment'

export default function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [showCommentBox, setshowCommentBox] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])

    const handleLike = () => {
        likePost(userId, postId, liked);
    }

    const getComment = (event) => {
        setComment(event.target.value);
    }

    const addComment = () => {
        postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
        setComment("");
    }

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setComments);
    }, [userId, postId])

  return (
    <div className='like-container' key={postId}>
        {
            liked && likesCount === 1 ? (
                <p>You have liked this post</p>
            ) : liked && likesCount > 1 ? (
                <p>You and {likesCount - 1} other people have liked this post.</p>
            ) : likesCount === 1 && !liked ? (
                <p>1 person has liked this post.</p>
            ) : (
                <p>{likesCount} People have liked this Post</p>
            )
        }
        <div className='hr-line'>
            <hr />
        </div>
        <div className='like-comment'>
            <div className='likes-comment-inner' onClick={handleLike}>
                {
                    liked ? (
                        <AiFillLike size={30} color='#0a66c2' />
                    ) : (
                        <AiOutlineLike size={30} />
                    )
                }
                {
                    liked ? (
                        <p className='blue'>Liked</p>                    
                    ) : (
                        <p className='black'>Like</p>
                    )
                }
            </div>
            <div className='likes-comment-inner' onClick={() => setshowCommentBox(!showCommentBox)}>
                <AiOutlineComment size={30} color={showCommentBox ? '#0a66c2' : '#212121'} />
                <p className={showCommentBox ? "blue" : "black"}>Comment</p>
            </div>
        </div>
        {
            showCommentBox ? (
                <>
                    <input 
                        placeholder='Add a Comment' 
                        className='comment-input'
                        onChange={getComment}
                        name='comment'
                        value={comment}
                    />
                    <button className='add-comment-btn' onClick={addComment}>Add Comment</button>

                    {comments.length > 0 ? (
                        comments.map((comment, idx) => {
                            return (
                                <div className='all-comments' key={idx}>
                                    <p className='name'>{comment.name}</p>
                                    <p className='comment'>{comment.comment}</p>
                                    <p className='timestamp'>{comment.timeStamp}</p>
                                </div>
                            )
                        })
                    ) : ("")}
                </>
            ) : (
                <></>
            )
        }
    </div>
  )
}

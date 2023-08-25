import React from 'react'
import PostStatus from './common/PostUpdate'

export default function HomeComponent({ currentUser }) {
  return (
    <div>
      <PostStatus currentUser={currentUser} />
    </div>
  )
}

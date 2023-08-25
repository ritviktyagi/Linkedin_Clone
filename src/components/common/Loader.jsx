import { Space, Spin } from 'antd'
import React from 'react'

export default function Loader() {
  return (
    <div className='loader'>
        <p>Loading..Please wait..</p>
        <Space size="middle">
            <Spin size='large' />
        </Space>
    </div>
  )
}

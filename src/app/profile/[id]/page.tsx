import { Parkinsans } from 'next/font/google'
import React from 'react'

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params // need to await params
  return (
    <div>
      <div>Welcome to Profile of</div>
      <span className='bg-amber-600 rounded-b-md text-black p-2'>{id}</span>
    </div>
  )
}

export default ProfilePage

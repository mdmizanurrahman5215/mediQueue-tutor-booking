import React from 'react'
import MyTutorsPage from '../components/pages/MyTutorsPage'


export const metadata = {
  title: 'My Tutors',
  description: 'View and manage your assigned tutors.',
}

const Mytutors = () => {
  return (
    <div>
      <MyTutorsPage />
    </div>
  )
}

export default Mytutors
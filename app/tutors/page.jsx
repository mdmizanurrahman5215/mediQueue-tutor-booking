import React from 'react'
import TutorsPage from '../components/pages/TutorsPage'
import { getTutors } from "../lib/data";

const TutorHomePage = async() => {
  const tutors = await getTutors()
  console.log({tutors});
  
  return (
    <div>
      <TutorsPage tutors={tutors}/>
    </div>
  )
}

export default TutorHomePage

import TutorDetailsPage from '@/app/components/pages/TutorDetailsPage'
import React from 'react'

const page = async({params}) => {
  const { id } = await params;
    console.log({id});
    
  return (
    <div>
      <TutorDetailsPage id = {id}/>
    </div>
  )
}

export default page

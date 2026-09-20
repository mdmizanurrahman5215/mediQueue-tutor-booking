import AddTutorForm from '@/app/components/pages/AddTutorPage'
import { Loader2 } from 'lucide-react'
import React, { Suspense } from 'react'

const AddTutorPage = () => {
  return (
    <div>
      <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <AddTutorForm/>
    </Suspense>
    </div>
  )
}

export default AddTutorPage

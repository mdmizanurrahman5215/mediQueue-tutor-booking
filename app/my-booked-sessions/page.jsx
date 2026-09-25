import React from 'react'
import MyBookingsPage from '../components/pages/MyBookingsPage'

export const metadata = {
  title: 'My Bookings | Session Booking',
  description: 'View and manage your upcoming session bookings and schedules.',
}

const SessionBookingPage = () => {
  return (
    <div>
      <MyBookingsPage />
    </div>
  )
}

export default SessionBookingPage
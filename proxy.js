import { NextResponse } from 'next/server'
 // path to your Better Auth server instance
import { headers } from "next/headers";
import { auth } from './app/lib/auth';

 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
if(!session){
    return NextResponse.redirect(new URL('/login', request.url))
}
  
}
 
 
export const config = {
  matcher: ['/add-tutor', '/add-tutor', '/my-tutors', '/my-booked-sessions']
}
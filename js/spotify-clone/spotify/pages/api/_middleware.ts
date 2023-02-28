import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware (req: NextRequest) {
    //Token exists if user is authenticated
    const token = await getToken({ req, secret: process.env.JWT_SECRET})
    const { pathname } = req.nextUrl

    //Allow request if:
    // 1)Token exists
    // 2)User is trying to authenticate 
    if(pathname.includes('/api/auth') || token) {
        //allows request to be made
        return NextResponse.next()
    }
    return NextResponse.redirect('/login')
}
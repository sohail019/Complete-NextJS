//todo: Setups middleware for our app that handles authentication and page redirection based on user's login status

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; //? function to retrieve user auth token from Next auth
export {default} from "next-auth/middleware"

//? Configuration object for speicifying which routes should apply the middleware
export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

//? Middleware function that runs before each request to the matched routes 
export async function middleware(request: NextRequest) {
    
    //* Attempt to get the auth token(if any) for the incoming request
    const token = await getToken({req: request})

    //* Extract the url of the incoming request
    const url = request.nextUrl


    //todo: Check if the user is already authenticated(i.e token exists)
    //todo: and if they are trying to access sign-in, sign-up, verify or home page
    if(
        token  && //? If the user is authenticated (token exists)
        (url.pathname.startsWith('/sign-in')) || //? user is trying to access sign-in page
        (url.pathname.startsWith('/sign-up')) || //? user is trying to access sign-up page
        (url.pathname.startsWith('/verify')) || //? user is trying to access verification page
        (url.pathname === '/') //? user is trying to access home page
    ) {

        //* Redirect the authenticated user to the dashboard instead
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    //todo: Check if the user is not authenticated(i.e. token does not exist)
    //todo: and they are using to access dashboard page
    if(!token && url.pathname.startsWith('/dashboard')){
        //? Redirect the unauthenticated user to the sign in page
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    //! If none of the above conditions apply, allow the request to proceed as normal
    return NextResponse.next()
}
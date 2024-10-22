//todo: Create AuthProvider using SessionProvider from next-auth/react, which is used to provide authentication state(Session) to the rest of our app.
'use client'

import { SessionProvider } from "next-auth/react"

//* Define a FC which takes in `children` as a prop, which represents the nested components or content with the AuthProvider
export default function AuthProvider({
    children
}: {
    children: React.ReactNode //? Specifies that the children prop is of type React.ReactNode
}){
    return (
        // ? The SessionProvider wraps our app' content
        // ? It ensures the session data(like the user's authentication status) is accessible throughout the component tree.
        <SessionProvider>
            {children} //? render the children components
        </SessionProvider>
    )
}
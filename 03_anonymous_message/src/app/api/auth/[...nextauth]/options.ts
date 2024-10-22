import dbConnect from "@/lib/dbConnect";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/model/User";

export const authOptions: NextAuthOptions = {
  //? provider is an array of authentication providers for signing in (e.g. Google, Facebook, Twitter, GitHub, Email, etc) in any order. This can be one of the built-in providers or an object with a custom provider.
  providers: [
    //? CP allows us to handle signing in with the arbitrary credentials, such as username and password, domain or two factor authention.
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any): Promise<any> {
        //* Connect DB first
        await dbConnect();

        try {
          //* Get user
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          //! If user not found
          if (!user) {
            throw new Error("No User Found");
          }

          //! If user is found but not verified
          if (!user.isVerified) {
            throw new Error("Please Verify Your Account Before Logging In");
          }

          //* Now let's compare password this credentials password and user's password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          //* If Password matches, return user else throw error of password not matches
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password Not Matches");
          }
        } catch (error: any) {
          //! If connection fails
          throw new Error(error);
        }
      },
    }),
  ],
  //? Callbacks are async functions we can use to control what happens when an action is performed, these are extremely powerful, especially in scenarios involving JWT as they allow us to implement access controls without a database and to integrate with external databases or APIs
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  //? Nextjs automatically creates simple, unbranded authentication pages for handling Signin, Signout, Email verification and displaying error messages.
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

"use client";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback, useDebounceValue } from "usehooks-ts";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// useToast
// import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@uidotdev/usehooks";

export default function SignUp() {
  const [username, setUsername] = useState(""); //? state variable to hold curr username
  const [usernameMessage, setUsernameMessage] = useState(""); //? to store feedback msgs regarding uniquness of username

  const [isCheckingUsername, setIsCheckingUsername] = useState(false); //? flag - if username uniqueness is being checked

  const [isSubmitting, setIsSubmitting] = useState(false); //? flag - if form is currently being submitted

  //? router object from Next.js , used for programmatic navigation
  const router = useRouter();

  //? A custom hook to debounce the `username` state, delaying the username check until the user stops typing.
  const debounced = useDebounce(username, 500);

  //? Deconstructuring the toast function to show noti msgs to users
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    //* Tells React Hook Form to validate the form inputs using the Zod schema.
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debounced) {
        setIsCheckingUsername(true); //* Set loading state to true before making the API request.

        setUsernameMessage(""); //* Clear any previous messages about the username's validity.

        try {
          //* Sends a GET request to check if the username is unique.
          const response = await axios.get(
            `/api/check-username-unique?username=${debounced}`
          );
          //* Sets the response message (e.g., "Username is unique" or "Username already taken").
          setUsernameMessage(response.data.message);
        } catch (error) {
          //! Type-casting error to `AxiosError` to access typed response data.
          const axiosError = error as AxiosError<ApiResponse>;

          setUsernameMessage(
            axiosError.response?.data.message ?? "Error Checking Username"
          );
          console.log(axiosError)
        } finally {
          setIsCheckingUsername(false); //* Ends the loading state after checking the username.
        }
      }
    };

    checkUsernameUnique();
  }, [debounced]);

  //? The effect runs every time the debounced username changes.

  //* Function to handle form submission
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    //? Sets the form submission state to true to disable the submit button.

    try {
      //* Sends a POST request to create a new user with the form data.
      await axios.post("/api/sign-up", data);
    } catch (error) {
      console.error("Error during sign-up", error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;
      ("There was a problem with your sign-up. Please try again.");

      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); //* Ends the form submission state.
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Anonymous Message
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                  />
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is available"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    name="email"
                  />
                  <p className="text-muted text-gray-400 text-sm">
                    We will send you a verification code
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input {...field} name="password" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

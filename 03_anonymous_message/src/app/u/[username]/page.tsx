"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Profile() {
    const router = useRouter()
    const [isSuggestLoading, setIsSuggestLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams<{username: string}>()
    const {username} = params
    const {toast} = useToast()
    const [suggestedMessages, setSuggestedMessages] = useState([])
    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema)
    })

    const messageContent = form.watch('content')

    const handleMessageClick = async(message: string) => {
        form.setValue('content', message)
    }

    const fetchSuggestedMessages = async () => {
      setIsSuggestLoading(true);
      try {
        const response = await axios.post("/api/suggest-messages");
        console.log(response.data);
        setSuggestedMessages(response.data.suggestedMessages);
      } catch (error) {
        console.log("Error while suggesting message", error);
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast({
          title: "Error Suggesting Message",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsSuggestLoading(false);
      }
    };

    const onSubmit = async (data: z.infer<typeof messageSchema>) => {
      setIsLoading(true);
      try {
        const response = await axios.post<ApiResponse>("/api/send-message", {
          ...data,
          username: params.username,
        });
        toast({
          title: response.data.message,
          variant: "default",
        });
        form.reset({ ...form.getValues(), content: "" });
      } catch (error) {
        console.log("Error while signup error", error);
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message;
        toast({
          title: "Add Message Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Public Profile Link
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex flex-col justify-center">
                <FormLabel className="text-xl">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <Button
            onClick={fetchSuggestedMessages}
            className="my-4"
            disabled={isSuggestLoading}
          >
            Suggest Messages
          </Button>
          <p>Click on any message below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">Messages</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {suggestedMessages.map((message, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 text-wrap"
                onClick={() => handleMessageClick(message)}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Message Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}

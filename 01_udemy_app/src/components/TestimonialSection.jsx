import React from 'react'
import { InfiniteMovingCards } from './ui/infinite-moving-cards'

const testimonials = [
  {
    quote:
      "This course changed my career! The instructor explained complex topics in a way that made them easy to understand. I went from knowing nothing about coding to landing my first job as a web developer.",
    name: "John Doe",
    title: "Full-Stack Web Development",
  },
  {
    quote:
      "I can't believe how much I've learned in such a short time. The hands-on projects were fantastic, and now I feel confident in my ability to build my own applications from scratch.",
    name: "Sarah Thompson",
    title: "Python for Data Science",
  },
  {
    quote:
      "The instructor was brilliant, and the content was well-structured. I loved the practical assignments, and the real-world examples helped me grasp the core concepts easily.",
    name: "Michael Lee",
    title: "JavaScript Mastery",
  },
  {
    quote:
      "Taking this course was the best decision I made for my career. It’s packed with valuable content, and the instructor’s teaching style kept me engaged throughout. Highly recommend!",
    name: "Emma Smith",
    title: "AWS Certified Solutions Architect",
  },
  {
    quote:
      "This course offers more value than most university classes! The hands-on labs and real-world case studies helped me quickly grasp the material and implement what I learned.",
    name: "Raj Patel",
    title: "DevOps Masterclass",
  },
];


export default function TestimonialSection() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">
        What Our Learners Are Saying
      </h2>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
}

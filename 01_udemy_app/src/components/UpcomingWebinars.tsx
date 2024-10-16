"use client";
import React from "react";
import { HoverEffect } from "./ui/card-hover-effect";
import Link from "next/link";

export const featuredWebinars = [
  {
    title: "Mastering React",
    description:
      "Join this webinar to explore advanced React concepts, including hooks, context API, and state management, with live coding sessions.",
    link: "https://udemy.com/course/mastering-react",
  },
  {
    title: "Python for Data Science",
    description:
      "Learn how Python is used in data science, covering libraries like Pandas, NumPy, and Matplotlib with real-world examples and projects.",
    link: "https://udemy.com/course/python-for-data-science",
  },
  {
    title: "JavaScript Deep Dive",
    description:
      "A comprehensive webinar focused on mastering JavaScript concepts such as closures, async programming, and DOM manipulation.",
    link: "https://udemy.com/course/javascript-deep-dive",
  },
  {
    title: "AWS Cloud Essentials",
    description:
      "Get an introduction to AWS Cloud services and learn how to design, deploy, and scale applications in the cloud environment.",
    link: "https://udemy.com/course/aws-cloud-essentials",
  },
  {
    title: "Full-Stack Development with Node.js",
    description:
      "Dive deep into full-stack development with Node.js, covering Express, MongoDB, and building RESTful APIs.",
    link: "https://udemy.com/course/full-stack-development-nodejs",
  },
  {
    title: "Cybersecurity Fundamentals",
    description:
      "Explore the basics of cybersecurity, including network security, encryption, and ethical hacking, with hands-on labs and tools.",
    link: "https://udemy.com/course/cybersecurity-fundamentals",
  },
];


export default function UpcomingWebinars() {
  return (
    <div className="p-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            FEATURED WEBINARS
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Enhance Your Courses Journey
          </p>
        </div>
        <div className="mt-10">
          <HoverEffect
            items={featuredWebinars.map((webinar) => ({
              title: webinar.title,
              description: webinar.description,
              link: "/",
            }))}
          />
        </div>
         <div className="text-center">
        <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#A435F0] to-blue-500 group-hover:from-[#A435F0] group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            View All Webinars
          </span>
        </button>
      </div>
      </div>
    </div>
  );
}

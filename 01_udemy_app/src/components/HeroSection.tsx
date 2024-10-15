import Link from "next/link";
import { Spotlight } from "./ui/Spotlight";
import { Button } from "./ui/moving-border";

export default function HeroSection() {
  return (
    <div className="h-auto md:h-[45rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#A435F0"
      />
      <div className="p-4 relative z-10 w-full text-center">
        <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
          Welcome back, Sohail
        </h1>
        <p className="mt-4 font-normal text-base md:text-3xl text-neutral-300 max-w-lg mx-auto">
          What to learn next Our top pick for you
        </p>
        <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">
          Sale ends today| Let other learners help you make your next pick. Get
          highly rated courses from ₹449.
        </p>
        <div className="mt-4">
          <Link href="/courses">
            <Button
              borderRadius="1.75rem"
              // borderClassName="border-4"
              // className="bg-white dark:bg-[#A435F0] text-black dark:text-white border-neutral-200 dark:border-slate-800"
              className="bg-white border-4 dark:bg-white text-black dark:text-black dark:border-slate-800"
            >
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

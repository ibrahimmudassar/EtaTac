import Link from "next/link";
import DefaultLayout from "@/layouts/default";

import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { ColourfulText } from "@/components/ui/colourful-text";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const projects = [
    {
      title: "Resources",
      description:
        "A compilation of the best information we've come across. From external resources to breakdowns in our blog.",
      link: "/resources",
    },

    {
      title: "About",
      description: "A quick summary of who we are",
      link: "/about",
    },
    {
      title: "FAQ",
      description:
        "A quick list of all the most frequently asked questions that we get",
      link: "/faq",
    },
  ];

  return (
    <DefaultLayout>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-svh">
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Modern <ColourfulText text="Mental Math" /> <br /> For The Modern
          Student.
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
          Train your mental math skills with customizable problems. Fit for
          children and for quants. Revolutionize the way you learn.
        </p>
        <div className="py-6">
          <Button
            size="lg"
            as={Link}
            href="play/arithmetic"
            color="primary"
            variant="shadow"
          >
            Play Now!
          </Button>
        </div>
      </BackgroundLines>
      <div className="">
        <h2 className="font-bold text-4xl flex justify-center w-full">
          Quick Links
        </h2>
        <HoverEffect items={projects} />
      </div>
    </DefaultLayout>
  );
}

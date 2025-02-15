import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import { Navbar } from "@/components/navbar";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import SpeechToText from "@/components/speech";
import { BackgroundLines } from "@/components/ui/background-lines";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Button, ButtonGroup } from "@heroui/button";
import { ColourfulText } from "@/components/ui/colourful-text";

export default function IndexPage() {
  const projects = [
    {
      title: "Secrets of Mental Math",
      description:
        "We break down some secrets that industry insiders keep from the masses about learning mental math",
      link: "resources/secrets_of_mental_math",
    },

    {
      title: "About",
      description: "A quick summary of who we are",
      link: "about",
    },
    {
      title: "FAQ",
      description:
        "A quick list of all the most frequently asked questions that we get",
      link: "/faq",
    },
  ];

  return (
    <>
      <Navbar />
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
            href="play_arithmetic"
            color="primary"
            variant="shadow"
          >
            Play Now!
          </Button>
        </div>
      </BackgroundLines>
      <div className="">
        <h2 className="font-bold text-4xl flex justify-center w-full">
          Resources
        </h2>
        <HoverEffect items={projects} />
      </div>
    </>
  );
}

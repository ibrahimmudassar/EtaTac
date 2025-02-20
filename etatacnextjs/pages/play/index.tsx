import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Link from "next/link";

export default function PlayPage() {
  const links = [
    {
      title: "Arithmetic",
      description:
        "Practice problems with the 4 basic operators and become a genius in no time!",
      link: "/play/arithmetic",
    },
    {
      title: "Quadratic",
      description:
        "COMING SOON: Factor quadradic equations in your head and be a master at algebra. Example: x²−5x−14 => x=7,-2",
      link: "#",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Play</h1>
          <div className="flex flex-row py-7 gap-4 flex-wrap justify-center">
            {links.map((url, index) => (
              <Card
                as={Link}
                href={url.link}
                key={index}
                className="py-4 min-w-12 grow"
              >
                <CardHeader className="pb-0 pt-2 px-4 flex-col flex justify-center">
                  <h4 className="font-bold text-large">{url.title}</h4>
                  <small className="text-default-500">{url.description}</small>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

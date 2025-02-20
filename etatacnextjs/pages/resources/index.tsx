import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import Link from "next/link";

export default function Blog() {
  const links = [
    {
      title: "Secrets of Mental Math",
      description:
        "We break down some secrets that industry insiders keep from the masses about learning mental math",
      link: "/resources/secrets_of_mental_math",
    },
    {
      title: "Statistics of Mental Math",
      description:
        "We break down some secrets that industry insiders keep from the masses about learning mental math",
      link: "/resources/mental_math_statistics",
    },
    {
      title: "Best Mental Math Resources",
      description:
        "A quick summary of some of the best resources we've compiled on mental math",
      link: "/resources/best_mental_math_resources",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ size: "lg", color: "yellow" })}>
            🚧Resources🚧
          </h1>
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
                {/* <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://heroui.com/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody> */}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

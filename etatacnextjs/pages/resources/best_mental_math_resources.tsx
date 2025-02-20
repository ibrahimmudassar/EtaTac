import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import Link from "next/link";

export default function BlogBestMentalMathResources() {
  const location = usePathname();
  const result = location.split("/").map((_, index) =>
    location
      .split("/")
      .slice(0, index + 1)
      .join("/")
  );

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <Breadcrumbs className="pb-4">
            {result.map((r, index) => (
              <BreadcrumbItem key={index} href={r == "" ? "/" : r} as={Link}>
                {r == "" ? "Home" : r.split("/").slice(-1)}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>

          <h1 className={title({ size: "lg", color: "yellow" })}>
            Secrets of Mental Math
          </h1>
          <div className="flex flex-col py-5 gap-5">
            <h2 className="text-2xl">
              The &quot;Secrets&quot; of Mental Math: Techniques Over Tricks
            </h2>
            <p>
              Mental math often appears magical, but its foundation lies in
              practical techniques that simplify complexity. Strategies like
              breaking numbers into manageable parts transform daunting
              calculations into easier steps.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

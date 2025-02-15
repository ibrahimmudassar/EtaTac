import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function Blog() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ size: "lg", color: "yellow" })}>
            🚧Resources🚧
          </h1>
          <p className="flex py-4">
            this section is still a work in progress. Please head to the
            homepage!
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}

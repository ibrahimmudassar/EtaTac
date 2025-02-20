import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function DocsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>About</h1>
          <h1 className="py-6">
            This site was made because I wanted to make a successor to Zetamac,
            I added features like voice answering and data analysis. There are
            plans to create accounts in the future for persistent data storage
          </h1>
          <h1 className="py-6">
            This is a good resource:
            https://worldmentalcalculation.com/learning-training/
          </h1>
        </div>
      </section>
    </DefaultLayout>
  );
}

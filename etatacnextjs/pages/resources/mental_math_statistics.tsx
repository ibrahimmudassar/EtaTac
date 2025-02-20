import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function BlogMentalMathStatistics() {
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
            Mental Math Statistics
          </h1>
          <div className="flex flex-col py-5 gap-5">
            <p>
              Here are 10 evidence-based benefits of mental math for students
              and professionals, supported by research and expert insights from
              the provided sources:
            </p>
            <h2 className="text-2xl">Improves Mathematical Reasoning</h2>
            <p>
              A study of 118 fifth-grade students found a significant positive
              correlation between mental computation and mathematical reasoning,
              indicating stronger problem-solving abilities.
            </p>
            <h2 className="text-2xl">
              Enhances Cognitive Resources in Early Education
            </h2>
            <p>
              First-grade students who quickly recalled addition facts
              demonstrated more cognitive capacity to learn other skills,
              freeing mental resources for complex tasks.
            </p>
            <h2 className="text-2xl">Boosts Emotional Health</h2>
            <p>
              Brain scans of 186 undergraduates revealed that engaging in mental
              math activates the prefrontal cortex, which is linked to better
              emotional regulation and reduced anxiety.
            </p>
            <h2 className="text-2xl">
              Accelerates Standardized Test Performance
            </h2>
            <p>
              Proficiency in mental math is associated with higher standardized
              test scores due to improved speed, accuracy, and logical
              reasoning.
            </p>
            <h2 className="text-2xl">Prepares for High-Demand Careers</h2>
            <p>
              Over 30% of the fastest-growing careers (e.g., data science,
              software development, cybersecurity) require strong math skills,
              making mental math a critical professional asset.
            </p>
            <h2 className="text-2xl">Strengthens Financial Literacy</h2>
            <p>
              Mental math aids in budgeting, loan calculations, and financial
              decision-making, with studies showing it directly improves
              real-world financial management skills.
            </p>
            <h2 className="text-2xl">Reduces Computational Errors</h2>
            <p>
              Regular mental math practice decreases error rates in
              problem-solving by fostering attention to detail and number
              relationships.
            </p>
            <h2 className="text-2xl">Enhances Workplace Efficiency</h2>
            <p>
              Professionals in fields like engineering and finance report faster
              data analysis and decision-making, saving time in tasks like
              budgeting or project estimation.
            </p>
            <h2 className="text-2xl">Builds Confidence in Academic Settings</h2>
            <p>
              Students practicing mental math show increased participation and
              self-esteem, with educators observing a 40% rise in classroom
              engagement.
            </p>
            <h2 className="text-2xl">Supports Long-Term Cognitive Health</h2>
            <p>
              Research suggests that consistent mental math practice delays
              cognitive decline, improving memory and concentration in both
              students and adults. For further details, refer to the sources
              discussing studies, classroom observations, and professional
              applications.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function FAQ() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center w-full">
          <h1 className={title()}>FAQ</h1>
          <div className="py-5">
            <Accordion variant="splitted">
              <AccordionItem
                key="1"
                aria-label="How to get better at mental math?"
                title="How to get better at mental math?"
              >
                We&apos;ve outlined here pretty well what it takes to be good at
                mental math. TLDR: do EtaTac for an hour a day and you will be a
                genius in no time!
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Mental Math Strategies"
                title="Mental Math Strategies"
              >
                Some of the most important mental math strategies can be
                practiced on etatac. For example, we have quadratic problems so
                that you can quickly factor a quadratic polynomial.
                Additionally, we have an arithmetic mental math simulator that
                is perfect for anyone from an elementary school student first
                learning their multiplication tables to a quant trader who wants
                to estimate their greeks faster!
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Abacus Mental Math"
                title="Abacus Mental Math"
              >
                An abacus is definitely a useful device when learning mental
                math. However, since you can&apos;t carry one around with you
                everywhere you go, we suggest EtaTac. All of us carry our phones
                with us, and you can practice wherever you are!
              </AccordionItem>
              <AccordionItem
                key="4"
                aria-label="Is mental math useful?"
                title="Is mental math useful?"
              >
                Mental math, or the ability to perform calculations in
                one&apos;s head, is a crucial skill with numerous benefits. It
                enhances mathematical abilities, sharpens memory, improves
                focus, and boosts problem-solving skills. Mental computation
                allows for a better understanding of how numbers work, promoting
                number sense and flexibility in calculations. It also encourages
                visualization, memorization, and pattern recognition to solve
                mathematical problems. Incorporating mental mathematics can
                improve mathematical fluency, boost confidence, and increase
                understanding of mathematics in the real world. Moreover,
                studies suggest that engaging the brain&apos;s prefrontal cortex
                during mental math exercises is linked to better emotional
                health.
              </AccordionItem>
              <AccordionItem
                key="5"
                aria-label="Is mental good for your brain?"
                title="Is mental math good for your brain?"
              >
                Mental math provides several cognitive benefits, including
                enhanced problem-solving skills, numerical fluency, and logical
                thinking. Mental math strengthens neural pathways in the brain,
                improving memory, concentration, and overall cognitive
                functions. Furthermore, engaging in mathematical activities
                promotes neuroplasticity, which is the brain&apos;s ability to
                adapt and grow, enhancing neural connections and fostering the
                development of new brain cells. Mental calculations stimulate
                both sides of the brain, improving the ability to think and
                reason sequentially. Studies also suggest that mental math can
                improve working memory and may contribute to better emotional
                health by engaging specific areas of the brain. EtaTac is
                literally making you&apos;re brain healthier!
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

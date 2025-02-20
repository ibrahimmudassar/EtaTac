"use client";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import SpeechToText from "@/components/speech";

export default function PlayArithmetic() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <SpeechToText />
      </section>
    </DefaultLayout>
  );
}

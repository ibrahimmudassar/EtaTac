import type { AppProps } from "next/app";
import { ArrayProvider } from "@/components/global";
import { Analytics } from "@vercel/analytics/next";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Analytics />
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <ArrayProvider>
            <ToastProvider />
            <Component {...pageProps} />
          </ArrayProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

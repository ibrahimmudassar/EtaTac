import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <meta
        name="google-site-verification"
        content="E318jQv9jD_Bv782_S7xZ6DlTPsXZ828IvgM0mqIMUQ"
      />

      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <meta
        property="og:image"
        content="https://eta-tac.vercel.app/Pacioli.jpg"
      />
      <meta property="og:site_name" content="EtaTac" />
      <meta property="og:url" content="https://eta-tac.vercel.app/" />
      <meta property="og:type" content="website" />
      <link rel="icon" type="image/png" href="/mathoperations.png" />
      <link rel="canonical" href="https://eta-tac.vercel.app/" />
    </NextHead>
  );
};

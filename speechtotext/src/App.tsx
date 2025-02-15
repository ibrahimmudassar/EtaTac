import { Route, Routes } from "react-router-dom";
import { ArrayProvider } from "@/components/global";

import IndexPage from "@/pages/index";
import DataPage from "@/pages/data";
import PlayArithmetic from "@/pages/docs";
import Blog from "@/pages/blog";
import BlogSecretsOfMentalMath from "@/pages/BlogSecretsOfMentalMath";
import FAQ from "@/pages/FAQ";

import AboutPage from "@/pages/about";

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <ArrayProvider>
        <Routes>
          <Route element={<IndexPage />} path="/" />
          <Route element={<DataPage />} path="data" />
          <Route element={<Blog />} path="resources" />
          <Route
            element={<BlogSecretsOfMentalMath />}
            path="resources/secrets_of_mental_math"
          />
          <Route element={<FAQ />} path="faq" />

          <Route element={<PlayArithmetic />} path="play_arithmetic" />
          {/* <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" /> */}
          <Route element={<AboutPage />} path="/about" />
        </Routes>
      </ArrayProvider>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { ArrayProvider } from "@/components/global";


import IndexPage from "@/pages/index";
import DataPage from "@/pages/data";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

function App() {
  return (
    <ArrayProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<DataPage />} path="/data" />
        <Route element={<PricingPage />} path="/pricing" />
        <Route element={<BlogPage />} path="/blog" />
        <Route element={<AboutPage />} path="/about" />
      </Routes>
    </ArrayProvider>
  );
}

export default App;

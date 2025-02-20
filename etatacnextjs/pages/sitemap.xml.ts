import { GetServerSideProps } from "next";

import fs from "fs";
import path from "path";

const baseUrl = "https://yourdomain.com"; // Replace with your domain

function getStaticPages(dir: string, urlPrefix: string = ""): string[] {
  const staticPages: string[] = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      staticPages.push(...getStaticPages(filePath, `${urlPrefix}/${file}`));
    } else if (file.endsWith(".js") || file.endsWith(".tsx")) {
      const pageName = file.replace(/\.(js|tsx)$/, "");

      if (
        pageName !== "_app" &&
        pageName !== "_document" &&
        pageName !== "api"
      ) {
        const pageUrl = `${urlPrefix}/${pageName === "index" ? "" : pageName}`;

        staticPages.push(pageUrl);
      }
    }
  });

  return staticPages;
}

const generateSitemapXml = (urls: string[]): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>
  `
    )
    .join("")}
</urlset>`;
};
// <changefreq>weekly</changefreq>
// <priority>0.8</priority>

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const pagesDirectory = path.join(process.cwd(), "pages");
  const staticPages = getStaticPages(pagesDirectory);
  const sitemap = generateSitemapXml(staticPages);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

const Sitemap: React.FC = () => null;

export default Sitemap;

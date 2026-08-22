import { readFile, writeFile } from "node:fs/promises";
import {
  renderLlms,
  renderNoscript,
  renderRobots,
  renderSeoHead,
  renderSitemap,
} from "./static-content.ts";

const root = new URL("../", import.meta.url);
const indexUrl = new URL("index.html", root);
const llmsUrl = new URL("public/llms.txt", root);
const robotsUrl = new URL("public/robots.txt", root);
const sitemapUrl = new URL("public/sitemap.xml", root);

const index = await readFile(indexUrl, "utf8");
const noscriptPattern = /    <!-- Structured content[^]*?    <\/noscript>/;
const seoPattern = /    <!-- SEO and structured identity[^]*?    <!-- \/SEO and structured identity -->/;

if (!noscriptPattern.test(index)) {
  throw new Error("Could not find the generated <noscript> block in index.html.");
}

if (!seoPattern.test(index)) {
  throw new Error("Could not find the generated SEO block in index.html.");
}

await Promise.all([
  writeFile(llmsUrl, renderLlms(), "utf8"),
  writeFile(robotsUrl, renderRobots(), "utf8"),
  writeFile(sitemapUrl, renderSitemap(), "utf8"),
  writeFile(
    indexUrl,
    index
      .replace(seoPattern, renderSeoHead())
      .replace(noscriptPattern, renderNoscript()),
    "utf8",
  ),
]);

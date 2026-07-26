import { readFile, writeFile } from "node:fs/promises";
import { renderLlms, renderNoscript } from "./static-content.ts";

const root = new URL("../", import.meta.url);
const indexUrl = new URL("index.html", root);
const llmsUrl = new URL("public/llms.txt", root);

const index = await readFile(indexUrl, "utf8");
const noscriptPattern = /    <!-- Structured content[^]*?    <\/noscript>/;

if (!noscriptPattern.test(index)) {
  throw new Error("Could not find the generated <noscript> block in index.html.");
}

await Promise.all([
  writeFile(llmsUrl, renderLlms(), "utf8"),
  writeFile(indexUrl, index.replace(noscriptPattern, renderNoscript()), "utf8"),
]);

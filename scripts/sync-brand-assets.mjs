import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "assets", "to-upload", "brand");
const targetDir = path.join(rootDir, "public", "brand");

const assetCandidates = {
  favicon: ["favicon.png", "favicon.ico", "favicon.svg"],
  featured: [
    "featured-image.jpg",
    "featured-image.jpeg",
    "featured-image.png",
    "featured-image.webp",
  ],
};

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyFirstAvailable(candidates, targetFileName) {
  for (const candidate of candidates) {
    const sourcePath = path.join(sourceDir, candidate);
    if (await exists(sourcePath)) {
      const targetPath = path.join(targetDir, targetFileName);
      await copyFile(sourcePath, targetPath);
      return { source: candidate, target: targetFileName };
    }
  }
  return null;
}

async function main() {
  await mkdir(targetDir, { recursive: true });

  const copied = [];
  const missing = [];

  const favicon = await copyFirstAvailable(assetCandidates.favicon, "favicon.png");
  if (favicon) copied.push(favicon);
  else missing.push("favicon (expected one of: favicon.png, favicon.ico, favicon.svg)");

  const featured = await copyFirstAvailable(
    assetCandidates.featured,
    "featured-image.jpg"
  );
  if (featured) copied.push(featured);
  else
    missing.push(
      "featured image (expected one of: featured-image.jpg, featured-image.jpeg, featured-image.png, featured-image.webp)"
    );

  if (copied.length > 0) {
    console.log("Synced brand metadata assets:");
    for (const item of copied) {
      console.log(`- ${item.source} -> public/brand/${item.target}`);
    }
  }

  if (missing.length > 0) {
    console.warn("Missing brand metadata assets:");
    for (const item of missing) {
      console.warn(`- ${item}`);
    }
  }
}

main().catch((error) => {
  console.error("Failed to sync brand assets:", error);
  process.exit(1);
});

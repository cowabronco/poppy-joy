import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "assets", "to-upload", "brand");
const targetDir = path.join(rootDir, "public", "brand");
const appDir = path.join(rootDir, "src", "app");

const assetCandidates = {
  logo: ["logo.png"],
  featured: [
    "featured-image.jpg",
    "featured-image.jpeg",
    "featured-image.png",
    "featured-image.webp",
    "featured-image-social.jpg",
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

async function copyFirstAvailable(candidates, targetFileName, targetDirectory) {
  for (const candidate of candidates) {
    const sourcePath = path.join(sourceDir, candidate);
    if (await exists(sourcePath)) {
      const targetPath = path.join(targetDirectory, targetFileName);
      await copyFile(sourcePath, targetPath);
      return { source: candidate, target: targetFileName };
    }
  }
  return null;
}

async function main() {
  await mkdir(targetDir, { recursive: true });
  await mkdir(appDir, { recursive: true });

  const copied = [];
  const missing = [];

  const logo = await copyFirstAvailable(assetCandidates.logo, "logo.png", targetDir);
  if (logo) {
    copied.push(logo);

    const faviconTarget = path.join(targetDir, "favicon.png");
    await copyFile(path.join(sourceDir, logo.source), faviconTarget);
    copied.push({ source: logo.source, target: "favicon.png" });

    const appIconTarget = path.join(appDir, "icon.png");
    await copyFile(path.join(sourceDir, logo.source), appIconTarget);
    copied.push({ source: logo.source, target: "src/app/icon.png" });
  } else {
    missing.push("logo (expected: logo.png)");
  }

  const featured = await copyFirstAvailable(
    assetCandidates.featured,
    "featured-image.jpg",
    targetDir
  );
  if (featured) copied.push(featured);
  else
    missing.push(
      "featured image (expected one of: featured-image.jpg, featured-image.jpeg, featured-image.png, featured-image.webp, featured-image-social.jpg)"
    );

  if (copied.length > 0) {
    console.log("Synced brand metadata assets:");
    for (const item of copied) {
      console.log(`- ${item.source} -> ${item.target}`);
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

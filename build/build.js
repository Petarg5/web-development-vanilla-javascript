// scripts/build.js
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const projectRoot = process.cwd();
const distPath = path.join(projectRoot, "dist");

// Folders to skip
const SKIP_DIRS = ["dist", "node_modules", ".git", ".github", "scripts"];

// Clean old dist
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath);

// Recursive copy & minify
function processAll(srcFolder, destFolder) {
  if (!fs.existsSync(srcFolder)) return;
  fs.mkdirSync(destFolder, { recursive: true });

  fs.readdirSync(srcFolder).forEach((file) => {
    if (SKIP_DIRS.includes(file)) return;

    const srcPath = path.join(srcFolder, file);
    const destPath = path.join(destFolder, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      processAll(srcPath, destPath);
    } else if (file.endsWith(".js")) {
      execSync(`npx terser "${srcPath}" --compress --mangle -o "${destPath}"`, {
        stdio: "inherit",
      });
    } else if (file.endsWith(".css")) {
      execSync(`npx cleancss -o "${destPath}" "${srcPath}"`, {
        stdio: "inherit",
      });
    } else if (/\.(png|jpe?g|gif|svg)$/i.test(file)) {
      fs.copyFileSync(srcPath, destPath); // optimize later
    } else if (file.endsWith(".html")) {
      let html = fs.readFileSync(srcPath, "utf8");

      // Minify inline CSS
      html = html.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => {
        try {
          const minified = execSync(`npx cleancss --inline 0`, {
            input: css,
          }).toString();
          return `<style>${minified.trim()}</style>`;
        } catch {
          return `<style>${css}</style>`;
        }
      });

      // Minify inline JS
      html = html.replace(/<script>([\s\S]*?)<\/script>/g, (_, js) => {
        try {
          const minified = execSync(`npx terser --compress --mangle`, {
            input: js,
          }).toString();
          return `<script>${minified.trim()}</script>`;
        } catch {
          return `<script>${js}</script>`;
        }
      });

      fs.writeFileSync(destPath, html);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

processAll(projectRoot, distPath);

// Optimize images
function optimizeImages(folder) {
  if (!fs.existsSync(folder)) return;
  fs.readdirSync(folder).forEach((file) => {
    const filePath = path.join(folder, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      optimizeImages(filePath);
    } else if (/\.(png|jpe?g|gif|svg)$/i.test(file)) {
      execSync(`npx imagemin "${filePath}" --out-dir="${folder}"`, {
        stdio: "inherit",
      });
    }
  });
}

optimizeImages(distPath);

console.log("✅ Build completed. Check /dist folder.");

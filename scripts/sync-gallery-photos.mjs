#!/usr/bin/env node
/**
 * Sync gallery photos from cueva-thalia/photos into public/photos/optimized/galleries.
 * Resizes to max 1600px edge (matches existing optimized assets).
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.join(__dirname, '..');
const sourceRoot =
  process.env.GALLERY_PHOTOS_SOURCE ??
  path.join(siteRoot, '..', 'photos');
const destRoot = path.join(siteRoot, 'public', 'photos', 'optimized', 'galleries');
const MAX_EDGE = 1600;

const DEST_BY_KEY = {
  sejour: 'sejour',
  atelier: 'atelier',
  chambre: 'chambre',
  cuisine: 'cuisine',
  details: 'details',
  jardin: 'jardin',
  piscine: 'piscine',
};

function folderKey(name) {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

function normalizeFilename(name) {
  const base = path.basename(name, path.extname(name));
  const ext = '.jpg';
  if (/^photocouverture/i.test(base)) {
    const num = base.match(/\d+/)?.[0] ?? '';
    return `photocouverture${num}${ext}`;
  }
  if (/^img_/i.test(base)) {
    return `${base.toLowerCase()}${ext}`;
  }
  return `${base.toLowerCase()}${ext}`;
}

function isCoverFile(name) {
  return /^photocouverture/i.test(path.basename(name));
}

function optimize(inPath, outPath) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.copyFileSync(inPath, outPath);
  execSync(`sips -Z ${MAX_EDGE} "${outPath}" --out "${outPath}"`, { stdio: 'pipe' });
}

function listImages(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !f.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'fr'));
}

const manifest = {};

for (const entry of fs.readdirSync(sourceRoot, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dest = DEST_BY_KEY[folderKey(entry.name)];
  if (!dest || manifest[dest]) continue;

  const srcDir = path.join(sourceRoot, entry.name);
  const outDir = path.join(destRoot, dest);
  fs.mkdirSync(outDir, { recursive: true });

  for (const existing of fs.readdirSync(outDir)) {
    fs.unlinkSync(path.join(outDir, existing));
  }

  const files = listImages(srcDir);
  const normalized = files.map((file) => ({
    source: file,
    out: normalizeFilename(file),
    isCover: isCoverFile(file),
  }));

  for (const { source, out } of normalized) {
    optimize(path.join(srcDir, source), path.join(outDir, out));
  }

  const coverEntry =
    normalized.find((n) => n.isCover) ?? normalized[0];
  const cover = coverEntry?.out;
  let images = normalized.filter((n) => !n.isCover).map((n) => n.out);

  if (images.length === 0 && cover) {
    images = [cover];
  }

  manifest[dest] = { cover, images };
}

const manifestPath = path.join(siteRoot, 'lib', 'gallery-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log('Gallery sync complete:', manifestPath);
for (const [folder, data] of Object.entries(manifest)) {
  console.log(`  ${folder}: cover=${data.cover}, ${data.images.length} images`);
}

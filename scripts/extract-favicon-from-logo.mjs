/**
 * Favicon = emblème du logo (arche + fleur + lumière), fond transparent.
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public', 'brand', 'logo-source.png');

/** Zone initiale logo 500×500 (emblème sans texte) */
const EMBLEM_CROP = { left: 104, top: 48, width: 292, height: 276 };

/** Pixels proches du blanc du logo → transparent (conserve l'intérieur de l'arche) */
function isBackground(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);
  return lum > 238 && chroma < 18;
}

async function emblemTrimmed() {
  const { data, info } = await sharp(source)
    .extract(EMBLEM_CROP)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const o4 = i * 4;
    if (isBackground(r, g, b)) {
      out[o4 + 3] = 0;
    } else {
      out[o4] = r;
      out[o4 + 1] = g;
      out[o4 + 2] = b;
      out[o4 + 3] = 255;
    }
  }

  return sharp(out, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();
}

async function emblemIcon(size, padding = 0.04) {
  const trimmed = await emblemTrimmed();
  const meta = await sharp(trimmed).metadata();
  const ratio = meta.width / meta.height;
  const inner = Math.round(size * (1 - padding * 2));
  const targetW = ratio >= 1 ? inner : Math.round(inner * ratio);
  const targetH = ratio >= 1 ? Math.round(inner / ratio) : inner;

  let pipe = sharp(trimmed).resize(targetW, targetH, {
    fit: 'inside',
    kernel: sharp.kernel.lanczos3,
  });

  if (size <= 48) {
    pipe = pipe.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.25 });
  }

  const resized = await pipe.png().toBuffer();
  const left = Math.round((size - targetW) / 2);
  const top = Math.round((size - targetH) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toBuffer();
}

function crc32(buf) {
  let c = 0xffffffff;
  const table =
    crc32.table ||
    (crc32.table = (() => {
      const t = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        let v = n;
        for (let k = 0; k < 8; k++) v = v & 1 ? (0xedb88320 ^ (v >>> 1)) : v >>> 1;
        t[n] = v >>> 0;
      }
      return t;
    })());
  for (const byte of buf) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function createIco(png32, png16) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(2, 4);

  let offset = 6 + 16 * 2;
  const makeEntry = (png, size, imageOffset) => {
    const e = Buffer.alloc(16);
    e[0] = size;
    e[1] = size;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(imageOffset, 12);
    return e;
  };

  const e16 = makeEntry(png16, 16, offset);
  offset += png16.length;
  const e32 = makeEntry(png32, 32, offset);

  return Buffer.concat([header, e16, e32, png16, png32]);
}

async function main() {
  const brandDir = join(root, 'public', 'brand');
  await sharp(await emblemTrimmed()).toFile(join(brandDir, 'emblem-extract.png'));

  const png16 = await emblemIcon(16, 0.02);
  const png32 = await emblemIcon(32, 0.03);
  const png64 = await emblemIcon(64, 0.04);
  const png180 = await emblemIcon(180, 0.05);

  writeFileSync(join(root, 'public', 'favicon.ico'), createIco(png32, png16));
  writeFileSync(join(root, 'app', 'favicon.ico'), createIco(png32, png16));
  writeFileSync(join(root, 'public', 'apple-touch-icon.png'), png180);
  writeFileSync(join(brandDir, 'favicon-64.png'), png64);

  const b64 = png64.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Cueva Thalia">
  <image width="32" height="32" href="data:image/png;base64,${b64}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  writeFileSync(join(root, 'public', 'favicon.svg'), svg);

  console.log('Favicon OK — emblème logo, fond transparent');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

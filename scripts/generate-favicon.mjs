import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const bg = [0xf5, 0xf0, 0xe6];
const dune = [0xc9, 0xb8, 0x96];
const terra = [0xb8, 0x5c, 0x38];

function inRoundedRect(x, y, w, h, r) {
  if (x < 0 || y < 0 || x >= w || y >= h) return false;
  if (x < r && y < r) return (x - r) ** 2 + (y - r) ** 2 <= r * r;
  if (x > w - 1 - r && y < r) return (x - (w - 1 - r)) ** 2 + (y - r) ** 2 <= r * r;
  if (x < r && y > h - 1 - r) return (x - r) ** 2 + (y - (h - 1 - r)) ** 2 <= r * r;
  if (x > w - 1 - r && y > h - 1 - r) {
    return (x - (w - 1 - r)) ** 2 + (y - (h - 1 - r)) ** 2 <= r * r;
  }
  return true;
}

function blend(a, b, t) {
  return Math.round(a * (1 - t) + b * t);
}

function rectAlpha(x, y, x0, y0, x1, y1, feather = 0.4) {
  if (x < x0 || x > x1 || y < y0 || y > y1) return 0;
  const dx = Math.min(x - x0, x1 - x) / feather;
  const dy = Math.min(y - y0, y1 - y) / feather;
  return Math.min(1, Math.min(dx, dy));
}

/** Serif CT — geometry aligned with public/favicon.svg (Georgia 15px, letter-spacing -1.2) */
function letterCAlpha(x, y) {
  const cx = 10.15;
  const cy = 16.2;
  const rx = 5.35;
  const ry = 6.1;
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  const d = Math.sqrt(dx * dx + dy * dy);
  const open = x < cx + rx * 0.15;
  const ring = Math.min(1.02 - d, d - 0.42) / 0.1;
  let a = open && ring > 0 ? Math.min(1, ring) : 0;
  if (x >= 8.2 && x <= 11.2 && y >= 9.4 && y <= 10.4) a = Math.max(a, rectAlpha(x, y, 8.2, 9.4, 11.2, 10.4, 0.25));
  if (x >= 8.2 && x <= 11.2 && y >= 21.8 && y <= 22.8) a = Math.max(a, rectAlpha(x, y, 8.2, 21.8, 11.2, 22.8, 0.25));
  return a;
}

function letterTAlpha(x, y) {
  const left = 18.1;
  const barTop = 9.35;
  const barH = 2.1;
  const stemW = 1.75;
  const stemLeft = 20.55;
  const stemH = 10.2;
  const totalW = 6.35;

  return Math.max(
    rectAlpha(x, y, left, barTop, left + totalW, barTop + barH, 0.3),
    rectAlpha(x, y, stemLeft, barTop + barH, stemLeft + stemW, barTop + barH + stemH, 0.3),
    rectAlpha(x, y, left, barTop + barH, left + 0.55, barTop + barH + 0.85, 0.25),
    rectAlpha(x, y, left + totalW - 0.55, barTop + barH, left + totalW, barTop + barH + 0.85, 0.25),
  );
}

function sample(fx, fy, size) {
  const scale = size / 32;
  const r = Math.max(1, Math.round(3 * scale));
  const inset = Math.max(1, Math.round(scale));

  let color = [...bg];

  if (!inRoundedRect(fx, fy, size, size, r)) return color;

  const bx = inset;
  const by = inset;
  const bw = size - inset * 2;
  const bh = size - inset * 2;
  const br = Math.max(1, Math.round(2 * scale));
  const lx = fx - bx;
  const ly = fy - by;
  const onBorder =
    inRoundedRect(lx, ly, bw, bh, br) &&
    !inRoundedRect(lx - 1, ly - 1, bw - 2, bh - 2, Math.max(0, br - 1));

  if (onBorder) {
    color = dune.map((c, i) => blend(bg[i], c, 0.45));
    return color;
  }

  const gx = (fx + 0.5) / scale - 0.5;
  const gy = (fy + 0.5) / scale - 0.5;
  const mark = Math.max(letterCAlpha(gx, gy), letterTAlpha(gx, gy));
  if (mark > 0) color = bg.map((c, i) => blend(c, terra[i], mark));
  return color;
}

function pixel(x, y, size, supersample = 4) {
  let r = 0;
  let g = 0;
  let b = 0;
  const step = 1 / supersample;
  for (let sy = 0; sy < supersample; sy++) {
    for (let sx = 0; sx < supersample; sx++) {
      const c = sample(x + (sx + 0.5) * step, y + (sy + 0.5) * step, size);
      r += c[0];
      g += c[1];
      b += c[2];
    }
  }
  const n = supersample * supersample;
  return [Math.round(r / n), Math.round(g / n), Math.round(b / n)];
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

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const tag = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([tag, data])));
  return Buffer.concat([len, tag, data, crc]);
}

function createPng(size) {
  const ss = size <= 32 ? 4 : 3;
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const color = pixel(x, y, size, ss);
      const i = row + 1 + x * 4;
      raw[i] = color[0];
      raw[i + 1] = color[1];
      raw[i + 2] = color[2];
      raw[i + 3] = 255;
    }
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function createIco(png, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry[4] = 1;
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  return Buffer.concat([header, entry, png]);
}

const png32 = createPng(32);
const png180 = createPng(180);
const ico = createIco(png32, 32);

writeFileSync(join(root, 'public', 'favicon.ico'), ico);
writeFileSync(join(root, 'app', 'favicon.ico'), ico);
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), png180);

console.log('Generated favicon.ico (32×32) and apple-touch-icon.png (180×180)');

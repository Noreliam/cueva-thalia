import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const size = 32;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const bg = [0xf5, 0xf0, 0xe6];
const terra = [0xb8, 0x5c, 0x38];
const turq = [0x4a, 0x9b, 0x9b];

function pixel(x, y) {
  const rounded =
    x >= 1 &&
    y >= 1 &&
    x <= 30 &&
    y <= 30 &&
    (x < 9 ||
      y < 9 ||
      x > 23 ||
      y > 23 ||
      ((x - 9) ** 2 + (y - 9) ** 2 >= 64 &&
        (x - 23) ** 2 + (y - 9) ** 2 >= 64 &&
        (x - 9) ** 2 + (y - 23) ** 2 >= 64 &&
        (x - 23) ** 2 + (y - 23) ** 2 >= 64));

  if (!rounded) return null;

  const archY = 24 - Math.sqrt(Math.max(0, 100 - (x - 16) ** 2) * 0.35);
  if (y >= archY) return terra;
  if (y >= 19 && Math.abs(x - 16) <= 5) return turq;
  return bg;
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

function createPng() {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const color = pixel(x, y);
      const i = row + 1 + x * 4;
      if (!color) continue;
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

function createIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry[2] = 0;
  entry[3] = 0;
  entry[4] = 1;
  entry[5] = 0;
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(6 + 16, 12);

  return Buffer.concat([header, entry, png]);
}

const png = createPng();
const ico = createIco(png);

writeFileSync(join(root, 'public', 'favicon.ico'), ico);
writeFileSync(join(root, 'app', 'favicon.ico'), ico);
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), png);

console.log('Generated favicon.ico and apple-touch-icon.png');

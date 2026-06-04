import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = path.join(root, 'public/videos/hero-preserve.mp4');
const output = path.join(root, 'public/videos/hero-preserve-reverse.mp4');

if (!fs.existsSync(input)) {
  console.error('Missing public/videos/hero-preserve.mp4');
  process.exit(1);
}

if (!ffmpegPath) {
  console.error('ffmpeg-static binary not found');
  process.exit(1);
}

execFileSync(ffmpegPath, ['-y', '-i', input, '-an', '-vf', 'reverse', output], {
  stdio: 'inherit',
});

console.log('Created', output);

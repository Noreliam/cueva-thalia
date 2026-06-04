import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2] ?? path.join(root, 'public/videos/hero-preserve-source.mp4');
const output = path.join(root, 'public/videos/hero-preserve-v2.mp4');

// Removes the Google Veo sparkle watermark in the bottom-right corner.
const cleanFilter = 'crop=1160:640:0:0,scale=1280:720:flags=lanczos';

if (!fs.existsSync(input)) {
  console.error('Missing input video:', input);
  process.exit(1);
}

if (!ffmpegPath) {
  console.error('ffmpeg-static binary not found');
  process.exit(1);
}

execFileSync(
  ffmpegPath,
  ['-y', '-i', input, '-an', '-vf', cleanFilter, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', output],
  { stdio: 'inherit' }
);

console.log('Created', output);

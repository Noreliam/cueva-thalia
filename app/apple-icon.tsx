import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F0E6',
          borderRadius: 36,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#F5F0E6" />
          <path fill="#B85C38" d="M6 24c0-8 4.2-14 10-16 5.8 2 10 8 10 16H6z" />
          <ellipse cx="16" cy="22" rx="5" ry="2.5" fill="#4A9B9B" opacity="0.85" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

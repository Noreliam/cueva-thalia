import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const monogram = (
  <svg width="180" height="180" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#F5F0E6" />
    <rect
      x="1.5"
      y="1.5"
      width="29"
      height="29"
      rx="5"
      fill="none"
      stroke="#C9B896"
      strokeWidth="0.65"
      opacity="0.55"
    />
    <g fill="#B85C38">
      <path d="M11.4 21.4c-4.2 0-5.8-2.2-5.8-5.4s1.6-5.4 5.8-5.4 1.95.17 2.65.5l-1.55 1.35c-.45-.2-1-.32-1.65-.32-2.55 0-3.65 1.55-3.65 3.75s1.1 3.75 3.65 3.75c.65 0 1.2-.12 1.65-.32l1.55 1.35c-.7.33-1.55.5-2.65.5z" />
      <path d="M14.6 10.1h8.55v1.28h-3.28v10.12h-1.82V11.38H14.6V10.1z" />
    </g>
  </svg>
);

/** Monogramme CT — aligné sur public/favicon.svg */
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
          borderRadius: 40,
        }}
      >
        {monogram}
      </div>
    ),
    { ...size },
  );
}

/**
 * Builds a referral code from the influencer's first name + 2 random digits (e.g. LAURA10).
 */
export function generateInfluenceurCode(firstName: string): string {
  const normalized = firstName
    .trim()
    .split(/\s+/)[0]
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 20);

  if (!normalized) {
    throw new Error('Invalid first name for code generation');
  }

  const digits = String(Math.floor(Math.random() * 100)).padStart(2, '0');
  return `${normalized}${digits}`;
}

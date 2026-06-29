export default async () => {
  const siteUrl = process.env.URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://cueva-thalia.com';
  const secret = process.env.CRON_SECRET;

  const headers = secret ? { Authorization: `Bearer ${secret}` } : {};

  try {
    const response = await fetch(`${siteUrl}/api/cron/pre-arrival-emails`, { headers });
    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : 500,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: String(error) }),
    };
  }
};

export const config = {
  schedule: '@hourly',
};

import { redirect } from '@/i18n/routing';

export default async function EvenementsPrivesRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: '/evenements', locale });
}

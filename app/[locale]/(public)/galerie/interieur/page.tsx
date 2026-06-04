import { redirect } from '@/i18n/routing';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GalerieInterieurRedirect({ params }: Props) {
  const { locale } = await params;
  redirect({ href: '/galerie/sejour', locale });
}

export type NavItem = {
  labelKey: 'sejourner' | 'evenements' | 'workshops' | 'galerie' | 'offrir' | 'contact';
  href: '/sejourner' | '/evenements' | '/workshops-retraites' | '/galerie' | '/bon-cadeau' | '/contact';
};

export const siteNavItems: NavItem[] = [
  { labelKey: 'sejourner', href: '/sejourner' },
  { labelKey: 'evenements', href: '/evenements' },
  { labelKey: 'workshops', href: '/workshops-retraites' },
  { labelKey: 'galerie', href: '/galerie' },
  { labelKey: 'offrir', href: '/bon-cadeau' },
  { labelKey: 'contact', href: '/contact' },
];

export function isHomePath(pathname: string) {
  return pathname === '/' || pathname === '';
}

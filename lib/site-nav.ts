export type NavItem = {
  label: string;
  hash: string;
  pageHref: '/sejourner' | '/evenements-prives' | '/workshops-retraites' | '/galerie' | '/contact';
};

export const siteNavItems: NavItem[] = [
  { label: 'Séjourner', hash: '#sejour', pageHref: '/sejourner' },
  { label: 'Événements', hash: '#evenements', pageHref: '/evenements-prives' },
  { label: 'Workshops', hash: '#workshops', pageHref: '/workshops-retraites' },
  { label: 'Galerie', hash: '#galerie', pageHref: '/galerie' },
  { label: 'Contact', hash: '#contact', pageHref: '/contact' },
];

export function isHomePath(pathname: string) {
  return pathname === '/' || pathname === '';
}

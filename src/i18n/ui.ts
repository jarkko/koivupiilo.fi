export const languages = {
  en: 'English',
  fi: 'Suomi'
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'hero.title': 'Human-Centered Technologist',
    'hero.subtitle': 'Building technology that serves people, not the other way around',
    'hero.description': '30+ years of full-stack expertise, championship coaching, and startup success',
    'services.technical.title': 'Technical Consulting',
    'services.technical.description': 'Full-stack development, CTO advisory, and ML integration',
    'services.coaching.title': 'Sports Coaching',
    'services.coaching.description': 'Elite volleyball coaching with modern training methods',
    'services.personal.title': 'Personal Development',
    'services.personal.description': 'Executive coaching for busy professionals',
    'contact.title': 'Let\'s Start a Conversation',
    'contact.description': 'Markets are conversations. Let\'s begin ours.',
    'footer.tagline': 'Technology that enables conversation',
  },
  fi: {
    'nav.home': 'Etusivu',
    'nav.about': 'Tietoja',
    'nav.services': 'Palvelut',
    'nav.portfolio': 'Portfolio',
    'nav.blog': 'Blogi',
    'nav.contact': 'Yhteystiedot',
    'hero.title': 'Ihmiskeskeinen Teknologi',
    'hero.subtitle': 'Rakennan teknologiaa, joka palvelee ihmisiä',
    'hero.description': '30+ vuotta full-stack osaamista, mestaruusvalmentamista ja startup-menestystä',
    'services.technical.title': 'Tekninen Konsultointi',
    'services.technical.description': 'Full-stack kehitys, CTO-neuvonta ja ML-integraatio',
    'services.coaching.title': 'Urheiluvalmennus',
    'services.coaching.description': 'Elite-lentopallovalmennusta moderneilla menetelmillä',
    'services.personal.title': 'Henkilökohtainen Kehitys',
    'services.personal.description': 'Johtajuusvalmennus kiireisille ammattilaisille',
    'contact.title': 'Aloitetaan Keskustelu',
    'contact.description': 'Markkinat ovat keskusteluja. Aloitetaan omamme.',
    'footer.tagline': 'Teknologia, joka mahdollistaa keskustelun',
  }
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
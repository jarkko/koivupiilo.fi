// Shared copy for all three directions (FI default, EN). One source; directions only render it.
// Claims follow docs/design/model.md M3: every fact here has a source in docs/design/content/
// or is marked CONFIRM (shown on the page as written, listed for Jarkko in the presentation).

export const routes = {
  fi: { front: '/', services: '/palvelut/', work: '/tyot/', case: '/tyot/magistician/', contact: '/yhteys/', about: '/tietoa/' },
  en: { front: '/en/', services: '/en/services/', work: '/en/work/', case: '/en/work/magistician/', contact: '/en/contact/', about: '/en/about/' },
};

export const EMAIL = 'jarkko@jlaine.net'; // CONFIRM: or an @koivupiilo.fi address (Fastmail MX exists)
const BID = '3458206-1'; // PRH open data, 2026-10-31

// status keys follow model.md M1. Verified 2026-10-31: magistician.com live 2026-10-28, kvitti.fi live 2026-10-27,
// Jumbo Volley not yet used on a match day, Resultifi web live, rules translation published (dormant since 2026-05).
export const statusLabel = {
  fi: { live: 'julkaistu', early: 'julkaistu, alkuvaihe', inuse: 'käytössä', dev: 'kehityksessä', proto: 'prototyyppi', hold: 'tauolla' },
  en: { live: 'live', early: 'live, early days', inuse: 'in use', dev: 'in development', proto: 'prototype', hold: 'on hold' },
};

// Products. img paths are relative to design/assets/img/ (synthetic or brand material only).
export const products = [
  {
    slug: 'magistician', name: 'Magistician', status: 'early', img: 'magistician-review.png',
    platform: { fi: 'Verkko · koneoppiminen', en: 'Web · machine learning' },
    fi: 'Lentopallovideosta aikaleimatut tilastot jokaisesta kosketuksesta. Valmentaja avaa minkä tahansa luvun takana olevat klipit.',
    en: 'Turns volleyball video into timecoded stats for every touch. A coach opens the clips behind any number.',
  },
  {
    slug: 'kvitti', name: 'Kvitti', status: 'early', img: 'kvitti.png',
    platform: { fi: 'iOS · verkko', en: 'iOS · web' },
    fi: 'Kuitit, kilometrit ja päivärahat seuroille ja pienyrityksille. Suomeksi, ruotsiksi ja englanniksi.',
    en: 'Receipts, mileage and per diems for sports clubs and small companies. In Finnish, Swedish and English.',
  },
  {
    slug: 'jumpreach', name: 'JumpReach', status: 'proto', img: 'jumpreach.png',
    platform: { fi: 'iPhone', en: 'iPhone' },
    fi: 'Hyppykorkeuden mittaus iPhonella. Verkon antennin 10 cm:n raidat toimivat mittanauhana.',
    en: 'Measures jump-and-reach height with an iPhone, using the net antenna’s 10 cm stripes as the ruler.',
  },
  {
    slug: 'jumbo-volley', name: 'Jumbo Volley', status: 'dev', img: 'jumbo.svg',
    platform: { fi: 'Verkko · OBS', en: 'Web · OBS' },
    fi: 'Hallin isolle näytölle ottelugrafiikat, joita ohjataan puhelimesta. Tulos tulee suoraan pöytäkirjajärjestelmästä.',
    en: 'Match graphics for a venue’s big screen, run from a phone. The score comes straight from the scoresheet system.',
  },
];

export const moreWork = [
  { name: { fi: 'Beach-lentopallon säännöt suomeksi', en: 'Beach volleyball rules in Finnish' }, status: 'live', platform: { fi: 'Käännös · PDF', en: 'Translation · PDF' } },
  { name: { fi: 'Ratametsuri', en: 'Ratametsuri' }, status: 'dev', platform: { fi: 'macOS', en: 'macOS' } },
  { name: { fi: 'Resultifi', en: 'Resultifi' }, status: 'live', platform: { fi: 'Verkko · iOS', en: 'Web · iOS' } },
  { name: { fi: 'BeachDesk', en: 'BeachDesk' }, status: 'dev', platform: { fi: 'Verkko · mobiili', en: 'Web · mobile' } },
];

export const offers = {
  fi: [
    {
      id: 'ohjelmistot', name: 'Ohjelmistot',
      lead: 'Verkkosovellukset Elixirillä, Phoenixilla ja Railsilla, natiivit iOS- ja macOS-sovellukset SwiftUI:lla ja koneoppiminen niiden välissä.',
      who: 'Startupeille ja pk-yrityksille, joilla on tuote rakennettavana tai jumissa, ja toimistoille, jotka tarvitsevat kokeneen tekijän projektiin.',
      starts: 'Sähköposti ja puolen tunnin puhelu. Usein ensimmäinen työ on lyhyt katselmointi koodista tai suunnitelmasta.',
      format: 'Projekti tai sovittu määrä päiviä kuukaudessa. Etänä, tarvittaessa Pirkanmaalla paikan päällä.',
      proof: ['magistician', 'kvitti', 'jumpreach'],
    },
    {
      id: 'valmennus', name: 'Lentopallovalmennus',
      lead: 'Beach- ja salilentopallon valmennusta ja valmentajakoulutusta. Harjoitukset rakentuvat rajoitteiden ja vaihtelun varaan, ei toistoon kaavan mukaan.',
      who: 'Seuroille, valmentajille ja kilpaileville pareille.',
      starts: 'Viesti siitä, kenen kanssa ja mihin kauteen. Sitten tapaaminen kentän laidalla tai puhelimessa.',
      format: 'Leirit, klinikat, valmentajakoulutukset ja pidemmät valmennusjaksot.',
      proof: ['magistician', 'jumbo-volley'],
    },
    {
      id: 'johtajuus', name: 'Johtajuus ja tiimit',
      lead: 'Sparrausta ohjelmistokehittäjille, jotka siirtyvät vetämään tiimiä, ja tiimeille, jotka haluavat tehdä työtä paremmin yhdessä.',
      who: 'Kehittäjille, tiiminvetäjille ja pienille ohjelmistotiimeille.',
      starts: 'Keskustelu siitä, mikä on nyt vaikeaa. Ensimmäisen tapaamisen jälkeen kumpikin tietää, kannattaako jatkaa.',
      format: 'Kahdenkeskiset tapaamiset tai tiimin työpaja.',
      proof: [],
    },
  ],
  en: [
    {
      id: 'software', name: 'Software',
      lead: 'Web apps in Elixir, Phoenix and Rails, native iOS and macOS apps in SwiftUI, and the machine learning in between.',
      who: 'Startups and small companies with a product to build or a product that’s stuck, and agencies that need a senior hand on a project.',
      starts: 'An email and a 30-minute call. The first piece of work is often a short review of your code or plan.',
      format: 'A project, or an agreed number of days a month. Remote, or on site around Tampere.',
      proof: ['magistician', 'kvitti', 'jumpreach'],
    },
    {
      id: 'coaching', name: 'Volleyball coaching',
      lead: 'Beach and indoor volleyball coaching and coach education. Practice is built on constraints and variability, not drilling one model technique.',
      who: 'Clubs, coaches and competitive pairs.',
      starts: 'A message about who and which season. Then a meeting courtside or on the phone.',
      format: 'Camps, clinics, coach education and longer coaching blocks.',
      proof: ['magistician', 'jumbo-volley'],
    },
    {
      id: 'leadership', name: 'Leadership and teams',
      lead: 'Sparring for developers who are starting to lead a team, and for teams that want to work better together.',
      who: 'Developers, team leads and small software teams.',
      starts: 'A conversation about what’s hard right now. After the first meeting we both know whether to continue.',
      format: 'One-to-one sessions or a team workshop.',
      proof: [],
    },
  ],
};

export const t = {
  fi: {
    lang: 'fi', other: 'en', switchLabel: 'In English',
    nav: { work: 'Työt', services: 'Palvelut', about: 'Tietoa', contact: 'Yhteys' },
    skip: 'Siirry sisältöön',
    front: {
      title: 'Koivupiilo – ohjelmistoja urheiluun ja arkeen',
      h1: 'Koivupiilo tekee ohjelmistoja urheiluun ja arkeen.',
      lede: 'Koivupiilo on Jarkko Laineen yhden hengen studio Kangasalla. Teen omia tuotteita ja otan vuosittain muutaman toimeksiannon: ohjelmistoja, lentopallovalmennusta ja työtä tiimien kanssa.',
      productsH: 'Tuotteet, joita teen nyt',
      moreH: 'Muuta työtä',
      allWork: 'Kaikki työt',
      offersH: 'Voit palkata minut',
      offersLink: 'Palvelut ja aloitus',
      contactLine: 'Kerro, mitä olet tekemässä.',
    },
    services: {
      title: 'Palvelut – Koivupiilo',
      h1: 'Kolme tapaa tehdä töitä kanssani',
      lede: 'Teen tänä vuonna enimmäkseen omia tuotteitani, joten otan kerrallaan yhden tai kaksi toimeksiantoa. Jos en ehdi tai en ole oikea tekijä, sanon sen heti.',
      who: 'Kenelle', starts: 'Miten alkaa', format: 'Muoto', proof: 'Näyttöä',
      oneH: 'Kun palkkaat yhden ihmisen',
      one: [
        'Puhut sen kanssa, joka tekee työn. Välissä ei ole projektipäällikköä eikä myyjää.',
        'Kokonaisuus pysyy yhdessä päässä: koodi, käyttöliittymä ja se, miksi jotain tehtiin.',
        'Kapasiteetti on rajallinen. Siksi kerron aikataulun rehellisesti ennen kuin sovitaan mitään.',
      ],
      cta: 'Kysy ajankohtaa',
    },
    contact: {
      title: 'Yhteys – Koivupiilo',
      h1: 'Kirjoita minulle',
      lede: 'Sähköposti on nopein tapa. Vastaan kahden arkipäivän kuluessa.', // CONFIRM reply time
      includeH: 'Kerro viestissä nämä kolme',
      include: [
        ['Mitä olet tekemässä', 'Tuote, seura tai tiimi muutamalla lauseella.'],
        ['Mihin olet juuttunut', 'Mikä ei nyt toimi tai mitä et ehdi tehdä itse.'],
        ['Aikataulu ja raamit', 'Milloin pitäisi olla valmista ja suunnilleen millä budjetilla. Valmennuksessa kausi.'],
      ],
      byOfferH: 'Valmis aihe viestiin',
      subject: (o) => `Koivupiilo: ${o}`,
      nowH: 'Tilanne nyt',
      now: 'Teen enimmäkseen omia tuotteita. Otan kerrallaan yhden tai kaksi toimeksiantoa, joten kysy ajankohtaa.',
      langs: 'Palvelen suomeksi ja englanniksi.',
      elsewhereH: 'Muualla',
    },
    case: {
      title: 'Magistician – Koivupiilo',
      backToWork: 'Kaikki työt',
      strip: { what: 'Mitä', for: 'Kenelle', role: 'Rooli', stack: 'Tekniikka', years: 'Vuodet', status: 'Tila' },
      nextH: 'Tarvitsetko jotain samantapaista?',
      next: 'Kerro, mitä olet tekemässä. Vastaan kahden arkipäivän kuluessa.',
    },
    footer: { company: 'Koivupiilo Oy', bid: `Y-tunnus ${BID}`, place: 'Kangasala' },
  },
  en: {
    lang: 'en', other: 'fi', switchLabel: 'Suomeksi',
    nav: { work: 'Work', services: 'Services', about: 'About', contact: 'Contact' },
    skip: 'Skip to content',
    front: {
      title: 'Koivupiilo – software for sport and everyday life',
      h1: 'Koivupiilo builds software for sport and everyday life.',
      lede: 'Koivupiilo is Jarkko Laine’s one-person studio in Kangasala, Finland. I build my own products and take on a few projects a year: software, volleyball coaching, and work with teams.',
      productsH: 'What I’m building now',
      moreH: 'Other work',
      allWork: 'All work',
      offersH: 'You can hire me for',
      offersLink: 'Services and how to start',
      contactLine: 'Tell me what you’re working on.',
    },
    services: {
      title: 'Services – Koivupiilo',
      h1: 'Three ways to work with me',
      lede: 'This year I mostly build my own products, so I take on one or two projects at a time. If I don’t have time, or I’m not the right person, I’ll tell you straight away.',
      who: 'For', starts: 'How it starts', format: 'Format', proof: 'Proof',
      oneH: 'When you hire one person',
      one: [
        'You talk to the person doing the work. No project manager or salesperson in between.',
        'The whole thing stays in one head: the code, the interface, and why something was done.',
        'Capacity is limited, so you get an honest timeline before anything is agreed.',
      ],
      cta: 'Ask about timing',
    },
    contact: {
      title: 'Contact – Koivupiilo',
      h1: 'Write to me',
      lede: 'Email is the fastest way. I reply within two working days.',
      includeH: 'Put these three things in your email',
      include: [
        ['What you’re working on', 'The product, club or team, in a few sentences.'],
        ['Where you’re stuck', 'What isn’t working, or what you can’t get to yourself.'],
        ['Timeline and budget', 'When it needs to be ready and a rough budget. For coaching, the season.'],
      ],
      byOfferH: 'Start with a subject line',
      subject: (o) => `Koivupiilo: ${o}`,
      nowH: 'Right now',
      now: 'I’m mostly building my own products and take on one or two projects at a time, so ask about timing.',
      langs: 'I work in Finnish and English.',
      elsewhereH: 'Elsewhere',
    },
    case: {
      title: 'Magistician – Koivupiilo',
      backToWork: 'All work',
      strip: { what: 'What', for: 'For', role: 'Role', stack: 'Stack', years: 'Years', status: 'Status' },
      nextH: 'Need something like this?',
      next: 'Tell me what you’re working on. I reply within two working days.',
    },
    footer: { company: 'Koivupiilo Oy', bid: `Business ID ${BID}`, place: 'Kangasala, Finland' },
  },
};

export const elsewhere = [
  ['LinkedIn', 'https://www.linkedin.com/in/jarkko/'],
  ['Mastodon', 'https://mastodon.social/@jarkko'],
];

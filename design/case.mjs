// Magistician case study, FI and EN. Facts: scratchpad cases.md → to be filed in docs/design/content/ (M3).
// Images are from the issue-7 audit and use synthetic data only (no real teams or players).

export const caseStudy = {
  fi: {
    h1: 'Magistician',
    problem: 'Lentopallovideo sisään, aikaleimatut tilastot jokaisesta kosketuksesta ulos. Valmentaja näkee luvun ja avaa sen takana olevat klipit.',
    strip: {
      what: 'Videoanalyysi lentopalloon',
      for: 'Valmentajat ja analyytikot',
      role: 'Tuote, suunnittelu, koodi ja koneoppiminen',
      stack: 'Phoenix LiveView, Oban, Python ja PyTorch, UpCloud Helsinki',
      years: '2026',
      status: 'Julkaistu 28.10.2026, alkuvaihe',
    },
    hero: { src: 'magistician-dark.png', alt: 'Magisticianin korjausnäkymä: video ja lista kosketuksista epävarmimmasta alkaen', caption: 'Korjausnäkymä, epävarmimmat kosketukset ensin. Joukkueet ja video ovat keksittyä testidataa.' },
    sections: [
      {
        h: 'Mitä se tekee',
        p: [
          'Valmentaja lataa ottelun videon. Malli etsii jokaisen kosketuksen, merkitsee sen aikaleiman ja kokoaa niistä tilastot. Jokaisen luvun takana on klippi, joten valmentajan ei tarvitse uskoa lukua sokkona.',
          'Tilastot voi viedä DataVolleyn .dvw-muodossa ja tuoda sieltä, joten työkalu sopii valmennustiimin nykyiseen tapaan tehdä töitä.',
        ],
      },
      {
        h: 'Korjausnäkymä on tuote',
        p: [
          'Mikään malli ei osu joka kerta. Siksi tärkein näkymä on se, jossa ihminen korjaa mallin virheet nopeasti. Epävarmimmat kosketukset tulevat ensin. Ensimmäinen korjaus vie neljä näppäilyä, sen jälkeen yksi näppäin per kosketus. Tallennus kestää 24–37 ms, ja z peruu edellisen.',
        ],
      },
      {
        h: 'Malli ylennetään vain mittauksella',
        p: [
          'Uusi malli pääsee käyttöön vain, jos se voittaa edellisen ottelulla, jota se ei ole nähnyt. Nykyinen malli ajoittaa 89,2 % kosketuksista sekunnin tarkkuudella. Rallin rakennetta hyödyntävä tulkinta nosti keskimääräistä F1-lukua 0,23.',
          'Lokakuun 8. päivänä kaksi ehdokasmallia jäi ylentämättä, koska ne eivät parantaneet tulosta. Syöttäjän puolen tunnistus nousi 57 %:sta 94 %:iin, mutta mittaus ei ole puhdas, joten luku on vain suuntaa antava.',
        ],
        img: { src: 'magistician-phone.png', alt: 'Magistician puhelimessa: klippilista yhdestä tilastosta', caption: 'Puhelinnäkymä. Esimerkkidata.' },
      },
      {
        h: 'Pelaajien tiedot pysyvät joukkueella',
        p: [
          'Pelaajien ulkonäköprofiilit pysyvät joukkuekohtaisina eivätkä siirry joukkueesta toiseen, koska ne voivat olla erityisiä henkilötietoja (GDPR 9 art.). Palvelu ja GPU-laskenta ajetaan UpCloudissa Helsingissä.',
        ],
      },
      {
        h: 'Miten se tehtiin',
        p: [
          'Lokakuussa 2026 syntyi 1 319 committia. Testejä on 2 886 Elixir-puolella ja 1 307 koneoppimisen puolella, kattavuusvaatimus on 100 %, ja saavutettavuustarkistuksia on 170.',
        ],
      },
    ],
    notDone: {
      h: 'Mitä ei vielä ole',
      p: 'Muiden kuin syöttöjen pelaajatunnistusta ei julkaistu, koska väärä nimi on huonompi kuin ei nimeä. Käyttäjiä on vielä vähän eikä maksavia asiakkaita ole. Kustannusarvio 1–2 € per ottelu on arvio, ja säästettyä aikaa ei ole vielä mitattu.',
    },
  },
  en: {
    h1: 'Magistician',
    problem: 'Volleyball video in, timecoded stats for every touch out. A coach sees a number and opens the clips behind it.',
    strip: {
      what: 'Volleyball video analysis',
      for: 'Coaches and analysts',
      role: 'Product, design, code and machine learning',
      stack: 'Phoenix LiveView, Oban, Python and PyTorch, UpCloud Helsinki',
      years: '2026',
      status: 'Live since 28 Oct 2026, early days',
    },
    hero: { src: 'magistician-dark.png', alt: 'Magistician correction screen: video next to a list of touches, least certain first', caption: 'Correction screen, least certain touches first. Teams and video are synthetic test data.' },
    sections: [
      {
        h: 'What it does',
        p: [
          'A coach uploads match video. The model finds every touch, timecodes it and builds the stats. Every number has a clip behind it, so nobody has to trust a number blind.',
          'Stats import from and export to DataVolley .dvw, so it fits how a coaching staff already works.',
        ],
      },
      {
        h: 'The correction screen is the product',
        p: [
          'No model is right every time, so the screen that matters most is the one where a person fixes its mistakes fast. The least certain touches come first. The first fix takes four keystrokes, then one key per touch. A save takes 24–37 ms, and z undoes it.',
        ],
      },
      {
        h: 'A model ships only when it measures better',
        p: [
          'A new model replaces the old one only if it wins on a match it has never seen. The current model places 89.2% of touches within one second. Decoding with the structure of a rally raised mean F1 by 0.23.',
          'On 8 October two candidate models were not promoted because they did not improve the result. Serving-side attribution went from 57% to 94%, but that measurement is not a clean hold-out, so treat it as a direction, not a result.',
        ],
        img: { src: 'magistician-phone.png', alt: 'Magistician on a phone: the clip list behind one stat', caption: 'Phone view. Example data.' },
      },
      {
        h: 'Player data stays with the team',
        p: [
          'Player appearance profiles stay with one team and never move between teams, because they can count as special-category data under GDPR Article 9. The service and its GPU work run on UpCloud in Helsinki.',
        ],
      },
      {
        h: 'How it was built',
        p: [
          '1,319 commits in October 2026. 2,886 Elixir tests and 1,307 machine-learning tests behind a 100% coverage gate, plus 170 accessibility checks.',
        ],
      },
    ],
    notDone: {
      h: 'What isn’t there yet',
      p: 'Player attribution beyond serves was not shipped, because a wrong name is worse than none. Few people use it so far and there are no paying customers. The €1–2 per match cost is an estimate, and time saved has not been measured.',
    },
  },
};

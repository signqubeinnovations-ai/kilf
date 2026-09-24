/**
 * UI strings. English is the default and the fallback: any key missing from
 * `ml` renders in English. Malayalam currently ships for the site chrome and
 * the Home and About pages.
 *
 * TODO(i18n): translate the remaining pages (Speakers, Programme, Khasak,
 * Youth, Get involved, Passes, Visit, Partners, FAQ, Contact, Privacy), then
 * add their paths to `translatedPaths` below.
 */
export const languages = { en: 'English', ml: 'മലയാളം' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Paths that have a real Malayalam version (others fall back to English). */
export const translatedPaths = ['/', '/about'];

const en = {
  'site.city': 'Kollam, Kerala',
  'site.organisedBy': 'Organised by',
  'site.firstEdition': 'The first edition',
  'site.dates': '31 December 2026 – 4 January 2027',

  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.speakers': 'Speakers',
  'nav.programme': 'Programme',
  'nav.involved': 'Get involved',
  'nav.passes': 'Passes',
  'nav.visit': 'Visit',
  'nav.khasak': 'Khasakkinte Ithihasam',
  'nav.youth': 'Youth',
  'nav.partners': 'Partners',
  'nav.faq': 'FAQ',
  'nav.contact': 'Contact',
  'nav.privacy': 'Privacy',
  'nav.menu': 'Menu',
  'nav.close': 'Close menu',
  'nav.primary': 'Primary',
  'nav.skip': 'Skip to content',

  'cta.register': 'Register',
  'cta.explore': 'Explore the programme',
  'cta.notify': 'Notify me',
  'cta.seeSpeakers': 'See all speakers',
  'cta.learnMore': 'Discover the experience',

  'footer.quick': 'Explore',
  'footer.festival': 'Festival',
  'footer.contact': 'Say hello',
  'footer.scan': 'Scan to share the site',
  'footer.rights': 'All rights reserved.',

  'fallback.notice': '',

  'countdown.title': 'The first chapter begins in',
  'countdown.days': 'Days',
  'countdown.hours': 'Hours',
  'countdown.minutes': 'Minutes',
  'countdown.live': 'The festival is on. Welcome to the first chapter.',

  'home.kicker': 'The first chapter · 2027',
  'home.h1': 'Kollam International Literature Festival',
  'home.tagline': 'Where words meet the',
  'home.taglineAccent': 'world.',
  'home.water': 'Eight arms of water. One embrace of words.',
  'home.stats.label': 'KILF in numbers',
  'home.stats.speakers': 'Speakers',
  'home.stats.audience': 'Audience',
  'home.stats.shore': 'Shore',
  'home.stats.shoreNote': 'Ashtamudi',

  'home.nye.chapter': 'New Year’s Eve',
  'home.nye.h': 'Turn the',
  'home.nye.accent': 'page.',
  'home.nye.lead': 'End 2026 by the lake. Begin 2027 with a story.',
  'home.nye.1': 'Midnight readings',
  'home.nye.2': 'Music by the lake',
  'home.nye.3': 'Countdown to 2027',

  'home.voices.chapter': 'Voices',
  'home.voices.h': 'Voices without',
  'home.voices.accent': 'borders.',
  'home.voices.note': 'Proposed line-up · participation subject to confirmation',

  'home.strands.chapter': 'Strands',
  'home.strands.h': 'Find your',
  'home.strands.accent': 'voice.',
  'home.strands.lead': 'Nine strands, one shore. Follow the one you love, or wander into one you never expected.',

  'home.khasak.chapter': 'Signature theatre',
  'home.khasak.proposed': 'Proposed',
  'home.khasak.h': 'Khasakkinte',
  'home.khasak.accent': 'Ithihasam.',
  'home.khasak.lead': 'O. V. Vijayan’s legendary 1969 novel, staged by director Deepan Sivaraman.',
  'home.khasak.quote': 'Not a play you watch — a world you walk into.',

  'home.youth.chapter': 'Youth',
  'home.youth.h': 'Youth.',
  'home.youth.accent': 'This stage is yours.',
  'home.youth.lead': 'Poetry slams, open mics, reels, rap and your favourite authors, up close.',
  'home.youth.cta': 'Register your college',

  'home.involved.chapter': 'Join in',
  'home.involved.h': 'Be part of',
  'home.involved.accent': 'KILF.',
  'home.involved.register': 'Register',
  'home.involved.register.d': 'Be a delegate at the first edition.',
  'home.involved.volunteer': 'Volunteer',
  'home.involved.volunteer.d': 'Hospitality, stage and guest care.',
  'home.involved.exhibit': 'Exhibit',
  'home.involved.exhibit.d': 'Publishers, artists and food stalls.',
  'home.involved.partner': 'Partner',
  'home.involved.partner.d': 'Put your brand on the shore.',
  'home.involved.attend': 'Attend',
  'home.involved.attend.d': 'Day, Festival and Young Reader passes.',

  'home.signup.chapter': 'Stay close',
  'home.signup.h': 'Be first in',
  'home.signup.accent': 'line.',
  'home.signup.lead': 'Speaker announcements, pass sales and the full programme, straight to your inbox or WhatsApp.',
  'home.signup.whatsapp': 'Join on WhatsApp',

  'form.name': 'Name',
  'form.email': 'Email',
  'form.phone': 'Phone',
  'form.phoneOrEmail': 'Email or WhatsApp number',
  'form.submit': 'Send',
  'form.subscribe': 'Keep me posted',
  'form.sending': 'Sending…',
  'form.success': 'Thank you! You’re on the list. We’ll be in touch.',
  'form.error': 'Something went wrong. Please try again, or email us at',
  'form.required': 'Required',

  'home.hero.lead': 'Five days of writers and readers, cinema, music and theatre on the shore of Ashtamudi Lake, from the last night of 2026 into the first days of 2027.',
  'home.hero.when': 'When',
  'home.hero.where': 'Where',
  'home.hero.place': 'Ashtamudi Lake, Kollam',
  'home.hero.touch': 'Touch the water.',
  'home.hero.caption': 'Ashtamudi Lake at first light.',
  'home.hero.daysToGo': 'days to go',
  'home.marquee.label': 'The nine strands',
  'home.marquee.pause': 'Pause the moving strands',
  'home.marquee.play': 'Play the moving strands',
  'home.intro.chapter': 'The festival',
  'home.intro.h': 'Eight arms of water.',
  'home.intro.accent': 'One embrace of words.',
  'home.intro.link': 'About KILF',
  'home.facts.days': 'Days by the lake',
  'home.facts.venues': 'Venues',
  'home.statement.kicker': 'The first chapter',
  'home.statement.h': 'Stories. People. Places.',
  'home.statement.accent': 'Possibilities.',
  'home.statement.lead': 'Five days in which a city reads, argues, sings and celebrates, together by the water.',
  'home.statement.link': 'Why Kollam',
  'home.involved.lead': 'Five ways into the first chapter. Each one takes about a minute.',
  'footer.closing.kicker': 'The first chapter begins 31 December 2026',
  'footer.closing.h': 'See you by the',
  'footer.closing.accent': 'lake.',

  'about.chapter': 'About',
  'about.h': 'About',
  'about.accent': 'KILF.',
  'about.p1':
    'The Kollam International Literature Festival is a new gathering of writers, readers, filmmakers, musicians, artists and thinkers on the shore of Ashtamudi Lake. Its first edition runs across five days, from the last night of 2026 into the first days of 2027.',
  'about.p2':
    'Rooted in Malayalam and open to the world, KILF brings masters and new voices face to face with their readers, in sessions, performances, a book fair, a youth stage and evenings of food and music by the water.',
  'about.why.chapter': 'The place',
  'about.why.h': 'Why',
  'about.why.accent': 'Ashtamudi?',
  'about.why.p':
    'A lake of eight arms, an ancient port and the town that gave Malayalam its calendar — Kollam has always been where stories arrive.',
  'about.matters.h': 'Why Kollam',
  'about.matters.accent': 'matters.',
  'about.m1.t': 'A spice-route port',
  'about.m1.d': 'Once Quilon; Marco Polo and Ibn Battuta wrote of its harbour.',
  'about.m2.t': 'Home of a calendar',
  'about.m2.d': 'The Kollam Era began here in 825 CE.',
  'about.m3.t': 'History on copper',
  'about.m3.d': 'The Tharisapalli plates (849 CE).',
  'about.m4.t': 'A protected lake',
  'about.m4.d': 'Ashtamudi is a Ramsar wetland.',
  'about.qa.chapter': 'In Malayalam',
  'about.qa.h': 'KILF,',
  'about.qa.accent': 'ചുരുക്കത്തിൽ.',
  'about.organised': 'Organised by',
};

export type UIKey = keyof typeof en;

const ml: Partial<Record<UIKey, string>> = {
  'site.city': 'കൊല്ലം, കേരളം',
  'site.organisedBy': 'സംഘാടനം',
  'site.firstEdition': 'ആദ്യ പതിപ്പ്',
  'site.dates': '2026 ഡിസംബർ 31 – 2027 ജനുവരി 4',

  'nav.home': 'ഹോം',
  'nav.about': 'ആമുഖം',
  'nav.speakers': 'പ്രഭാഷകർ',
  'nav.programme': 'പരിപാടികൾ',
  'nav.involved': 'പങ്കാളികളാകാം',
  'nav.passes': 'പാസുകൾ',
  'nav.visit': 'സന്ദർശനം',
  'nav.khasak': 'ഖസാക്കിന്റെ ഇതിഹാസം',
  'nav.youth': 'യുവത',
  'nav.partners': 'പങ്കാളികൾ',
  'nav.faq': 'ചോദ്യോത്തരങ്ങൾ',
  'nav.contact': 'ബന്ധപ്പെടാം',
  'nav.privacy': 'സ്വകാര്യത',
  'nav.menu': 'മെനു',
  'nav.close': 'മെനു അടയ്ക്കുക',
  'nav.skip': 'ഉള്ളടക്കത്തിലേക്ക് പോകാം',

  'cta.register': 'രജിസ്റ്റർ ചെയ്യൂ',
  'cta.explore': 'പരിപാടികൾ കാണാം',
  'cta.notify': 'അറിയിപ്പ് നേടാം',
  'cta.seeSpeakers': 'എല്ലാ പ്രഭാഷകരെയും കാണാം',
  'cta.learnMore': 'കൂടുതൽ അറിയാം',

  'footer.quick': 'പേജുകൾ',
  'footer.festival': 'ഉത്സവം',
  'footer.contact': 'ബന്ധപ്പെടാം',
  'footer.scan': 'സൈറ്റ് പങ്കിടാൻ സ്കാൻ ചെയ്യൂ',
  'footer.rights': 'എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം.',

  'fallback.notice': 'ഈ പേജിന്റെ മലയാളം പതിപ്പ് ഉടൻ വരുന്നു. തൽക്കാലം ഇംഗ്ലീഷിൽ വായിക്കാം.',

  'countdown.title': 'ആദ്യ അധ്യായം തുടങ്ങാൻ',
  'countdown.days': 'ദിവസം',
  'countdown.hours': 'മണിക്കൂർ',
  'countdown.minutes': 'മിനിറ്റ്',
  'countdown.live': 'ഉത്സവം തുടങ്ങി. ആദ്യ അധ്യായത്തിലേക്ക് സ്വാഗതം.',

  'home.kicker': 'ആദ്യ അധ്യായം · 2027',
  'home.h1': 'കൊല്ലം അന്താരാഷ്ട്ര സാഹിത്യോത്സവം',
  'home.tagline': 'വാക്കുകൾ ലോകത്തെ',
  'home.taglineAccent': 'കണ്ടുമുട്ടുന്നിടം.',
  'home.water': 'എട്ടു കൈകളുള്ള കായൽ. വാക്കുകളുടെ ഒരൊറ്റ ആലിംഗനം.',
  'home.stats.label': 'KILF അക്കങ്ങളിൽ',
  'home.stats.speakers': 'പ്രഭാഷകർ',
  'home.stats.audience': 'പ്രേക്ഷകർ',
  'home.stats.shore': 'തീരം',
  'home.stats.shoreNote': 'അഷ്ടമുടി',

  'home.nye.chapter': 'പുതുവത്സരരാവ്',
  'home.nye.h': 'താൾ',
  'home.nye.accent': 'മറിക്കാം.',
  'home.nye.lead': '2026 കായൽക്കരയിൽ അവസാനിപ്പിക്കാം. 2027 ഒരു കഥയോടെ തുടങ്ങാം.',
  'home.nye.1': 'അർധരാത്രി വായനകൾ',
  'home.nye.2': 'കായലോരത്ത് സംഗീതം',
  'home.nye.3': '2027-ലേക്കുള്ള കൗണ്ട്ഡൗൺ',

  'home.voices.chapter': 'ശബ്ദങ്ങൾ',
  'home.voices.h': 'അതിരുകളില്ലാത്ത',
  'home.voices.accent': 'ശബ്ദങ്ങൾ.',
  'home.voices.note': 'നിർദ്ദിഷ്ട പട്ടിക · പങ്കാളിത്തം സ്ഥിരീകരണത്തിന് വിധേയം',

  'home.strands.chapter': 'വിഭാഗങ്ങൾ',
  'home.strands.h': 'നിങ്ങളുടെ ശബ്ദം',
  'home.strands.accent': 'കണ്ടെത്തൂ.',
  'home.strands.lead': 'ഒൻപത് വിഭാഗങ്ങൾ, ഒരൊറ്റ തീരം. ഇഷ്ടമുള്ളത് പിന്തുടരാം, അല്ലെങ്കിൽ പ്രതീക്ഷിക്കാത്ത ഒന്നിലേക്ക് കയറിച്ചെല്ലാം.',

  'home.khasak.chapter': 'സവിശേഷ രംഗാവതരണം',
  'home.khasak.proposed': 'നിർദ്ദിഷ്ടം',
  'home.khasak.h': 'ഖസാക്കിന്റെ',
  'home.khasak.accent': 'ഇതിഹാസം.',
  'home.khasak.lead': 'ഒ. വി. വിജയന്റെ 1969-ലെ ഇതിഹാസ നോവൽ, സംവിധായകൻ ദീപൻ ശിവരാമന്റെ അരങ്ങിൽ.',
  'home.khasak.quote': 'കണ്ടിരിക്കാനുള്ള ഒരു നാടകമല്ല — നടന്നുകയറാനുള്ള ഒരു ലോകം.',

  'home.youth.chapter': 'യുവത',
  'home.youth.h': 'യുവതയ്ക്ക്.',
  'home.youth.accent': 'ഈ വേദി നിങ്ങളുടേതാണ്.',
  'home.youth.lead': 'കവിതാ സ്ലാമുകൾ, ഓപ്പൺ മൈക്കുകൾ, റീലുകൾ, റാപ്പ്, പ്രിയ എഴുത്തുകാരെ നേരിൽ.',
  'home.youth.cta': 'നിങ്ങളുടെ കോളേജ് രജിസ്റ്റർ ചെയ്യൂ',

  'home.involved.chapter': 'ഒപ്പം ചേരാം',
  'home.involved.h': 'KILF-ന്റെ',
  'home.involved.accent': 'ഭാഗമാകൂ.',
  'home.involved.register': 'രജിസ്റ്റർ',
  'home.involved.register.d': 'ആദ്യ പതിപ്പിൽ പ്രതിനിധിയാകാം.',
  'home.involved.volunteer': 'സന്നദ്ധസേവനം',
  'home.involved.volunteer.d': 'ആതിഥ്യം, വേദി, അതിഥി പരിചരണം.',
  'home.involved.exhibit': 'പ്രദർശനം',
  'home.involved.exhibit.d': 'പ്രസാധകർ, കലാകാരർ, ഭക്ഷണ സ്റ്റാളുകൾ.',
  'home.involved.partner': 'പങ്കാളിത്തം',
  'home.involved.partner.d': 'നിങ്ങളുടെ ബ്രാൻഡ് ഈ തീരത്ത്.',
  'home.involved.attend': 'പങ്കെടുക്കാം',
  'home.involved.attend.d': 'ഡേ, ഫെസ്റ്റിവൽ, യംഗ് റീഡർ പാസുകൾ.',

  'home.signup.chapter': 'അടുത്തുനിൽക്കാം',
  'home.signup.h': 'ആദ്യം',
  'home.signup.accent': 'അറിയാം.',
  'home.signup.lead': 'പ്രഭാഷകരുടെ പ്രഖ്യാപനങ്ങൾ, പാസ് വിൽപ്പന, മുഴുവൻ പരിപാടിയും — നിങ്ങളുടെ ഇൻബോക്സിലേക്കോ വാട്സ്ആപ്പിലേക്കോ.',
  'home.signup.whatsapp': 'വാട്സ്ആപ്പിൽ ചേരാം',

  'form.name': 'പേര്',
  'form.email': 'ഇമെയിൽ',
  'form.phone': 'ഫോൺ',
  'form.phoneOrEmail': 'ഇമെയിൽ അല്ലെങ്കിൽ വാട്സ്ആപ്പ് നമ്പർ',
  'form.submit': 'അയയ്ക്കുക',
  'form.subscribe': 'വിവരങ്ങൾ അറിയിക്കൂ',
  'form.sending': 'അയയ്ക്കുന്നു…',
  'form.success': 'നന്ദി! നിങ്ങളെ പട്ടികയിൽ ചേർത്തു. ഉടൻ ബന്ധപ്പെടാം.',
  'form.error': 'എന്തോ പിഴവ് സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കൂ, അല്ലെങ്കിൽ ഇമെയിൽ ചെയ്യൂ:',
  'form.required': 'നിർബന്ധം',

  'home.hero.lead': 'എഴുത്തുകാരും വായനക്കാരും സിനിമയും സംഗീതവും നാടകവും — അഷ്ടമുടിക്കായലിന്റെ തീരത്ത് അഞ്ചു ദിവസം, 2026-ന്റെ അവസാന രാത്രി മുതൽ 2027-ന്റെ ആദ്യ ദിനങ്ങൾ വരെ.',
  'home.hero.when': 'എപ്പോൾ',
  'home.hero.where': 'എവിടെ',
  'home.hero.place': 'അഷ്ടമുടിക്കായൽ, കൊല്ലം',
  'home.hero.touch': 'വെള്ളത്തിൽ തൊട്ടുനോക്കൂ.',
  'home.hero.caption': 'പുലർവെളിച്ചത്തിൽ അഷ്ടമുടിക്കായൽ.',
  'home.hero.daysToGo': 'ദിവസം കൂടി',
  'home.marquee.label': 'ഒൻപത് വിഭാഗങ്ങൾ',
  'home.marquee.pause': 'നീങ്ങുന്ന വരി നിർത്തുക',
  'home.marquee.play': 'നീങ്ങുന്ന വരി തുടരുക',
  'home.intro.chapter': 'ഉത്സവം',
  'home.intro.h': 'എട്ടു കൈകളുള്ള കായൽ.',
  'home.intro.accent': 'വാക്കുകളുടെ ഒരൊറ്റ ആലിംഗനം.',
  'home.intro.link': 'KILF-നെക്കുറിച്ച്',
  'home.facts.days': 'കായലോരത്ത് ദിവസങ്ങൾ',
  'home.facts.venues': 'വേദികൾ',
  'home.statement.kicker': 'ആദ്യ അധ്യായം',
  'home.statement.h': 'കഥകൾ. മനുഷ്യർ. ഇടങ്ങൾ.',
  'home.statement.accent': 'സാധ്യതകൾ.',
  'home.statement.lead': 'ഒരു നഗരം ഒന്നിച്ചു വായിക്കുകയും സംവദിക്കുകയും പാടുകയും ആഘോഷിക്കുകയും ചെയ്യുന്ന അഞ്ചു ദിവസങ്ങൾ, കായലിനരികെ.',
  'home.statement.link': 'എന്തുകൊണ്ട് കൊല്ലം',
  'home.involved.lead': 'ആദ്യ അധ്യായത്തിലേക്ക് അഞ്ചു വഴികൾ. ഓരോന്നിനും ഒരു മിനിറ്റ് മതി.',
  'footer.closing.kicker': 'ആദ്യ അധ്യായം 2026 ഡിസംബർ 31-ന്',
  'footer.closing.h': 'കായൽക്കരയിൽ',
  'footer.closing.accent': 'കാണാം.',

  'about.chapter': 'ആമുഖം',
  'about.h': 'KILF-നെ',
  'about.accent': 'കുറിച്ച്.',
  'about.p1':
    'എഴുത്തുകാരും വായനക്കാരും ചലച്ചിത്രകാരരും സംഗീതജ്ഞരും കലാകാരരും ചിന്തകരും അഷ്ടമുടിക്കായലിന്റെ തീരത്ത് ഒത്തുചേരുന്ന പുതിയ ഉത്സവമാണ് കൊല്ലം അന്താരാഷ്ട്ര സാഹിത്യോത്സവം. 2026-ന്റെ അവസാന രാത്രി മുതൽ 2027-ന്റെ ആദ്യ ദിനങ്ങൾ വരെ, അഞ്ചു ദിവസമാണ് ആദ്യ പതിപ്പ്.',
  'about.p2':
    'മലയാളത്തിൽ വേരൂന്നി, ലോകത്തിനു നേരെ തുറന്നുവെച്ച KILF, മഹാരഥന്മാരെയും പുതിയ ശബ്ദങ്ങളെയും വായനക്കാർക്കു മുന്നിലെത്തിക്കുന്നു — സംവാദങ്ങൾ, അവതരണങ്ങൾ, പുസ്തകമേള, യുവവേദി, കായലോരത്തെ ഭക്ഷണവും സംഗീതവും നിറഞ്ഞ സന്ധ്യകൾ.',
  'about.why.chapter': 'ഇടം',
  'about.why.h': 'എന്തുകൊണ്ട്',
  'about.why.accent': 'അഷ്ടമുടി?',
  'about.why.p':
    'എട്ടു കൈകളുള്ള ഒരു കായൽ, ഒരു പുരാതന തുറമുഖം, മലയാളത്തിന് സ്വന്തം കലണ്ടർ നൽകിയ നഗരം — കഥകൾ എന്നും വന്നണഞ്ഞത് കൊല്ലത്താണ്.',
  'about.matters.h': 'കൊല്ലം',
  'about.matters.accent': 'എന്തുകൊണ്ട്?',
  'about.m1.t': 'സുഗന്ധവ്യഞ്ജന പാതയിലെ തുറമുഖം',
  'about.m1.d': 'ഒരിക്കൽ ക്വയിലോൺ; മാർക്കോ പോളോയും ഇബ്നു ബത്തൂത്തയും ഇവിടത്തെ തുറമുഖത്തെക്കുറിച്ച് എഴുതി.',
  'about.m2.t': 'ഒരു കലണ്ടറിന്റെ ജന്മനാട്',
  'about.m2.d': 'കൊല്ലവർഷം ആരംഭിച്ചത് ഇവിടെ, എ.ഡി. 825-ൽ.',
  'about.m3.t': 'ചെമ്പിൽ കുറിച്ച ചരിത്രം',
  'about.m3.d': 'തരിസാപ്പള്ളി ശാസനങ്ങൾ (എ.ഡി. 849).',
  'about.m4.t': 'സംരക്ഷിത കായൽ',
  'about.m4.d': 'അഷ്ടമുടി ഒരു റാംസർ തണ്ണീർത്തടമാണ്.',
  'about.qa.chapter': 'മലയാളത്തിൽ',
  'about.organised': 'സംഘാടനം',
};

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = { en, ml };

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? en[key];
}

/** Prefix a site path with the language segment. */
export function localizePath(path: string, lang: Lang) {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return clean;
  return clean === '/' ? `/${lang}/` : `/${lang}${clean}`;
}

/** Split a pathname into its language and the language-neutral path. */
export function parsePath(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/ml(\/.*)?$/);
  const raw = m ? m[1] || '/' : pathname;
  const path = raw.length > 1 ? raw.replace(/\/$/, '') : '/';
  return { lang: m ? 'ml' : 'en', path };
}

export const isTranslated = (path: string) => translatedPaths.includes(path);

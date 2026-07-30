import { WORDS } from './words.js';

const byId = {};
for (const w of WORDS) byId[w.id] = w;

function mk(lead, w, c, ukPrefix, ukCase) {
  const word = byId[w];
  if (!word) return null;
  const form = word.ukForms[ukCase];
  return { lead, w, c, ukPre: ukPrefix || '', ukForm: form, uk: ukPrefix ? ukPrefix + ' ' + form : form };
}

function gen(lead, c, ukPrefix, ukCase, ws) {
  return ws.map((w) => mk(lead, w, c, ukPrefix, ukCase)).filter(Boolean);
}
function head(lt, uk, ws) {
  return ws.map((w) => mk(lt + ' su', w, 'In', uk + ' з', 'ins')).filter(Boolean);
}
function ant(lt, uk, ws) {
  return ws.map((w) => mk(lt + ' ant', w, 'K', uk, 'loc')).filter(Boolean);
}

export const PHRASES = {
  cafe: [
    ...head('bandelė', 'булка', ['mėsa', 'sūris', 'dešra', 'kiaušinis', 'uoga', 'vyšnia', 'šokoladas']),
    ...head('pyragas', 'пиріг', ['obuolys', 'vyšnia', 'uoga', 'šokoladas', 'kumpis']),
    ...head('sumuštinis', 'бутерброд', ['sūris', 'dešra', 'kumpis', 'kiaušinis']),
    ...head('kava', 'кава', ['pienas', 'cukrus', 'ledas']),
    ...head('arbata', 'чай', ['cukrus', 'citrina']),
    ...gen('užsakyti', 'G', 'замовити', 'acc', ['kava', 'arbata', 'tortas', 'pyragas', 'sriuba', 'alus', 'vynas', 'sumuštinis', 'ledas']),
    ...gen('gerti', 'G', 'пити', 'acc', ['kava', 'arbata', 'vanduo', 'pienas', 'alus', 'vynas']),
    ...gen('valgyti', 'G', 'їсти', 'acc', ['tortas', 'pyragas', 'sriuba', 'sumuštinis', 'ledas']),
    ...gen('puodelis', 'K', 'чашка', 'gen', ['kava', 'arbata']),
    ...gen('stiklinė', 'K', 'склянка', 'gen', ['vanduo', 'alus', 'vynas', 'pienas']),
    ...gen('mėgti', 'G', 'любити', 'acc', ['kava', 'arbata', 'šokoladas', 'tortas', 'ledas', 'pyragas']),
    ...gen('be', 'K', 'без', 'gen', ['cukrus', 'pienas', 'ledas'])
  ],
  prod: [
    ...gen('pirkti', 'G', 'купувати', 'acc', ['duona', 'pienas', 'sūris', 'mėsa', 'sviestas', 'kiaušinis', 'bananas', 'apelsinas', 'citrina', 'kopūstas', 'svogūnas', 'česnakas', 'morka', 'obuolys', 'pomidoras', 'agurkas', 'dešra', 'kumpis', 'grybas', 'uoga', 'braškė', 'riešutas']),
    ...gen('kilogramas', 'K', 'кілограм', 'gen', ['sūris', 'mėsa', 'obuolys', 'bananas', 'pomidoras', 'bulvė', 'svogūnas', 'morka', 'riešutas', 'grybas', 'braškė']),
    ...gen('butelis', 'K', 'пляшка', 'gen', ['pienas', 'vanduo', 'vynas', 'alus']),
    ...gen('be', 'K', 'без', 'gen', ['cukrus', 'mėsa']),
    ...gen('valgyti', 'G', 'їсти', 'acc', ['bananas', 'obuolys', 'riešutas', 'uoga', 'braškė', 'grybas', 'sūris', 'dešra', 'kumpis', 'morka'])
  ],
  street: [
    ...gen('eiti į', 'G', 'йти в', 'acc', ['parkas', 'parduotuvė', 'mokykla', 'muziejus', 'teatras', 'bažnyčia', 'vaistinė', 'bankas', 'viešbutis', 'miestas', 'turgus']),
    ...gen('važiuoti', 'In', 'їхати', 'ins', ['autobusas', 'dviratis', 'mašina']),
    ...gen('prie', 'K', 'біля', 'gen', ['tiltas', 'stotelė', 'stotis', 'namas', 'parduotuvė', 'šviesoforas', 'bažnyčia', 'muziejus', 'aikštė']),
    ...gen('per', 'G', 'через', 'acc', ['gatvė', 'aikštė', 'tiltas', 'miestas']),
    ...gen('matyti', 'G', 'бачити', 'acc', ['muziejus', 'teatras', 'tiltas', 'bažnyčia', 'viešbutis', 'stotis']),
    ...gen('iki', 'K', 'до', 'gen', ['stotelė', 'miestas', 'parkas', 'muziejus', 'bažnyčia'])
  ],
  home: [
    ...ant('knyga', 'книга', ['stalas']),
    ...ant('telefonas', 'телефон', ['stalas']),
    ...ant('laikrodis', 'годинник', ['siena']),
    ...ant('paveikslas', 'картина', ['siena']),
    ...ant('puodas', 'каструля', ['viryklė', 'stalas']),
    ...gen('eiti į', 'G', 'йти в', 'acc', ['virtuvė', 'vonia', 'kambarys']),
    ...gen('būti', 'Vt', 'бути', 'loc', ['kambarys', 'virtuvė', 'vonia', 'sodas']),
    ...gen('raktas nuo', 'K', 'ключ від', 'gen', ['namas', 'spinta', 'viešbutis']),
    ...gen('prie', 'K', 'біля', 'gen', ['siena', 'langas', 'stalas', 'spinta']),
    ...gen('valyti', 'G', 'прибирати', 'acc', ['kambarys', 'virtuvė', 'vonia'])
  ],
  nature: [
    ...gen('eiti į', 'G', 'йти в', 'acc', ['miškas', 'parkas', 'sodas']),
    ...gen('lipti į', 'G', 'лізти на', 'acc', ['kalnas', 'medis']),
    ...gen('bijoti', 'K', 'боятися', 'gen', ['šuo', 'vilkas', 'meška', 'gyvatė', 'bitė']),
    ...gen('matyti', 'G', 'бачити', 'acc', ['paukštis', 'drugelis', 'voverė', 'lapė', 'kiškis', 'kalnas', 'jūra', 'medis', 'gėlė']),
    ...gen('po', 'In', 'під', 'ins', ['medis', 'krūmas']),
    ...ant('sniegas', 'сніг', ['kalnas', 'medis']),
    ...ant('lapas', 'листок', ['medis', 'šaka']),
    ...gen('plaukti', 'In', 'плисти', 'ins', ['jūra', 'ežeras', 'upė']),
    ...gen('prie', 'K', 'біля', 'gen', ['ežeras', 'upė', 'jūra', 'miškas', 'kalnas']),
    ...gen('matyti', 'G', 'бачити', 'acc', ['saulė', 'mėnulis', 'žvaigždė', 'dangus', 'debesis', 'sniegas'])
  ],
  people: [
    ...gen('skambinti', 'N', 'дзвонити', 'dat', ['draugas', 'brolis', 'sesuo', 'motina', 'tėvas', 'senelis', 'senelė', 'teta', 'dėdė', 'kaimynas', 'gydytojas', 'draugė']),
    ...gen('padėti', 'N', 'допомагати', 'dat', ['motina', 'tėvas', 'brolis', 'sesuo', 'draugas', 'senelė', 'mokytojas', 'kaimynas', 'anūkas']),
    ...gen('mylėti', 'G', 'любити', 'acc', ['motina', 'tėvas', 'sesuo', 'brolis', 'vaikas', 'senelė', 'draugė']),
    ...gen('kalbėti su', 'In', 'говорити з', 'ins', ['draugas', 'mokytojas', 'gydytojas', 'kaimynas', 'tėvas', 'pardavėjas']),
    ...gen('laiškas nuo', 'K', 'лист від', 'gen', ['brolis', 'sesuo', 'draugas', 'senelis', 'teta', 'dėdė'])
  ],
  time: [
    ...gen('po', 'K', 'через', 'acc', ['savaitė', 'valanda', 'minutė', 'mėnuo']),
    ...gen('iki', 'K', 'до', 'gen', ['vakaras', 'rytas', 'naktis', 'pavasaris', 'savaitė', 'šventė', 'gimtadienis']),
    ...gen('per', 'G', 'за', 'acc', ['diena', 'savaitė', 'vasara', 'žiema', 'naktis']),
    ...gen('prieš', 'G', 'перед', 'ins', ['žiema', 'vasara', 'šventė', 'vakaras']),
    ...gen('iki', 'K', 'до', 'gen', ['žiema', 'vasara', 'mėnuo', 'sekmadienis', 'ruduo']),
    ...gen('po', 'K', 'через', 'acc', ['diena', 'vakaras', 'naktis', 'sekundė'])
  ]
};

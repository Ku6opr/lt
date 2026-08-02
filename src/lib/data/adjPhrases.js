function p(a, n) {
  return { a, n };
}

export const ADJ_PHRASES = {
  cafe: [
    p('šiltas', 'kava'), p('juodas', 'kava'), p('stiprus', 'kava'), p('saldus', 'kava'),
    p('šaltas', 'vanduo'), p('šaltas', 'alus'), p('brangus', 'vynas'), p('saldus', 'arbata'),
    p('saldus', 'pyragas'), p('naminis', 'pyragas'), p('didelis', 'tortas'), p('saldus', 'tortas'),
    p('mažas', 'sausainis'), p('naminis', 'sūris'), p('baltas', 'duona'), p('saldus', 'uogienė')
  ],
  prod: [
    p('didelis', 'obuolys'), p('saldus', 'obuolys'), p('raudonas', 'obuolys'), p('žalias', 'agurkas'),
    p('geltonas', 'bananas'), p('mažas', 'bananas'), p('raudonas', 'pomidoras'), p('baltas', 'pienas'),
    p('šaltas', 'pienas'), p('brangus', 'mėsa'), p('pigus', 'duona'), p('didelis', 'arbūzas'),
    p('saldus', 'vynuogė'), p('naminis', 'kiaušinis'), p('geras', 'sūris'), p('mažas', 'kriaušė')
  ],
  street: [
    p('ilgas', 'gatvė'), p('greitas', 'mašina'), p('greitas', 'traukinys'), p('didelis', 'miestas'),
    p('senas', 'namas'), p('naujas', 'namas'), p('aukštas', 'pastatas'), p('paskutinis', 'autobusas'),
    p('medinis', 'tiltas'), p('didelis', 'parkas'), p('senas', 'dviratis'), p('raudonas', 'autobusas'),
    p('naujas', 'stadionas'), p('didelis', 'universitetas')
  ],
  home: [
    p('didelis', 'namas'), p('medinis', 'stalas'), p('naujas', 'telefonas'), p('senas', 'laikrodis'),
    p('mažas', 'kambarys'), p('švarus', 'virtuvė'), p('baltas', 'siena'), p('didelis', 'televizorius'),
    p('senas', 'veidrodis'), p('didelis', 'spinta'), p('naujas', 'kompiuteris'), p('švarus', 'lova')
  ],
  nature: [
    p('aukštas', 'kalnas'), p('gilus', 'ežeras'), p('gilus', 'jūra'), p('gilus', 'upė'),
    p('žalias', 'miškas'), p('didelis', 'medis'), p('gražus', 'gėlė'), p('raudonas', 'gėlė'),
    p('mažas', 'paukštis'), p('greitas', 'arklys'), p('baltas', 'sniegas'), p('šaltas', 'vėjas'),
    p('stiprus', 'vėjas'), p('juodas', 'katė'), p('didelis', 'šuo'), p('mažas', 'žuvis')
  ],
  people: [
    p('jaunas', 'vyras'), p('senas', 'žmogus'), p('geras', 'draugas'), p('gražus', 'moteris'),
    p('jaunas', 'mergaitė'), p('mažas', 'vaikas'), p('stiprus', 'vyras'), p('aukštas', 'vyras'),
    p('senas', 'senelis'), p('geras', 'mokytojas'), p('jaunas', 'studentas'), p('gražus', 'sesuo')
  ],
  time: [
    p('ilgas', 'diena'), p('trumpas', 'naktis'), p('šaltas', 'žiema'), p('šiltas', 'vasara'),
    p('naujas', 'savaitė'), p('paskutinis', 'diena'), p('paskutinis', 'savaitė'), p('ilgas', 'savaitgalis'),
    p('šaltas', 'rytas'), p('trumpas', 'vakaras')
  ]
};

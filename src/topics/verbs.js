export const verbFormsTopic = {
  id: 'verb-forms',
  cat: 'verb',
  depth: 0,
  short: { uk: 'Три форми', ru: 'Три формы', en: 'Three forms' },
  kind: 'vforms',
  n: 1,
  accent: 'gold',
  glyph: 'dirbo',
  title: { uk: 'Дієслово: три форми', ru: 'Глагол: три формы', en: 'Verb: three forms' },
  subtitle: {
    uk: 'Перші дієслова у трьох формах: dirbti → dirba → dirbo. Інфінітив, теперішній і минулий час.',
    ru: 'Первые глаголы в трёх формах: dirbti → dirba → dirbo. Инфинитив, настоящее и прошедшее время.',
    en: 'First verbs in three forms: dirbti → dirba → dirbo. Infinitive, present and past.'
  },
  trainerTitle: { uk: 'Три форми дієслова', ru: 'Три формы глагола', en: 'Three verb forms' }
};

export const verbsTopic = {
  id: 'conj',
  cat: 'verb',
  depth: 1,
  short: { uk: 'Теперішній', ru: 'Настоящее', en: 'Present' },
  kind: 'conj',
  n: 2,
  accent: 'gold',
  glyph: 'turiu',
  title: { uk: 'Дієслово: теперішній час', ru: 'Глагол: настоящее время', en: 'Verb: present tense' },
  subtitle: {
    uk: 'Узгодження дієслова з особою: aš turiu, tu turi, mes turime. Теперішній час.',
    ru: 'Согласование глагола с лицом: aš turiu, tu turi, mes turime. Настоящее время.',
    en: 'Agreeing the verb with the person: aš turiu, tu turi, mes turime. Present tense.'
  },
  trainerTitle: { uk: 'Дієвідмінювання в теперішньому часі', ru: 'Спряжение в настоящем времени', en: 'Present-tense conjugation' }
};

export const conjPastTopic = {
  id: 'conj-past',
  cat: 'verb',
  depth: 2,
  short: { uk: 'Минулий', ru: 'Прошедшее', en: 'Past' },
  kind: 'conj',
  tense: 'past',
  n: 3,
  accent: 'gold',
  glyph: 'dirbau',
  title: { uk: 'Дієслово: минулий час', ru: 'Глагол: прошедшее время', en: 'Verb: past tense' },
  subtitle: {
    uk: 'Минулий час за особами: aš dirbau, tu dirbai, jis dirbo.',
    ru: 'Прошедшее время по лицам: aš dirbau, tu dirbai, jis dirbo.',
    en: 'Past tense by person: aš dirbau, tu dirbai, jis dirbo.'
  },
  trainerTitle: { uk: 'Дієвідмінювання в минулому часі', ru: 'Спряжение в прошедшем времени', en: 'Past-tense conjugation' }
};

export const conjFutTopic = {
  id: 'conj-fut',
  cat: 'verb',
  depth: 3,
  short: { uk: 'Майбутній', ru: 'Будущее', en: 'Future' },
  kind: 'conj',
  tense: 'fut',
  n: 4,
  accent: 'gold',
  glyph: 'dirbs',
  title: { uk: 'Дієслово: майбутній час', ru: 'Глагол: будущее время', en: 'Verb: future tense' },
  subtitle: {
    uk: 'Майбутній час за особами: aš dirbsiu, tu dirbsi, jis dirbs.',
    ru: 'Будущее время по лицам: aš dirbsiu, tu dirbsi, jis dirbs.',
    en: 'Future tense by person: aš dirbsiu, tu dirbsi, jis dirbs.'
  },
  trainerTitle: { uk: 'Дієвідмінювання в майбутньому часі', ru: 'Спряжение в будущем времени', en: 'Future-tense conjugation' }
};

export const conjImpTopic = {
  id: 'conj-imp',
  cat: 'verb',
  depth: 4,
  short: { uk: 'Наказовий', ru: 'Повелительное', en: 'Imperative' },
  kind: 'conj',
  tense: 'imp',
  n: 5,
  accent: 'gold',
  glyph: 'dirbk!',
  title: { uk: 'Дієслово: наказовий', ru: 'Глагол: повелительное', en: 'Verb: imperative' },
  subtitle: {
    uk: 'Наказовий спосіб: dirbk! dirbkite! Утворюється від інфінітива.',
    ru: 'Повелительное наклонение: dirbk! dirbkite! Образуется от инфинитива.',
    en: 'Imperative mood: dirbk! dirbkite! Formed from the infinitive.'
  },
  trainerTitle: { uk: 'Наказовий спосіб', ru: 'Повелительное наклонение', en: 'Imperative mood' }
};

export const conjCondTopic = {
  id: 'conj-cond',
  cat: 'verb',
  depth: 5,
  short: { uk: 'Умовний («би»)', ru: 'Условное («бы»)', en: 'Conditional' },
  kind: 'conj',
  tense: 'cond',
  n: 6,
  accent: 'gold',
  glyph: 'dirbtų',
  title: { uk: 'Дієслово: умовний («би»)', ru: 'Глагол: условное («бы»)', en: 'Verb: conditional' },
  subtitle: {
    uk: 'Умовний спосіб за особами: norėčiau — «хотів би», dirbtume — «ми працювали б».',
    ru: 'Условное наклонение по лицам: norėčiau — «хотел бы», dirbtume — «мы работали бы».',
    en: 'Conditional mood by person: norėčiau — “I would like”, dirbtume — “we would work”.'
  },
  trainerTitle: { uk: 'Умовний спосіб', ru: 'Условное наклонение', en: 'Conditional mood' }
};

export const conjHabitTopic = {
  id: 'conj-habit',
  cat: 'verb',
  depth: 6,
  short: { uk: 'Багаторазовий', ru: 'Привычный', en: 'Habitual' },
  kind: 'conj',
  tense: 'habit',
  n: 18,
  accent: 'gold',
  glyph: 'eidavo',
  title: { uk: 'Дієслово: минулий багаторазовий', ru: 'Глагол: прошедшее многократное', en: 'Verb: habitual past' },
  subtitle: {
    uk: 'Те, що робив раніше, а тепер уже ні: dirbdavau — «я раніше працював (регулярно)». Утворюється від інфінітива суфіксом -dav-.',
    ru: 'То, что раньше делал регулярно, а теперь уже нет: dirbdavau — «я раньше работал (регулярно)». Образуется от инфинитива суффиксом -dav-.',
    en: 'Something you used to do repeatedly but don’t anymore: dirbdavau — “I used to work”. Formed from the infinitive with the suffix -dav-.'
  },
  trainerTitle: { uk: 'Минулий багаторазовий час', ru: 'Прошедшее многократное время', en: 'Habitual past tense' }
};

export const tebeNebeTopic = {
  id: 'tebe-nebe',
  cat: 'verb',
  depth: 7,
  short: { uk: 'tebe- / nebe-', ru: 'tebe- / nebe-', en: 'tebe- / nebe-' },
  kind: 'tebe',
  n: 19,
  accent: 'gold',
  glyph: 'nebėra',
  title: { uk: 'Дієслово: tebe- / nebe-', ru: 'Глагол: tebe- / nebe-', en: 'Verb: tebe- / nebe-' },
  subtitle: {
    uk: 'Досі й уже не: tebedirbu — «я досі працюю», nebedirbu — «я вже не працюю». yra → tebėra / nebėra.',
    ru: 'Всё ещё и уже не: tebedirbu — «я всё ещё работаю», nebedirbu — «я уже не работаю». yra → tebėra / nebėra.',
    en: 'Still and no longer: tebedirbu — “I still work”, nebedirbu — “I no longer work”. yra → tebėra / nebėra.'
  },
  trainerTitle: { uk: 'Досі (tebe-) і вже не (nebe-)', ru: 'Всё ещё (tebe-) и уже не (nebe-)', en: 'Still (tebe-) and no longer (nebe-)' }
};

export const reflTopic = {
  id: 'refl',
  cat: 'verb',
  depth: 8,
  short: { uk: 'Теперішній -si', ru: 'Настоящее -si', en: 'Present -si' },
  kind: 'refl',
  tense: 'pres',
  n: 20,
  accent: 'gold',
  glyph: 'mokosi',
  title: { uk: 'Зворотні дієслова: теперішній', ru: 'Возвратные глаголы: настоящее', en: 'Reflexive verbs: present' },
  subtitle: {
    uk: 'Зворотні дієслова в теперішньому часі: mokausi — «я вчуся», mokosi — «він учиться». Із запереченням -si- стає після ne-: nesimokau.',
    ru: 'Возвратные глаголы в настоящем времени: mokausi — «я учусь», mokosi — «он учится». С отрицанием -si- встаёт после ne-: nesimokau.',
    en: 'Reflexive verbs in the present: mokausi — “I study”, mokosi — “he studies”. With negation -si- moves after ne-: nesimokau.'
  },
  trainerTitle: { uk: 'Зворотні дієслова в теперішньому часі', ru: 'Возвратные глаголы в настоящем времени', en: 'Reflexive verbs in the present tense' }
};

export const reflPastTopic = {
  id: 'refl-past',
  cat: 'verb',
  depth: 9,
  short: { uk: 'Минулий -si', ru: 'Прошедшее -si', en: 'Past -si' },
  kind: 'refl',
  tense: 'past',
  n: 21,
  accent: 'gold',
  glyph: 'mokėsi',
  title: { uk: 'Зворотні дієслова: минулий', ru: 'Возвратные глаголы: прошедшее', en: 'Reflexive verbs: past' },
  subtitle: {
    uk: 'Зворотні дієслова в минулому часі: mokiausi — «я вчився», mokėsi — «він учився». Із запереченням: nesimokiau.',
    ru: 'Возвратные глаголы в прошедшем времени: mokiausi — «я учился», mokėsi — «он учился». С отрицанием: nesimokiau.',
    en: 'Reflexive verbs in the past: mokiausi — “I studied”, mokėsi — “he studied”. With negation: nesimokiau.'
  },
  trainerTitle: { uk: 'Зворотні дієслова в минулому часі', ru: 'Возвратные глаголы в прошедшем времени', en: 'Reflexive verbs in the past tense' }
};

export const reflFutTopic = {
  id: 'refl-fut',
  cat: 'verb',
  depth: 10,
  short: { uk: 'Майбутній -si', ru: 'Будущее -si', en: 'Future -si' },
  kind: 'refl',
  tense: 'fut',
  n: 22,
  accent: 'gold',
  glyph: 'kelsis',
  title: { uk: 'Зворотні дієслова: майбутній', ru: 'Возвратные глаголы: будущее', en: 'Reflexive verbs: future' },
  subtitle: {
    uk: 'Зворотні дієслова в майбутньому часі: mokysiuosi — «я буду вчитися», mokysis — «він буде вчитися». Із запереченням: nesimokysiu.',
    ru: 'Возвратные глаголы в будущем времени: mokysiuosi — «я буду учиться», mokysis — «он будет учиться». С отрицанием: nesimokysiu.',
    en: 'Reflexive verbs in the future: mokysiuosi — “I will study”, mokysis — “he will study”. With negation: nesimokysiu.'
  },
  trainerTitle: { uk: 'Зворотні дієслова в майбутньому часі', ru: 'Возвратные глаголы в будущем времени', en: 'Reflexive verbs in the future tense' }
};

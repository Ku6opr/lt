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

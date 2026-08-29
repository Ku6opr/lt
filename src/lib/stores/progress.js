import { writable, get } from 'svelte/store';

const KEY = 'lt-progress-v1';

// згортає ВСЮ діакритику (литовські ą č ę ė į š ų ū ž + наголоси ´ ` ˜) до базової літери —
// щоб ввід без діакритики збігався з відповіддю (у т.ч. з наголосами)
export function fold(s) {
  return (s || '').toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Ключі-виміри однієї задачі. cell = парадигмова клітинка (тип×відмінок×число) = закінчення;
// form = конкретне слово; dims = окремі осі для агрегації/дашборду.
export function keysFor(t, isAdj) {
  if (t.dem) {
    return {
      form: `w|${t.wordId}|${t.gender}|${t.caseId}|${t.number}`,
      cell: `tc|${t.wordId}|${t.caseId}|${t.number}`,
      dims: [`case|${t.caseId}`, `num|${t.number}`]
    };
  }
  if (t.quest) {
    return {
      form: `w|${t.wordId}|${t.qw}`,
      cell: `tc|${t.qw}|${t.g}|${t.number}`,
      dims: [`qw|${t.qw}`, `num|${t.number}`]
    };
  }
  if (t.numqty) {
    return {
      form: `w|${t.wordId}|${t.gender}`,
      cell: `tc|${t.wordId}`,
      dims: []
    };
  }
  if (t.numeral) {
    return {
      form: `w|${t.wordId}|${t.gender}|${t.caseId}`,
      cell: `tc|${t.wordId}|${t.caseId}`,
      dims: [`case|${t.caseId}`]
    };
  }
  if (t.vforms) {
    return {
      form: `w|${t.wordId}|${t.formTarget}`,
      cell: `tc|${t.formTarget}`,
      dims: [`vf|${t.formTarget}`]
    };
  }
  if (t.conj) {
    return {
      form: `w|${t.wordId}|${t.person}`,
      cell: `tc|${t.person}`,
      dims: [`person|${t.person}`, `num|${t.number}`]
    };
  }
  if (t.degree) {
    return {
      form: `w|${t.wordId}|${t.gender}|${t.degree}|${t.number}`,
      cell: `tc|${t.adjType}|${t.gender}|${t.degree}|${t.number}`,
      dims: [`deg|${t.degree}`, `atype|${t.adjType}`, `gender|${t.gender}`, `num|${t.number}`]
    };
  }
  if (isAdj) {
    return {
      form: `w|${t.wordId}|${t.gender}|${t.caseId}|${t.number}`,
      cell: `tc|${t.adjType}|${t.gender}|${t.caseId}|${t.number}`,
      dims: [`case|${t.caseId}`, `atype|${t.adjType}`, `gender|${t.gender}`, `num|${t.number}`]
    };
  }
  return {
    form: `w|${t.wordId}|${t.caseId}|${t.number}`,
    cell: `tc|${t.typeId}|${t.caseId}|${t.number}`,
    dims: [`case|${t.caseId}`, `ntype|${t.typeId}`, `num|${t.number}`]
  };
}

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
}

export const progress = writable(load());
progress.subscribe((v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
});

function bump(tt, k, correct) {
  const r = tt.forms[k] || (tt.forms[k] = { s: 0, o: 0, m: 0, t: 0 });
  r.s += 1;
  if (correct === true) r.o += 1;
  else if (correct === false) r.m += 1;
  r.t = tt.tick;
}

// correct: true | false | null (null = seen without a typed answer)
export function record(topic, keys, correct) {
  progress.update((all) => {
    const tt = all[topic] || (all[topic] = { forms: {}, tick: 0 });
    tt.tick += 1;
    bump(tt, keys.form, correct);
    bump(tt, keys.cell, correct);
    for (const d of keys.dims) bump(tt, d, correct);
    return all;
  });
}

// weakness of a single key: unseen ≈ 1.0, weak/missed ↑, mastered ↓, resurfaces with time
function keyWeight(tt, k) {
  const r = tt && tt.forms[k];
  if (!r || r.s === 0) return 1;
  const missRate = r.m / r.s;
  const gap = tt.tick - r.t;
  const strength = r.o - r.m;
  let w = 0.25 + 1.4 * missRate;
  if (strength <= 0) w += 0.4;
  w += Math.min(0.5, gap / 40);
  return Math.max(0.1, Math.min(2.5, w));
}

// вага кандидата: клітинка-закінчення домінує, слово — довесок (вокабуляр/покриття)
export function candidateWeight(topic, keys) {
  const tt = get(progress)[topic];
  if (!tt) return 1;
  return 0.6 * keyWeight(tt, keys.cell) + 0.4 * keyWeight(tt, keys.form);
}

export function keyStat(topic, key) {
  const tt = get(progress)[topic];
  return (tt && tt.forms[key]) || null;
}

// вага виміру (напр. `ntype|as`) — для стратифікації кандидатів за типом
export function dimWeight(topic, key) {
  return keyWeight(get(progress)[topic], key);
}

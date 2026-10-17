import { writable } from 'svelte/store';

export function dayKey(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function load(key) {
  try {
    const v = JSON.parse(localStorage.getItem(key));
    return v && v.days && typeof v.days === 'object' ? v : { days: {} };
  } catch (e) {
    return { days: {} };
  }
}

export function dayStore(key) {
  const state = writable(load(key));
  state.subscribe((v) => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch (e) {}
  });
  return {
    state,
    completeDay: (date, correct, total) => state.update((v) => ({ ...v, days: { ...v.days, [date]: { correct, total } }, session: null })),
    saveSession: (date, results, hints = []) => state.update((v) => ({ ...v, session: { date, results, hints } })),
    addHinted: (entry) => state.update((v) => ({ ...v, hinted: [...(v.hinted || []), entry] }))
  };
}

export const dailyStore = dayStore('lt-daily-v1');
export const daily = dailyStore.state;
export const { completeDay, saveSession, addHinted } = dailyStore;
export const pictureStore = dayStore('lt-pictures-v1');

function shift(base, n) {
  return new Date(base.getFullYear(), base.getMonth(), base.getDate() + n);
}

export function streakOf(days, now = new Date()) {
  let d = days[dayKey(now)] ? now : shift(now, -1);
  let n = 0;
  while (days[dayKey(d)]) {
    n += 1;
    d = shift(d, -1);
  }
  return n;
}

export function lastWeek(days, now = new Date()) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = shift(now, i - 6);
    const r = days[dayKey(d)];
    return { key: dayKey(d), weekday: (d.getDay() + 6) % 7, today: i === 6, done: !!r, share: r && r.total > 0 ? r.correct / r.total : 0 };
  });
}

import { writable } from 'svelte/store';

const KEY = 'lt-daily-v1';

export function dayKey(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return v && v.days && typeof v.days === 'object' ? v : { days: {} };
  } catch (e) {
    return { days: {} };
  }
}

export const daily = writable(load());
daily.subscribe((v) => {
  try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
});

export function completeDay(key, correct, total) {
  daily.update((v) => ({ ...v, days: { ...v.days, [key]: { correct, total } }, session: null }));
}

export function saveSession(key, results) {
  daily.update((v) => ({ ...v, session: { date: key, results } }));
}

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

import fs from 'fs';

const REPO = 'Ku6opr/lt';
const UA = 'lt-trainer/1.0 (https://github.com/Ku6opr/lt)';
const OUT = 'node_modules/.cache/ads-inbox';
const ASSET = /https:\/\/github\.com\/user-attachments\/assets\/[0-9a-f-]+/g;

fs.mkdirSync(OUT, { recursive: true });

const res = await fetch(`https://api.github.com/repos/${REPO}/issues?state=open&per_page=100`, { headers: { 'User-Agent': UA, Accept: 'application/vnd.github+json' } });
if (!res.ok) throw new Error('GitHub API: HTTP ' + res.status);
const only = process.argv.slice(2).map(Number);
const issues = (await res.json()).filter((i) => !i.pull_request && (only.length ? only.includes(i.number) : i.title.startsWith('Реклама')));

for (const issue of issues) {
  console.log(`#${issue.number} ${issue.user.login} ${issue.html_url}`);
  console.log((issue.body || '').replace(ASSET, '').replace(/!\[[^\]]*\]\(\)|<img[^>]*>/g, '').trim().replace(/^/gm, '  | '));
  for (const [k, url] of [...new Set((issue.body || '').match(ASSET) || [])].entries()) {
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) {
      console.log(`  ${url} HTTP ${r.status}`);
      continue;
    }
    const ext = (r.headers.get('content-type') || '').split('/')[1] || 'bin';
    const file = `${OUT}/${issue.number}-${k + 1}.${ext}`;
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    console.log(`  ${file} ← ${url}`);
  }
}
if (!issues.length) console.log('no open "Реклама" issues');

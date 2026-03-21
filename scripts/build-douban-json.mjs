import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
      continue;
    }
    cur += c;
  }
  result.push(cur);
  return result;
}

const csvPath = path.join(__dirname, 'douban-top250.csv');
const outPath = path.join(__dirname, '../public/data/douban-top250.json');

const csv = fs.readFileSync(csvPath, 'utf8');
const lines = csv.trim().split('\n');
const rows = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  if (cols.length < 7) continue;
  rows.push({
    rank: parseInt(cols[0], 10),
    title: cols[1],
    original_title: cols[2],
    year: cols[3],
    rating_num: cols[4],
    rating_count: cols[5],
    dbid: cols[6],
  });
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(rows, null, 2));
console.log(`Wrote ${rows.length} movies to ${outPath}`);

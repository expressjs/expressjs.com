#!/usr/bin/env node

import { readFile, writeFile } from "fs/promises";
import path from "path";

const filePath =
  process.argv[2] || path.resolve(path.join('..', '..', ".well-known", "security.txt"));
let content;
try {
  content = await readFile(filePath, "utf8");
} catch (err) {
  console.error("Unable to read file:", filePath);
  console.error(err.message);
  process.exit(2);
}

const lines = content.split(/\r?\n/);
const expiresRegex = /^Expires:\s*(.+)$/i;
const now = new Date();
const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
const newDurationMs = 180 * 24 * 60 * 60 * 1000;
const cutoff = new Date(now.getTime() + oneMonthMs);

let found = false;
let changed = false;
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(expiresRegex);
  if (m) {
    found = true;
    const raw = m[1].trim();
    const normalized = raw.replace(/z$/, "Z").replace(/Z$/, "Z");
    const parsed = Date.parse(normalized);
    if (isNaN(parsed)) {
      console.warn(
        "Could not parse existing Expires date; will replace. Value:",
        raw
      );
    } else {
      const expiresDate = new Date(parsed);
      if (expiresDate > cutoff) {
        console.log(
          "Current expiry date is more than 1 month out; no change required. Date:",
          expiresDate.toISOString()
        );
        process.exit(0);
      }
    }

    const newExpiry = new Date(now.getTime() + newDurationMs);
    const iso = newExpiry.toISOString().replace(/\.\d{3}Z$/, "Z");
    lines[i] = `Expires: ${iso}`;
    changed = true;
    break;
  }
}

if (!found) {
  const newExpiry = new Date(now.getTime() + newDurationMs);
  const iso = newExpiry.toISOString().replace(/\.\d{3}Z$/, "Z");
  if (content.length && !content.endsWith("\n")) lines.push("");
  lines.push(`Expires: ${iso}`);
  changed = true;
  console.log("No Expires line found. A new one will be added.");
}

if (!changed) {
  console.log("No changes made.");
  process.exit(0);
}

try {
  await writeFile(filePath, lines.join("\n"), "utf8");
  console.log(`File updated: ${filePath}`);
} catch (err) {
  console.error("Error writing files:", err.message);
  process.exit(3);
}

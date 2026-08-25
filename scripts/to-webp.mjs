#!/usr/bin/env node
/**
 * Convierte PNG/JPG a WebP.
 *
 *   pnpm img:webp <carpeta-o-archivo> [...más] [--quality=82] [--delete] [--force]
 *
 * Si el WebP resulta mas pesado que el original se descarta (--keep-larger
 * lo conserva igual).
 *
 * Por defecto es recursivo, conserva los originales y omite los que ya
 * tienen un .webp al lado (usar --force para regenerarlos).
 */
import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const targets = args.filter((a) => !a.startsWith("--"));

const quality = Number(
  flags.find((f) => f.startsWith("--quality="))?.split("=")[1] ?? 82,
);
const deleteOriginals = flags.includes("--delete");
const force = flags.includes("--force");
const keepLarger = flags.includes("--keep-larger");

if (targets.length === 0) {
  console.error(
    "Uso: pnpm img:webp <carpeta-o-archivo> [...] [--quality=82] [--delete] [--force]",
  );
  process.exit(1);
}

async function collect(target) {
  const info = await stat(target);
  if (info.isFile()) {
    return SOURCE_EXT.has(path.extname(target).toLowerCase()) ? [target] : [];
  }
  const entries = await readdir(target, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => collect(path.join(target, entry.name))),
  );
  return files.flat();
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

let converted = 0;
let skipped = 0;
let savedBytes = 0;

for (const target of targets) {
  if (!existsSync(target)) {
    console.error(`✗ no existe: ${target}`);
    process.exitCode = 1;
    continue;
  }

  for (const file of await collect(target)) {
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

    if (existsSync(out) && !force) {
      skipped += 1;
      console.log(
        `- ${path.relative(process.cwd(), out)} ya existe (--force para rehacerlo)`,
      );
      continue;
    }

    const before = (await stat(file)).size;
    await sharp(file).webp({ quality, effort: 6 }).toFile(out);
    const after = (await stat(out)).size;

    if (after >= before && !keepLarger) {
      await unlink(out);
      skipped += 1;
      console.log(
        `- ${path.relative(process.cwd(), file)}: el WebP sale mas grande (${kb(before)} -> ${kb(after)}), descartado`,
      );
      continue;
    }

    savedBytes += before - after;
    converted += 1;
    const pct = (((before - after) / before) * 100).toFixed(0);
    console.log(
      `✓ ${path.relative(process.cwd(), out)}  ${kb(before)} → ${kb(after)} (-${pct}%)`,
    );

    if (deleteOriginals) await unlink(file);
  }
}

console.log(
  `\n${converted} convertida(s), ${skipped} omitida(s), ${kb(savedBytes)} ahorrados.`,
);

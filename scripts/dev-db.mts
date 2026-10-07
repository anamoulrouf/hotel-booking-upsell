// Local dev database: real Postgres binaries via npm — no Homebrew/Docker/accounts.
// Run: pnpm db:up   (keep it running in a terminal/background while developing)
import EmbeddedPostgres from "embedded-postgres";
import { existsSync, readdirSync, readlinkSync, symlinkSync, lstatSync } from "node:fs";
import { join } from "node:path";

const dataDir = join(import.meta.dirname, "..", ".pgdata");
const PORT = 5433;

// pnpm's extraction drops the unversioned dylib alias symlinks the
// @embedded-postgres packages ship with (e.g. libicudata.68.dylib -> libicudata.68.2.dylib),
// so the binaries fail to load under dyld. Recreate aliases idempotently.
// Fixed upstream / with npm or yarn installs, this loop finds nothing to do.
function fixDylibAliases() {
  const roots = [
    join(import.meta.dirname, "..", "node_modules", ".pnpm"),
    join(import.meta.dirname, "..", "node_modules", "@embedded-postgres"),
  ];
  const libDirs: string[] = [];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const entry of readdirSync(root, { recursive: true })) {
      const p = String(entry);
      if (p.endsWith("native/lib") && !p.includes("/bin/")) libDirs.push(join(root, p));
    }
  }
  let created = 0;
  for (const dir of new Set(libDirs)) {
    for (const name of readdirSync(dir)) {
      // libX.A.B.dylib → alias libX.A.dylib and libX.dylib
      const m = /^(lib.+)\.(\d+)\.(\d+)\.dylib$/.exec(name);
      if (!m) continue;
      for (const alias of [`${m[1]}.${m[2]}.dylib`, `${m[1]}.dylib`]) {
        const target = join(dir, alias);
        if (existsSync(target) || lstatSyncSafe(target)) continue;
        symlinkSync(name, target);
        created++;
      }
    }
  }
  if (created) console.log(`recreated ${created} missing dylib aliases (pnpm symlink drop)`);
}

function lstatSyncSafe(p: string): boolean {
  try {
    readlinkSync(p);
    return true; // dangling symlink still satisfies dyld if we recreate target? no — treat as present
  } catch {
    return false;
  }
}

fixDylibAliases();

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: "uplayer",
  password: "uplayer",
  port: PORT,
  persistent: true,
});

if (!existsSync(join(dataDir, "PG_VERSION"))) {
  console.log(`initialising cluster at ${dataDir} …`);
  await pg.initialise();
}

console.log(`starting postgres on :${PORT} …`);
await pg.start();

try {
  await pg.createDatabase("uplayer");
  console.log("database 'uplayer' created");
} catch {
  console.log("database 'uplayer' already exists");
}

console.log(`\n✅ Postgres ready → postgres://uplayer:uplayer@localhost:${PORT}/uplayer`);
console.log("Press Ctrl+C to stop.\n");

// Keep the server (a child process) alive until interrupted.
process.on("SIGINT", async () => {
  await pg.stop();
  process.exit(0);
});
setInterval(() => {}, 1 << 30);

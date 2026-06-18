/**
 * Package manager helpers.
 *
 * Converts an `npm`/`npx` command into the equivalent command for the other
 * supported package managers (Yarn, pnpm, Bun, Deno) so docs can show a single,
 * authored npm command and let readers pick their tool of choice.
 *
 * Authors write the npm command they already know; everything else is derived.
 * Commands that have no clean cross-manager equivalent (e.g. `npm install
 * <pkg> --no-save`) should stay as a plain fenced code block instead.
 */

export const PACKAGE_MANAGERS = ['npm', 'yarn', 'pnpm', 'bun', 'deno'] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const PACKAGE_MANAGER_LABELS: Record<PackageManager, string> = {
  npm: 'npm',
  yarn: 'yarn',
  pnpm: 'pnpm',
  bun: 'bun',
  deno: 'deno',
};

/**
 * A command per package manager. `null` means the command has no equivalent for
 * that manager (e.g. `--no-save` is only supported by npm and Bun); the
 * component skips managers mapped to `null`.
 */
type CommandMap = Record<PackageManager, string | null>;

const DEV_FLAGS = new Set(['-D', '--save-dev', '--dev']);
const GLOBAL_FLAGS = new Set(['-g', '--global']);
// Save-related flags that npm understands but carry no meaning elsewhere.
const SAVE_FLAGS = new Set(['-S', '--save', '-P', '--save-prod']);

const sameForAll = (command: string): CommandMap => ({
  npm: command,
  yarn: command,
  pnpm: command,
  bun: command,
  deno: command,
});

const join = (...parts: (string | false | undefined)[]): string =>
  parts.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();

/**
 * Convert an `npm`/`npx` command string into the equivalent command for every
 * supported package manager. Unrecognised commands are returned unchanged for
 * all managers so the component degrades gracefully.
 */
export function convertPackageManagerCommand(command: string): CommandMap {
  const tokens = command.trim().split(/\s+/);
  const [bin, sub, ...rest] = tokens;

  // npx codemod@latest ... -> yarn/pnpm dlx, bunx, deno x
  if (bin === 'npx') {
    const exec = tokens.slice(1).join(' ');
    return {
      npm: join('npx', exec),
      yarn: join('yarn dlx', exec),
      pnpm: join('pnpm dlx', exec),
      bun: join('bunx', exec),
      deno: join('deno x', exec),
    };
  }

  if (bin !== 'npm') return sameForAll(command);

  switch (sub) {
    case 'install':
    case 'i':
    case 'add': {
      const flags = rest.filter((t) => t.startsWith('-'));
      const packages = rest.filter((t) => !t.startsWith('-'));
      const isDev = flags.some((f) => DEV_FLAGS.has(f));
      const isGlobal = flags.some((f) => GLOBAL_FLAGS.has(f));
      // `--no-save` only exists on npm and Bun; Yarn, pnpm and Deno have no equivalent.
      const hasNoSave = flags.includes('--no-save');
      const extra = flags.filter(
        (f) => !DEV_FLAGS.has(f) && !GLOBAL_FLAGS.has(f) && !SAVE_FLAGS.has(f)
      );
      const pkgs = packages.join(' ');
      const extras = extra.join(' ');

      // `npm install` with no packages -> install all dependencies.
      if (packages.length === 0) {
        return {
          npm: join('npm install', extras),
          yarn: join('yarn install', extras),
          pnpm: join('pnpm install', extras),
          bun: join('bun install', extras),
          deno: join('deno install', extras),
        };
      }

      return {
        npm: command,
        yarn: hasNoSave
          ? null
          : isGlobal
            ? join('yarn global add', isDev && '--dev', pkgs, extras)
            : join('yarn add', isDev && '--dev', pkgs, extras),
        pnpm: hasNoSave
          ? null
          : join('pnpm add', isDev && '--save-dev', isGlobal && '--global', pkgs, extras),
        bun: join('bun add', isDev && '--dev', isGlobal && '--global', pkgs, extras),
        // `deno add` is an alias of `deno install`; use `deno install -g` for
        // global installs. Deno has no `--no-save` equivalent.
        deno: hasNoSave
          ? null
          : join(isGlobal ? 'deno install -g' : 'deno add', isDev && '--dev', pkgs, extras),
      };
    }

    case 'uninstall':
    case 'remove':
    case 'rm': {
      const flags = rest.filter((t) => t.startsWith('-'));
      const packages = rest.filter((t) => !t.startsWith('-'));
      const isGlobal = flags.some((f) => GLOBAL_FLAGS.has(f));
      const pkgs = packages.join(' ');
      return {
        npm: command,
        yarn: isGlobal ? join('yarn global remove', pkgs) : join('yarn remove', pkgs),
        pnpm: join('pnpm remove', isGlobal && '--global', pkgs),
        bun: join('bun remove', isGlobal && '--global', pkgs),
        deno: isGlobal ? null : join('deno remove', pkgs),
      };
    }

    case 'init':
    case 'create': {
      const args = rest.join(' ');
      // Plain `npm init` (project scaffolding) vs `npm init <starter>`.
      if (sub === 'init' && (rest.length === 0 || rest.every((t) => t.startsWith('-')))) {
        return {
          npm: command,
          yarn: join('yarn init', args),
          pnpm: join('pnpm init', args),
          bun: join('bun init', args),
          deno: join('deno init', args),
        };
      }
      return {
        npm: command,
        yarn: join('yarn create', args),
        pnpm: join('pnpm create', args),
        bun: join('bun create', args),
        deno: join('deno create --npm', args),
      };
    }

    case 'run': {
      const args = rest.join(' ');
      return {
        npm: command,
        yarn: join('yarn', args),
        pnpm: join('pnpm', args),
        bun: join('bun run', args),
        deno: join('deno task', args),
      };
    }

    default:
      return sameForAll(command);
  }
}

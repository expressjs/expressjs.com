/**
 * Single source of truth for the documented Express versions.
 *
 * Anything that needs the version list, the version prefixes, or the latest
 * (default) version should import from here instead of hardcoding `'5x'`.
 */

export interface VersionOption {
  /** URL/path segment, e.g. `5x`. */
  id: string;
  /** Human-readable label, e.g. `v5.x`. */
  label: string;
  /** Marks the latest version (the one served at unversioned URLs). */
  isDefault?: boolean;
  /** Marks a version that is no longer maintained. */
  isDeprecated?: boolean;
}

/** All documented versions, newest first. */
export const VERSIONS: VersionOption[] = [
  { id: '5x', label: 'v5.x', isDefault: true },
  { id: '4x', label: 'v4.x' },
  { id: '3x', label: 'v3.x (deprecated)', isDeprecated: true },
];

/** Version path prefixes, e.g. `['5x', '4x', '3x']`. */
export const VERSION_PREFIXES: string[] = VERSIONS.map((v) => v.id);

/** The latest version, served at unversioned URLs (e.g. `5x`). */
export const DEFAULT_VERSION: string = (VERSIONS.find((v) => v.isDefault) ?? VERSIONS[0]).id;

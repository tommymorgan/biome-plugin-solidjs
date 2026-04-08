# Changelog

## 0.2.0

### Added

- New rule: `solid-no-object-signal-without-equals` — warns when `createSignal` has an object type parameter but no custom `equals` function, which can cause unnecessary reactive updates due to reference equality.
- `biome-manifest.jsonc` so the plugin can be referenced by package name in `biome.json`:
  ```json
  { "plugins": ["biome-plugin-solidjs"] }
  ```

### Fixed

- `solid-no-destructured-props` no longer flags callback parameter destructuring inside object property values (e.g., vitest `.extend()` fixture definitions).

## 0.1.2 — 2026-03-29

### Fixed

- `solid-no-toplevel-effect` and `solid-no-stored-jsx` no longer flag `export default function` components.

## 0.1.1 — 2026-03-29

### Fixed

- `solid-no-destructured-props` narrowed to parameter-level destructuring only. Body-level destructuring from hooks and contexts (`useAuth()`, `useSearchParams()`, `useContext()`) is no longer flagged.

## 0.1.0 — 2026-03-23

### Added

- Initial release with five GritQL lint rules for SolidJS:
  - `solid-no-destructured-props` — props are reactive getter objects; destructuring breaks reactivity
  - `solid-no-array-map-in-jsx` — use `<For>` or `<Index>` instead of `.map()` in JSX
  - `solid-no-memo-in-loop` — don't create reactive primitives inside loop callbacks
  - `solid-no-toplevel-effect` — `createEffect`/`createMemo` at module scope has no owner and will leak
  - `solid-no-stored-jsx` — JSX creates live DOM nodes immediately, not virtual DOM descriptors

# biome-plugin-solidjs

Biome [GritQL](https://biomejs.dev/linter/plugins/) lint rules for [SolidJS](https://www.solidjs.com/). Catches common reactivity bugs at lint time.

## Rules

| Rule | Description |
|------|-------------|
| `solid-no-destructured-props` | Flags destructured props in component parameter lists. Props are reactive getter objects — destructuring severs reactivity. Body-level destructuring (hooks, contexts) is allowed. |
| `solid-no-array-map-in-jsx` | Flags `.map()` inside JSX expressions. In Solid, `.map()` runs once and produces static DOM. Use `<For>` or `<Index>`. |
| `solid-no-memo-in-loop` | Flags `createMemo()` inside `.map()`, `.forEach()`, and other array method callbacks. |
| `solid-no-toplevel-effect` | Flags `createEffect()` and `createMemo()` at module scope, where they have no reactive owner and will leak. |
| `solid-no-stored-jsx` | Flags JSX stored in module-scope variables. Solid JSX compiles to real DOM operations, not virtual DOM descriptors. |

## Install

```bash
npm install -D biome-plugin-solidjs
```

## Setup

Add the rules you want to your `biome.json` or `biome.jsonc`:

```jsonc
{
  "plugins": [
    "./node_modules/biome-plugin-solidjs/rules/solid-no-destructured-props.grit",
    "./node_modules/biome-plugin-solidjs/rules/solid-no-array-map-in-jsx.grit",
    "./node_modules/biome-plugin-solidjs/rules/solid-no-memo-in-loop.grit",
    "./node_modules/biome-plugin-solidjs/rules/solid-no-toplevel-effect.grit",
    "./node_modules/biome-plugin-solidjs/rules/solid-no-stored-jsx.grit"
  ]
}
```

Pick only the rules relevant to your project — you don't have to use all of them.

## Requirements

- [Biome](https://biomejs.dev/) >= 2.0.0 (GritQL plugin support)

## How it works

Each rule is a `.grit` file using Biome's GritQL engine (`engine biome(1.0)`) to match AST patterns. The rules use structural heuristics rather than type information:

- **Component detection**: Functions returning JSX are treated as components (for the destructured props rule). Only parameter-level destructuring is flagged — body-level destructuring from hooks and contexts (`const { user } = useAuth()`) is allowed.
- **Scope detection**: `! $node <: within JsArrowFunctionExpression()` patterns distinguish module-level code from code inside functions.
- **No type inference**: These rules can't catch bugs that require knowing TypeScript types (e.g., uncalled signals, direct store mutation). For those, consider [eslint-plugin-solid](https://github.com/solidjs-community/eslint-plugin-solid).

## What these rules don't cover

Some SolidJS pitfalls require TypeScript type information that GritQL doesn't have access to:

- Signals referenced without `()` (needs to know what's a signal)
- Direct store mutation (needs to know what's a store proxy)
- Store prop destructuring from custom hooks (needs return type info)

For full type-aware linting, use these rules alongside `eslint-plugin-solid`.

## License

MIT

// Fixtures for solid-no-array-map-in-jsx rule
// Lines marked ❌ SHOULD trigger a diagnostic
// Lines marked ✅ should NOT trigger a diagnostic

import { For, Index, createSignal } from "solid-js";

const [items] = createSignal([{ id: 1, name: "a" }]);

// ❌ .map() in JSX — should use <For> or <Index>
const BadList = (props: { items: Array<{ name: string }> }) => {
	return (
		<ul>
			{props.items.map((item) => (
				<li>{item.name}</li>
			))}
		</ul>
	);
};

// ❌ .map() with signal in JSX
const BadSignalList = () => {
	return (
		<ul>
			{items().map((item) => (
				<li>{item.name}</li>
			))}
		</ul>
	);
};

// ✅ Using <For> — correct
const GoodForList = () => {
	return (
		<ul>
			<For each={items()}>
				{(item) => <li>{item.name}</li>}
			</For>
		</ul>
	);
};

// ✅ Using <Index> — correct
const GoodIndexList = () => {
	return (
		<ul>
			<Index each={items()}>
				{(item) => <li>{item()}</li>}
			</Index>
		</ul>
	);
};

// ✅ .map() outside JSX — fine
const mapped = items().map((item) => item.name);

// Fixtures for solid-no-memo-in-loop rule

import { createMemo, createSignal } from "solid-js";

const [items] = createSignal([1, 2, 3]);

// ❌ createMemo inside .map() callback
const bad1 = items().map((item) => {
	const derived = createMemo(() => item * 2);
	return derived();
});

// ❌ createMemo inside .forEach() callback
items().forEach((item) => {
	const memo = createMemo(() => item + 1);
});

// ✅ createMemo at component level — correct
const GoodComponent = () => {
	const doubled = createMemo(() => items().map((i) => i * 2));
	return <div>{doubled().join(", ")}</div>;
};

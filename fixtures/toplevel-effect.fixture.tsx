// Fixtures for solid-no-toplevel-effect rule

import { createEffect, createMemo, createSignal, createRoot } from "solid-js";

const [count, setCount] = createSignal(0);

// ❌ createEffect at module scope — no reactive owner, will leak
createEffect(() => console.log(count()));

// ❌ createMemo at module scope — no reactive owner
const doubled = createMemo(() => count() * 2);

// ✅ Inside a component — correct
const Counter = () => {
	createEffect(() => console.log(count()));
	const tripled = createMemo(() => count() * 3);
	return <div>{tripled()}</div>;
};

// ✅ Inside createRoot — correct
const store = createRoot((dispose) => {
	createEffect(() => console.log(count()));
	const quadrupled = createMemo(() => count() * 4);
	return { quadrupled, dispose };
});

// ✅ Inside a function declaration component — correct
function CreateProfilePage() {
	createEffect(() => {
		console.log("effect inside function declaration component");
	});
	return <div>Profile</div>;
}

// ✅ Inside an export default function component — correct
export default function DefaultExportPage() {
	createEffect(() => {
		console.log("effect inside default export component");
	});
	return <div>Default Export</div>;
}

// Fixtures for solid-no-destructured-props rule
// Lines marked ❌ SHOULD trigger a diagnostic
// Lines marked ✅ should NOT trigger a diagnostic

import { splitProps } from "solid-js";

// ❌ Destructured props in arrow function parameter
const BadComponent = ({ value, onChange }: { value: string; onChange: () => void }) => {
	return <div>{value}</div>;
};

// ❌ Destructured props in function declaration
function BadFunction({ name }: { name: string }) {
	return <span>{name}</span>;
}

// ✅ Props accessed correctly via props object
const GoodComponent = (props: { value: string }) => {
	return <div>{props.value}</div>;
};

// ✅ splitProps is the correct way to destructure
const GoodSplit = (props: { value: string; class: string }) => {
	const [local, rest] = splitProps(props, ["value", "class"]);
	return <div class={local.class}>{local.value}</div>;
};

// ✅ Regular (non-component) arrow functions with destructured params are fine
const processData = ({ id, name }: { id: number; name: string }) => {
	return `${id}: ${name}`;
};

// ✅ Regular function with destructured params
function formatUser({ firstName, lastName }: { firstName: string; lastName: string }) {
	return `${firstName} ${lastName}`;
}

// Fixtures for solid-no-stored-jsx rule

// ❌ JSX stored in module-scope variable — executes immediately, not a descriptor
const cached = <div>Hello</div>;

// ❌ JSX component stored in variable at module scope
const stored = <MyComponent prop="value" />;

// ✅ Inside a component return — correct usage
const GoodComponent = () => {
	return <div>Hello</div>;
};

// ✅ JSX in a ternary inside component — fine
const ConditionalComponent = (props: { show: boolean }) => {
	return props.show ? <div>Shown</div> : <span>Hidden</span>;
};

function MyComponent(props: { prop: string }) {
	return <span>{props.prop}</span>;
}

// ✅ JSX in Show fallback prop — idiomatic Solid control flow
const WithShow = () => {
	return (
		<Show
			when={true}
			fallback={<div class="spinner">Loading...</div>}
		>
			<div>Content</div>
		</Show>
	);
};

// ✅ JSX in Switch/Match fallback — idiomatic Solid control flow
const WithSwitch = () => {
	return (
		<Switch fallback={<div>Default</div>}>
			<Match when={true}>
				<div>Matched</div>
			</Match>
		</Switch>
	);
};

// ✅ JSX in ErrorBoundary fallback — idiomatic Solid
const WithError = () => {
	return (
		<ErrorBoundary fallback={<div>Error occurred</div>}>
			<div>Content</div>
		</ErrorBoundary>
	);
};

// ✅ JSX inside export default function component
export default function DefaultExportComponent() {
	return (
		<Show when={true} fallback={<div>Loading</div>}>
			<div>Content</div>
		</Show>
	);
}

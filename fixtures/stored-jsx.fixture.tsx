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

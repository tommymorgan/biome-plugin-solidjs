// Fixtures for solid-no-object-signal-without-equals rule
// Lines marked ❌ SHOULD trigger a diagnostic
// Lines marked ✅ should NOT trigger a diagnostic

import { createSignal } from "solid-js";

interface User {
	id: string;
	name: string;
}

interface Session {
	token: string;
	userId: string;
}

// ❌ Object type without custom equals — reference equality will cause spurious updates
const [user, setUser] = createSignal<User | null>(null);

// ❌ Named type without equals
const [session, setSession] = createSignal<Session>(getInitialSession());

// ✅ Custom equals prevents spurious updates
const [currentUser, setCurrentUser] = createSignal<User | null>(null, {
	equals: (prev, next) => prev?.id === next?.id,
});

// ✅ Primitive type — reference equality works correctly
const [count, setCount] = createSignal(0);
const [name, setName] = createSignal("");
const [active, setActive] = createSignal(false);
const [maybeCount, setMaybeCount] = createSignal<number | null>(null);

// ✅ Primitive type with explicit generic
const [label, setLabel] = createSignal<string>("hello");

// ✅ false as equals — intentional "always notify" pattern
const [data, setData] = createSignal<User | null>(null, { equals: false });

function getInitialSession(): Session {
	return { token: "", userId: "" };
}

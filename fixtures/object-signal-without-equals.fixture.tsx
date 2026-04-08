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

interface Item {
	id: number;
	name: string;
}

interface Message {
	text: string;
}

type Step = 1 | 2 | 3 | 4;

// ❌ Object type union with null — high risk for spurious updates
const [user, setUser] = createSignal<User | null>(null);

// ✅ Named object type without nullable union — lower risk, not flagged
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

// ✅ Array types — always replaced wholesale, custom equals not needed
const [items, setItems] = createSignal<Item[]>([]);
const [messages, setMessages] = createSignal<Message[]>([]);
const [ids, setIds] = createSignal<Array<number>>([]);

// ✅ Literal union type alias — primitive at runtime
const [step, setStep] = createSignal<Step>(1);

function getInitialSession(): Session {
	return { token: "", userId: "" };
}

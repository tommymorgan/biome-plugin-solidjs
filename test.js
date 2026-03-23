import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);

const lint = async (file) => {
	try {
		const { stdout, stderr } = await run(
			"npx",
			["@biomejs/biome", "lint", "--max-diagnostics=none", file],
			{ encoding: "utf8" },
		);
		return stdout + stderr;
	} catch (error) {
		// biome exits non-zero when diagnostics are found
		return (error.stdout || "") + (error.stderr || "");
	}
};

const countPluginHits = (output) => (output.match(/plugin/g) || []).length;

describe("solid-no-destructured-props", () => {
	it("flags destructured props in components returning JSX", async () => {
		const output = await lint("fixtures/destructured-props.fixture.tsx");
		assert.equal(countPluginHits(output), 2);
	});

	it("flags the arrow function component on line 8", async () => {
		const output = await lint("fixtures/destructured-props.fixture.tsx");
		assert.ok(output.includes(":8:"));
	});

	it("flags the function declaration component on line 13", async () => {
		const output = await lint("fixtures/destructured-props.fixture.tsx");
		assert.ok(output.includes(":13:"));
	});
});

describe("solid-no-array-map-in-jsx", () => {
	it("flags .map() calls inside JSX expressions", async () => {
		const output = await lint("fixtures/array-map-in-jsx.fixture.tsx");
		assert.equal(countPluginHits(output), 2);
	});
});

describe("solid-no-memo-in-loop", () => {
	it("flags createMemo inside array method callbacks", async () => {
		const output = await lint("fixtures/memo-in-loop.fixture.tsx");
		assert.equal(countPluginHits(output), 2);
	});
});

describe("solid-no-toplevel-effect", () => {
	it("flags createEffect and createMemo at module scope", async () => {
		const output = await lint("fixtures/toplevel-effect.fixture.tsx");
		assert.equal(countPluginHits(output), 2);
	});
});

describe("solid-no-stored-jsx", () => {
	it("flags JSX stored in module-scope variables", async () => {
		const output = await lint("fixtures/stored-jsx.fixture.tsx");
		assert.equal(countPluginHits(output), 2);
	});
});

// Fixtures for solid-no-destructured-props — .extend() false positive (issue #3)
// These should NOT trigger a diagnostic

import { test as base } from "vitest";

interface ComponentFixtures {
	Wrapper: (props: { children: any }) => any;
	renderWithProviders: (ui: any) => any;
}

// ✅ Vitest fixture callback — destructuring required by vitest, not SolidJS props
export const test = base.extend<ComponentFixtures>({
	renderWithProviders: async ({ Wrapper }, use) => {
		const render = (ui: any) => <Wrapper>{ui}</Wrapper>;
		await use(render);
	},
});

// ✅ Another extend pattern with destructuring
export const test2 = base.extend<ComponentFixtures>({
	Wrapper: async ({ }, use) => {
		await use((props: { children: any }) => <div>{props.children}</div>);
	},
});

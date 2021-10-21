export type HomeStateType = {
	a: number;
	b: number;
};

export const HomeModuleActions = {
	Dispatch_Login: 'Dispatch_Login' as const,
	Commit_Login: 'Commit_Login' as const,
};

type HomeModuleActionsType = typeof HomeModuleActions;

type HomeModuleActionsKeyType = keyof HomeModuleActionsType;

type HomeModuleDispatchesType = {
	[key in HomeModuleActionsKeyType]: `home/${HomeModuleActionsType[key]}`;
};

export const HomeModuleDispatches: HomeModuleDispatchesType =
	{} as HomeModuleDispatchesType;

for (const p in HomeModuleActions) {
	const v = HomeModuleActions[p as HomeModuleActionsKeyType];
	HomeModuleDispatches[p as HomeModuleActionsKeyType] =
		`home/${v}` as unknown as never;
}

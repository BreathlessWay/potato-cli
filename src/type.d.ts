interface OptionValues {
	doc: boolean;
	upgrade: boolean;
	init: string;
	addComponent: string;
	addRouter: string;
	addStore: string;
}

declare namespace NodeJS {
	interface ProcessEnv {
		TEMPLATE_DIR: string;
	}
}

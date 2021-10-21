import { parse } from '@babel/parser';
import { traverse } from '@babel/types';
import generator from '@babel/generator';
import * as t from '@babel/types';

export const parseStore = (
	fileContent: string,
	config: {
		StoreName: string;
		ModuleName: string;
	}
) => {
	const ModuleName = `${config.ModuleName}StateType`;

	const ast = parse(fileContent, {
		sourceType: 'module',
		plugins: ['typescript'],
	});
	traverse(ast, {
		enter(path) {
			if (
				path.type === 'TSInterfaceDeclaration' &&
				path.id.name === `RootState`
			) {
				path.body.body.push(
					t.tsPropertySignature(
						t.identifier(config.StoreName),
						t.tsTypeAnnotation(t.tsTypeReference(t.identifier(ModuleName)))
					)
				);
			}
		},
	});

	const output = generator(
		ast,
		{
			/* options */
		},
		fileContent
	);

	return `import { ${ModuleName} } from '@/store/${config.StoreName}/types';\n${output.code}`;
};

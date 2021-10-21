import { parse } from '@babel/parser';
import {
	ArrayExpression,
	Identifier,
	traverse,
	ObjectExpression,
	ObjectProperty,
} from '@babel/types';
import template from '@babel/template';
import generator from '@babel/generator';
import * as t from '@babel/types';

export const parseRoute = (
	fileContent: string,
	config: {
		RouterPath: string;
		RouterName: string;
		PageName: string;
		EnumPageName: string;
		PagePath: string;
		RouterType: string;
	}
) => {
	const ast = parse(fileContent, {
		sourceType: 'module',
		plugins: ['typescript'],
	});
	traverse(ast, {
		enter(path) {
			if (
				path.type === 'TSEnumDeclaration' &&
				path.id.name === `${config.RouterName}RoutesName`
			) {
				path.members.push(
					t.tsEnumMember(
						t.identifier(config.EnumPageName),
						t.stringLiteral(config.EnumPageName)
					)
				);
			}
			if (
				path.type === 'VariableDeclarator' &&
				(path.id as Identifier).name === `${config.RouterName}Routes`
			) {
				const properties = (
					(path?.init as ArrayExpression)?.elements?.[0] as ObjectExpression
				)?.properties;

				let childrenNode: ObjectProperty | null = null;
				properties?.forEach(item => {
					if (
						((item as ObjectProperty).key as Identifier).name === 'children'
					) {
						childrenNode = item as ObjectProperty;
					}
				});

				const ast = template.expression(
					`
				      {
							    path: '${config.RouterPath}',
							    name: ${config.RouterName}RoutesName.${config.EnumPageName},
							    meta: {
							        requireAuth: false,
							        title: '${config.PageName}'
							    },
							    component: () => import(/* webpackChunkName: "${config.PageName}" */ '../pages/${config.PagePath}')
							}
				`,
					{ preserveComments: true }
				)();

				(
					(childrenNode as unknown as ObjectProperty)?.value as ArrayExpression
				)?.elements.push(ast);
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

	return output.code;
};

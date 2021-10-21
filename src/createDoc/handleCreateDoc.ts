import { readFileSync } from 'fs';
import { resolve } from 'path';
import { createServer } from 'http';

import md from 'markdown-it';
import hljs from 'highlight.js';

import { successLog } from '@/log';
import { logErrorAndExit } from '@/utils';

export const handleCreateDoc = async () => {
	const doc = readFileSync(resolve(__dirname, '../../README.md'), 'utf-8'),
		markdown: ReturnType<typeof md> = md({
			html: true, // 在源码中启用 HTML 标签
			breaks: true, // 转换段落里的 '\n' 到 <br>。
			highlight(str, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return (
							'<pre class="hljs"><code>' +
							hljs.highlight(lang, str, true).value +
							'</code></pre>'
						);
					} catch (e) {
						logErrorAndExit(e as string);
					}
				}

				return (
					'<pre class="hljs"><code>' +
					markdown.utils.escapeHtml(str) +
					'</code></pre>'
				);
			},
		}),
		content = markdown.render(doc);
	const server = createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		res.end(`
		<!DOCTYPE html>
		<html lang="en">
			<head>
			  <meta charset="utf-8"/>
			  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			  <meta
			    name="viewport"
			    content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, shrink-to-fit=no, user-scalable=0, viewport-fit=cover"
			  />
			  <style>
			  	.wrap{margin:0;padding:50px;}a{text-decoration:none;color:#1989fa;}pre.hljs code{display:block;overflow-x:auto;padding:1em;background:#2b2b2b;}code{padding:3px 5px;background:#eee;}.hljs{background:#2b2b2b;color:#f8f8f2}.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ffa07a}.hljs-built_in,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#f5ab35}.hljs-attribute{color:gold}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#abe338}.hljs-section,.hljs-title{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}@media screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}
				</style>
			</head>
			<body class="wrap">
				${content}
			</body>
		</html>
`);
	});
	server.listen(8000, () => {
		successLog(`文档地址：http://127.0.0.1:8000`);
	});
};

import {describe, expect, it} from 'vitest';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

import remarkFigureCaption from "../src/remarkFigureCaption.js";
import {visit} from "unist-util-visit";

describe('remarkFigureCaption', () => {
    it('코드 블럭과 인용문이 같이 있을 경우 피규어로 감싼다.', async () => {
        const markdown = `
\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
`;

        const processor = unified()
            .use(remarkParse)
            .use(remarkFigureCaption)

        const ast = processor.parse(markdown);
        const transformedAst = await processor.run(ast);

        let figureNodeFound = false;

        visit(transformedAst, 'figure', (node, index, parent) => {
            figureNodeFound = true;

            expect(node.children).toHaveLength(2);
            expect(['image', 'code']).toContain(node.children[0].type);
            expect(node.children[1].type).toBe('figureCaption');

            if (parent.children[index + 1]) {
                expect(parent.children[index + 1].type).not.toBe('blockquote');
            }
        });

        expect(figureNodeFound).toBe(true);
    });
});

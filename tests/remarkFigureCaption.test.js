import {describe, expect, it} from 'vitest';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

import remarkFigureCaption from "../src/remarkFigureCaption.js";
import {visit} from "unist-util-visit";

describe('remarkFigureCaption', () => {
    it('visit cjs 테스트', () => {
        require('unist-util-visit');
    })

    it('이미지와 하단에 인용문이 있을 경우, figure 노드로 변환하고 figcaption 자식 노드를 포함해야 한다.', async () => {
        const markdown = `
![Image alt text](image.jpg)
> This is the caption for the image.
`;

        const processor = unified()
            .use(remarkParse)
            .use(remarkFigureCaption)

        const ast = processor.parse(markdown);
        const transformedAst = await processor.run(ast);

        visit(transformedAst, 'figure', (node, index, parent) => {
            expect(node.children).toHaveLength(2);
            expect(node.children[0].type).toBe('image');
            expect(node.children[1].type).toBe('figureCaption');

            if (parent.children[index + 1]) {
                expect(parent.children[index + 1].type).not.toBe('blockquote');
            }
        });
    });

    it('두 가지 케이스가 다 있을 경우', async () => {
        const markdown = `
![Image alt text](image.jpg)

> This is the caption for the image.

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

        visit(transformedAst, 'figure', (node, index, parent) => {
            expect(node.children).toHaveLength(2);
            expect(['image', 'code']).toContain(node.children[0].type);
            expect(node.children[1].type).toBe('figureCaption');

            if (parent.children[index + 1]) {
                expect(parent.children[index + 1].type).not.toBe('blockquote');
            }
        });
    });
});

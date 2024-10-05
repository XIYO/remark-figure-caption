import {describe, expect, it} from 'vitest';
import {unified} from 'unified';
import remarkParse from 'remark-parse';

import remarkFigureCaption from "../src/remarkFigureCaption.js";
import {visit} from "unist-util-visit";

describe('remarkFigureCaption', () => {
    it('앵커가 이미지를 포함하고 하단에 인용문이 있을 경우, figure 노드로 변환하고 figcaption 자식 노드를 포함해야 한다.', async () => {
        const markdown = `
[![Image alt text](image.jpg)](https://example.com)
> This is the caption for the image.
`;

        const processor = unified()
            .use(remarkParse)
            .use(remarkFigureCaption);

        const ast = processor.parse(markdown);
        const transformedAst = await processor.run(ast);

        let figureNodeFound = false;

        visit(transformedAst, 'figure', (node, index, parent) => {
            figureNodeFound = true;
            expect(node.children).toHaveLength(2);
            expect(node.children[0].type).toBe('link');
            expect(node.children[1].type).toBe('figureCaption');

            if (parent.children[index + 1]) {
                expect(parent.children[index + 1].type).not.toBe('blockquote');
            }
        });

        expect(figureNodeFound).toBe(true);
    });
});

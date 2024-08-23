import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkFigureCaption from "../src/remarkFigureCaption.js";

const markdownWithImageAndCaption = `
![alt text](image.jpg)\n

\n

> This is a caption.

hello i am green frog
`;

const markdownWithCodeAndCaption = `
\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
`;

const markdownWithCodeAndTitleAndCaption = `
\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
`;

describe('remarkFigureCaption', () => {
    it('just unified test', async () => {
        const input = `This is a paragraph.`;
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(input);

        expect(String(output)).toBe(`<p>This is a paragraph.</p>`);
    });

    it('img 피규어 캡션 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(markdownWithImageAndCaption);

        console.log(String(output));

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');
        const cleanedToBe = `<figure><img src="image.jpg" alt="alt text"><figcaption><blockquote>
<p>This is a caption.</p>
</blockquote></figcaption></figure>`
            .replace(/\n/g, '');

        expect(cleanedOutput).toBe(cleanedToBe);
    });

    it('code 피규어 캡션 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(markdownWithCodeAndCaption);

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');

        expect(cleanedOutput).toBe(
            `<figure><pre><code class="language-js">console.log('Hello World');</code></pre><figcaption><p>This is a code caption.</p></figcaption></figure>`
        );
    });
    
    it('code 피규어 타이틀 캡션 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(markdownWithCodeAndTitleAndCaption);

        console.log(String(output));
    });

});

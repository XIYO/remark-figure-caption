import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeFigureCaption from '../src/rehypeFigureCaption.js';

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

describe('rehypeFigureCaption', () => {
    it('just unified test', async () => {
        const input = `This is a paragraph.`;
        const output = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeFigureCaption)
            .use(rehypeStringify)
            .process(input);

        expect(String(output)).toBe(`<p>This is a paragraph.</p>`);
    });

    it('img 피규어 캡션 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeFigureCaption)
            .use(rehypeStringify)
            .process(markdownWithImageAndCaption);


        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');

        expect(cleanedOutput).toBe(
            `<figure><img src="image.jpg" alt="alt text"><figcaption><p>This is a caption.</p></figcaption></figure><p>hello i am green frog</p>`
        );
    });

    it('code 피규어 캡션 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeFigureCaption)
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
            .use(remarkRehype)
            .use(rehypeFigureCaption)
            .use(rehypeStringify)
            .process(markdownWithCodeAndTitleAndCaption);

        console.log(String(output));
    });

});

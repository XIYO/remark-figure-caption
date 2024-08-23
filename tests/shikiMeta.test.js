import { describe, it, expect } from 'vitest';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeShiki from '@shikijs/rehype';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeFigureCaption from '../src/rehypeFigureCaption.js';
import remarkFigureCaption from "../src/remarkFigureCaption.js";

// 사용자 정의 메타 문자열 값을 처리하는 함수
const metaValues = [
    {
        name: 'data-title',
        regex: /data-title="(?<value>[^"]*)"/,
    },
];

const parseMetaString = (meta) => {
    const map = {};

    for (const value of metaValues) {
        const result = value.regex.exec(meta);

        if (result) {
            map[`${value.name}`] = result.groups.value;
        }
    }

    return map;
};

const shikiOptions = {
    theme: 'dracula',
    parseMetaString
}

const markdownWithCodeAndCaption = `
\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
`;

const markdownWithCodeAndTitleAndCaption = `
\`\`\`js data-title="Hello World"
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
            .use(rehypeShiki, shikiOptions)
            .use(rehypeStringify)
            .process(input);

        expect(String(output)).toBe(`<p>This is a paragraph.</p>`);
    });

    it('shiki test', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeFigureCaption)
            .use(rehypeShiki, shikiOptions)
            .use(rehypeStringify)
            .process(markdownWithCodeAndCaption);

        console.log(String(output));

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');
        const cleanedToBe = `<figure><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code><span class="line"><span style="color:#F8F8F2">console.</span><span style="color:#50FA7B">log</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">Hello World</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">);</span></span></code></pre><figcaption>
<p>This is a code caption.</p>
</figcaption></figure>`.replace(/\n/g, '');

        expect(cleanedOutput).toBe(cleanedToBe);
    });

    it('shiki test2', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeShiki, shikiOptions)
            .use(rehypeStringify)
            .process(markdownWithCodeAndCaption);

        console.log(String(output));

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');
        const cleanedToBe = `<figure><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code><span class="line"><span style="color:#F8F8F2">console.</span><span style="color:#50FA7B">log</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">Hello World</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">);</span></span></code></pre><figcaption>
<p>This is a code caption.</p>
</figcaption></figure>`.replace(/\n/g, '');

        expect(cleanedOutput).toBe(cleanedToBe);
    });

    it('shiki meta 테스트', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypeFigureCaption)
            .use(rehypeShiki, shikiOptions)
            .use(rehypeStringify)
            .process(markdownWithCodeAndTitleAndCaption);

        console.log(String(output));

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');
        const cleanedToBe = `<figure><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0" data-title="Hello World"><code><span class="line"><span style="color:#F8F8F2">console.</span><span style="color:#50FA7B">log</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">Hello World</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">);</span></span></code></pre><figcaption>
<p>This is a code caption.</p>
</figcaption></figure>`
            .replace(/\n/g, '');

        expect(cleanedOutput).toBe(cleanedToBe);
    });

    it('shiki meta 테스트2', async () => {
        const output = await unified()
            .use(remarkParse)
            .use(remarkFigureCaption)
            .use(remarkRehype)
            .use(rehypeShiki, shikiOptions)
            .use(rehypeStringify)
            .process(markdownWithCodeAndTitleAndCaption);

        console.log(String(output));

        // 결과에서 모든 줄바꿈 문자를 제거
        const cleanedOutput = String(output).replace(/\n/g, '');
        const cleanedToBe = `<figure><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0" data-title="Hello World"><code><span class="line"><span style="color:#F8F8F2">console.</span><span style="color:#50FA7B">log</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">Hello World</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">);</span></span></code></pre><figcaption>
<p>This is a code caption.</p>
</figcaption></figure>`
            .replace(/\n/g, '');

        expect(cleanedOutput).toBe(cleanedToBe);
    });
});

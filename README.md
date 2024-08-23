# remark-figure-caption

A remark plugin to transform images or code blocks followed by blockquotes into figures with captions.

## Installation

```bash
npm install remark-figure-caption
```

## Usage

This plugin can be used with the [unified](https://github.com/unifiedjs/unified) ecosystem, specifically with [remark](https://github.com/remarkjs/remark) for Markdown processing.

```javascript
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFigureCaption from 'remark-figure-caption'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const processor = unified()
  .use(remarkParse)
  .use(remarkFigureCaption)
  .use(remarkRehype)
  .use(rehypeStringify)

const markdown = `
![Image alt text](image.jpg)

> This is the caption for the image.

\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
`

processor.process(markdown).then((file) => {
  console.log(String(file))
})
```

## How it works

This plugin transforms:

1. An image immediately followed by a blockquote
2. A code block immediately followed by a blockquote

Into a `<figure>` element containing the image or code block, with the blockquote content as a `<figcaption>`.

### Example Input

```markdown
![Image alt text](image.jpg)

> This is the caption for the image.

\`\`\`js
console.log('Hello World');
\`\`\`

> This is a code caption.
```

### Example Output (HTML)

```html
<figure>
  <img src="image.jpg" alt="Image alt text">
  <figcaption>This is the caption for the image.</figcaption>
</figure>

<figure>
  <pre><code class="language-js">console.log('Hello World');</code></pre>
  <figcaption>This is a code caption.</figcaption>
</figure>
```

## License

MIT

## Contributing

Contributions, issues, and feature requests are welcome!

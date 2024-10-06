[한국어](/README.ko-KR.md)

# remark-figure-caption: Add Captions to Markdown Images and Code Blocks

**remark-figure-caption** is a plugin for [Remark](https://github.com/remarkjs/remark) that helps add captions to images and code blocks. By writing a blockquote under an image or code block, it converts the blockquote into a `<figcaption>` element as a caption.

## Key Features
- **Images**: Converts blockquotes under images into captions.
- **Code Blocks**: Converts blockquotes under code blocks into captions.
- **Linked Images**: Converts blockquotes under images wrapped in links into captions.

## Installation and Usage

### Installation
```bash
npm install remark-figure-caption@latest
```

To install a specific version:
```bash
npm install remark-figure-caption@1.0.6
```

### Usage
```javascript
import { unified } from 'unified'
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
`

processor.process(markdown).then((file) => {
  console.log(String(file)) // <figure><img src="image.jpg"...</figure>
})
```

## Examples

### Image with Caption

**Example Usage**:

![Image and Caption](/resource/image.png)

**Markdown Input**:
```markdown
![cat](/image.jpg)

> The cat is running around.
```

**Output HTML**:
```html
<figure>
  <img src="/image.jpg" alt="cat">
  <figcaption>The cat is running around.</figcaption>
</figure>
```

### Code Block with Caption

**Example Usage**:

![Code and Caption](/resource/code.png)

**Markdown Input**:
````markdown
```javascript
let a = 1;
console.log(a);
```

> Outputs the log.
````

**Output HTML**:
```html
<figure>
  <pre><code class="language-javascript">let a = 1;
console.log(a);
</code></pre>
  <figcaption>Outputs the log.</figcaption>
</figure>
```

### Linked Image with Caption

**Example Usage**:

![Link with Image and Caption](/resource/link.png)

**Markdown Input**:
```markdown
[![cat](/image.jpg)](https://myHome.com/link)

> The cat is sleeping.
```

**Output HTML**:
```html
<figure>
  <a href="https://myHome.com/link">
    <img src="/image.jpg" alt="cat">
  </a>
  <figcaption>The cat is sleeping.</figcaption>
</figure>
```

## License
MIT

## Contributing
Contributions, issue submissions, and feature requests are all welcome!
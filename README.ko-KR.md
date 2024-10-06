
[english](/README.md) "한국어"
# remark-figure-caption: 마크다운 이미지 및 코드 블럭에 캡션 추가하기

**remark-figure-caption**은 [Remark](https://github.com/remarkjs/remark)의 플러그인으로, 이미지와 코드 블럭에 캡션을 추가할 수 있도록 도와줍니다. 이미지나 코드 블럭 아래에 인용문을 작성하면 `<figcaption>` 요소로 변환하여 캡션으로 만들어줍니다.

## 주요 기능
- **이미지**: 이미지 아래의 인용문을 캡션으로 변환
- **코드 블럭**: 코드 블럭 아래의 인용문을 캡션으로 변환
- **링크가 있는 이미지**: 링크가 이미지를 감싸고 있을 때, 링크 아래의 인용문을 캡션으로 변환

## 설치 및 사용 방법

### 설치
```bash
npm install remark-figure-caption@latest
```

특정 버전을 설치하려면:
```bash
npm install remark-figure-caption@1.0.6
```

### 사용법
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

## 예제

### 이미지와 설명
**마크다운 입력**:
```markdown
![cat](/image.jpg)

> 고양이가 뛰어 다닙니다.
```

**출력 HTML**:
```html
<figure>
  <img src="/image.jpg" alt="cat">
  <figcaption>고양이가 뛰어 다닙니다.</figcaption>
</figure>
```

### 코드 블럭과 설명
**마크다운 입력**:
````markdown
```javascript
let a = 1;
console.log(a);
```

> 로그를 출력합니다.
````

**출력 HTML**:
```html
<figure>
  <pre><code class="language-javascript">let a = 1;
console.log(a);
</code></pre>
  <figcaption>로그를 출력합니다.</figcaption>
</figure>
```

### 링크로 감싸진 이미지와 설명
**마크다운 입력**:
```markdown
[![cat](/image.jpg)](https://myHome.com/link)

> 고양이가 자고있습니다.
```

**출력 HTML**:
```html
<figure>
  <a href="https://myHome.com/link">
    <img src="/image.jpg" alt="cat">
  </a>
  <figcaption>고양이가 자고있습니다.</figcaption>
</figure>
```

## 라이선스
MIT

## 기여
기여, 이슈 제기, 기능 요청 모두 환영합니다!


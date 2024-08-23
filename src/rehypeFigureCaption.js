import {visit} from 'unist-util-visit';

export default function rehypeFigureCaption() {
    return function transformer(tree) {
        visit(tree, (node, index, parent) => {
            if (
                !(
                    (
                        (node.tagName === 'p' && node.children.length === 1 && node.children[0].tagName === 'img') ||
                        (node.tagName === 'pre' && node.children.length === 1 && node.children[0].tagName === 'code')
                    ) &&
                    parent.children[index + 2] && parent.children[index + 2].tagName === 'blockquote'
                )
            ) return;

            const mainNode = node.tagName === 'pre' ? node : node.children[0];
            const captionNode = parent.children[index + 2];  // blockquote 노드

            // figure 노드 생성
            const figureNode = {
                type: 'element', tagName: 'figure', children: [mainNode]
            };

            // figcaption 노드 생성 및 blockquote의 자식으로 설정
            const figcaptionNode = {
                type: 'element', tagName: 'figcaption', children: captionNode.children
            };

            // figure 노드에 figcaption 추가
            figureNode.children.push(figcaptionNode);

            // 기존의 p와 blockquote 노드를 figure 노드로 대체
            parent.children.splice(index, 3, figureNode);
        })

    };
}

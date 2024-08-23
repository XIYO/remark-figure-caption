import {visit} from 'unist-util-visit';

export default function remarkFigureCaption() {
    return function transformer(tree) {
        visit(tree, (node, index, parent) => {
            if (
                !(
                    (
                        (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'image') ||
                        (node.type === 'code')
                    ) &&
                    parent.children[index + 1] && parent.children[index + 1].type === 'blockquote'
                )
            ) return;

            const mainNode = node.type === 'code' ? node : node.children[0];
            const captionNode = parent.children[index + 1];  // blockquote 노드

            const figureNode = {
                type: 'figure',
                children: [mainNode],
                data: {
                    hName: 'figure',
                },
            };
            const figcaptionNode = {
                type: 'figureCaption',
                children: [...captionNode.children],
                data: {
                    hName: 'figcaption',
                },
            };

            figureNode.children.push(figcaptionNode);

            parent.children.splice(index, 2, figureNode);
        });
    };
}

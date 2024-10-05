import {visit} from 'unist-util-visit';

export default function remarkFigureCaption() {
    return function transformer(tree) {
        visit(tree, (node, index, parent) => {
            if (
                !(
                    (
                        (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'image') ||
                        (node.type === 'paragraph' && node.children.length === 1 && node.children[0].type === 'link' && node.children[0].children.length === 1 && node.children[0].children[0].type === 'image') ||
                        (node.type === 'code')
                    ) &&
                    parent.children[index + 1] && parent.children[index + 1].type === 'blockquote'
                )
            ) return;

            // 조건문에서 필수 노드가 있을 경우에만 진행되도록 분기를 하기 때문에 디폴트 케이스가 불필요
            let mainNode;
            switch (node.type) {
                case 'code':
                    mainNode = node;
                    break;
                case 'paragraph':
                    switch (node.children[0].type) {
                        case 'image':
                            mainNode = node.children[0];
                            break;
                        case 'link':
                            mainNode = node.children[0];
                            break;
                    }
            }

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

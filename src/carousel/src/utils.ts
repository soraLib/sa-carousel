import { Fragment, VNodeChild, createTextVNode, VNode, Comment } from 'vue';

// o(n) flatten
export function flatten(
  vNodes: VNodeChild[],
  filterCommentNode: boolean = true,
  result: VNode[] = []
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) return;
    if (typeof vNode !== 'object') {
      if (typeof vNode === 'string' || typeof vNode === 'number') {
        result.push(createTextVNode(String(vNode)));
      }

      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);

      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return;
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
      // rawSlot
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });

  return result;
}

// slot    [ 0 1 2 ]
// display 2 0 1 2 0
// index   0 1 2 3 4
export function getDisplayIndex(
  current: number,
  length: number,
  duplicatedable?: boolean
): number {
  return !duplicatedable
    ? current
    : current === 0
      ? length - 3
      : current === length - 1
        ? 0
        : current - 1;
}
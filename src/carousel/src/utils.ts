import { Fragment, VNodeChild, createTextVNode, VNode, Comment } from 'vue';

// o(n) flatten
export function flatten(
  vNodes: VNodeChild[],
  filterCommentNode: boolean = true,
  result: VNode[] = []
): VNode[] {
  vNodes.forEach(vNode => {
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
  duplicatedable = true
): number {
  return !duplicatedable
    ? current
    : current === 0
      ? length - 3
      : current === length - 1
        ? 0
        : current - 1;
}

export function getPrevIndex(
  current: number,
  length: number,
  duplicatedable = true
): number | null {
  if (current < 0) return null;

  return current === 0 ? (duplicatedable ? length - 1 : null) : current - 1;
}

export function getNextIndex(
  current: number,
  length: number,
  duplicatedable = true
): number | null {
  if (current > length - 1) return null;

  return current === length - 1 ? (duplicatedable ? 0 : null) : current + 1;
}

export function getRealIndex(
  current: number,
  duplicatedable = true
): number {
  return !duplicatedable ? current : current + 1;
}

export function clampValue(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

export interface Size {
  width: number
  height: number
}

export function calculateSize(
  element: HTMLElement,
  innerOnly?: boolean
): Size {
  let width = element.clientWidth;
  let height = element.clientHeight;
  if (innerOnly) {
    const style = getComputedStyle(element);
    width =
      width -
      parseFloat(style.getPropertyValue('padding-left')) -
      parseFloat(style.getPropertyValue('padding-right'));
    height =
      height -
      parseFloat(style.getPropertyValue('padding-top')) -
      parseFloat(style.getPropertyValue('padding-bottom'));

    return { width, height };
  }

  return { width, height };
}

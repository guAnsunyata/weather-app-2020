import { CreateElement, VNode } from 'vue'

export function getSingleNode(
  h: CreateElement,
  nodes: VNode[] | VNode,
  wrapperTag = 'div'
): VNode {
  if (!Array.isArray(nodes)) return nodes
  return h(wrapperTag, {}, nodes)
}

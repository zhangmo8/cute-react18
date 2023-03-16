import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { createWorkInProgress, FiberNode, FiberRootNode } from "./fiber";
import { HostRoot } from "./workTags";

// the current fiber node that is working
let workInProgress: FiberNode | null = null;

// initialize the first fiber node or the root fiber node
// HostRoot
function prepareFreshStack(root: FiberRootNode) {
  workInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
  // rootFiber hostFiberNode
  const root = markUpdateFromFiberToRoot(fiber);
  // normal Fiber FiberNode
}

export function markUpdateFromFiberToRoot(fiber: FiberNode) {
  let node = fiber;
  let parent = fiber.return;

  while (parent) {
    node = parent;
    parent = node.return;
  }

  if (node.tag === HostRoot) {
    return node.stateNode
  }

  return null;
}

// renderer the root fiber node beginning
function renderRoot(root: FiberRootNode) {
  // init
  prepareFreshStack(root);

  // 递归开始
  do {
    try {
      workLoop();
      break;
    } catch (error) {
      console.log(`递归过程发生的错误:${error}`);
      workInProgress = null;
    }
  } while (true);
}

// 循环工作
function workLoop() {
  while (workInProgress != null) {
    // begin work, params is now fiber node
    performUnitOfWork(workInProgress)
  }
}

// 递归的递
// begin work
function performUnitOfWork(fiber: FiberNode) {
  // get the beginning fiber node
  const next = beginWork(fiber);
  // save the props from the init props
  fiber.memoizedProps = fiber.pendingProps;

  // if the fiber node is a null
  if (next === null) {
    // then we can complete the work
    completeUnitOfWork(fiber);
  } else {
    // because of the DFS(Deep First Search / 深度优先查询 或者深度优先遍历)
    // then we begin the work for the next fiber node
    workInProgress = next;
  }
}

// 递归的归
// complete work
function completeUnitOfWork(fiber: FiberNode) {
  // get a fiber node or finish the work, so the node maybe is null
  let node: FiberNode | null = fiber;

  // because of the DFS(Deep First Search / 深度优先查询 或者深度优先遍历)
  // so 需要循环
  do {
    // finishing the fiber node work
    completeWork(node);
    // get the sibling fiber node
    const sibling = node.sibling;

    // if has sibling
    if (sibling !== null) {
      // then set sibling fiber node to the workInProgress. and begin the next work
      // 将兄弟节点赋值给当前工作节点，并且开始下一轮的fiber工作
      workInProgress = sibling;
      return;
    }

    // if no sibling. then we should be the parent fiber node, find the parent's sibling fiber node. then begin the next work
    // 如果没有兄弟节点，我们则找到父级节点，并尝试开始查找父节点的下一个兄弟节点，这属于归的流程
    node = node.return;
    workInProgress = node;
  } while (node != null);
}
import { beginWork } from "./beginWork";
import { completeWork } from "./completeWork";
import { FiberNode } from "./fiber";

let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
  prepareFreshStack(root);

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

function workLoop() {
  while (workInProgress != null) {
    performUnitOfWork(workInProgress)
  }
}

function performUnitOfWork(fiber: FiberNode) {
  const next = beginWork(fiber);
  fiber.memoizedProps = fiber.pendingProps;

  if (next === null) {
    completeUnitOfWork(fiber);
  } else {
    workInProgress = next;
  }
}

function completeUnitOfWork(fiber: FiberNode) {
  let fiberNode: FiberNode | null = fiber;

  do {
    completeWork(fiberNode);
    const sibling = fiberNode.sibling;

    if (sibling !== null) {
      workInProgress = sibling;
      return;
    }

    fiberNode = fiberNode.return;
    workInProgress = fiberNode;
  } while (fiberNode != null);
}
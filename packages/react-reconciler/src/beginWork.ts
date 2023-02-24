import { FiberNode } from "./fiber";
import { HostComponent } from "./workTags";

// 递归的递阶段
export const beginWork = (): FiberNode => {
  return new FiberNode(HostComponent, {}, {});
}
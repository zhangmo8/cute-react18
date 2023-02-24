import { Key, Props, Ref } from "shared/ReactTypes";
import { Flags, NoFlags } from "./fiberFlags";
import { WorkTag } from "./workTags";

// 双缓存技术
// Fiber Node Work Principle
// First generate a fiber tree for first rendering
// and then the state change will generate some directives
// copy current fiber tree and execution these directives
// then generate a new workProgression fiber tree
// finally workProgression fiber tree will replace the current tree
export class FiberNode {
  tag: WorkTag;
  pendingProps: Props;
  key: Key;
  ref: Ref;
  memoizedProps: Props | null;

  stateNode: any;
  type: any;

  return: FiberNode | null;
  sibling: FiberNode | null;
  child: FiberNode | null;
  index: number;

  // the other fiberTree's 引用
  alternate: FiberNode | null;
  flags: Flags;

  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    // component's properties
    this.tag = tag;
    this.key = key;
    this.ref = null;
    // beginning props
    this.pendingProps = pendingProps
    // after rendering the memoizedProps is really props
    // as a work node(emmm maybe it's use by use memo, but now I don't know)
    this.memoizedProps = null;

    // the component state
    this.stateNode = null;
    // FunctionComponent () => {} the component itself
    this.type = null

    // this.component's parent fiber node
    this.return = null;
    // this.component's siblings fiber node
    this.sibling = null;
    // this.child fiber node
    this.child = null;
    // this.component's index for parent fiber node's children
    this.index = 0;

    // this properties mean the other fiberNode's this
    // if now it's current then this is the workflow fiberNode
    this.alternate = null;

    // this properties mean some action flag
    this.flags = NoFlags
  }
}
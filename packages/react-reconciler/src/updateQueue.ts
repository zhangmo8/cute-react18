import { Action } from "shared/ReactTypes";

// Tips: State is the T

// defined a interface for the update, and action
export interface Update<State> {
  action: Action<State>
}

// defined a interface for the update queue
export interface UpdateQueue<State> {
  shared: {
    pending: Update<State> | null;
  }
}

// it's mean create a new update schedule
export const createUpdate = <State>(action: Action<State>): Update<State> => {
  return {
    action
  }
}

// create a update schedule queue
export const createUpdateQueue = <Action>() => {
  return {
    shared: {
      pending: null
    }
  } as UpdateQueue<Action>;
}

// append a new update schedule to the update queue
export const enqueueUpdate = <Action>(
  updateQueue: UpdateQueue<Action>,
  update: Update<Action>
) => {
  updateQueue.shared.pending = update;
}

// process the update queue. it's mean execution update from the update schedule queue
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState
  }

  if (pendingUpdate !== null) {
    // if the update has some other action then we need some other shixian
    // 由于更新会有两种调用格式
    // the update state type
    // this.setState({})
    // this.setState(({}) => { return state })
    // 则需要判断是否是函数执行，来进行不同的消费机制
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }

  return result
}

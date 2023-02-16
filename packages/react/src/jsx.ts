import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
  Type,
  Key,
  Props,
  Ref,
  ReactElementType,
  ElementType
} from 'shared/ReactTypes';

const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props
): ReactElementType {
  const reactElement: ReactElementType = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __myMark: 'wegi8'
  };

  return reactElement;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  let ref: Ref = null;

  const props: Props = {};

  for (const prop in config) {
    const value = config[prop];
    if (prop === 'key') {
      if (value != undefined) {
        key = '' + value;
      }
      continue;
    }
    if (prop === 'ref') {
      if (value != undefined) {
        ref = value;
      }
      continue;
    }

    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = value;
    }

    const maybeChildrenLength = maybeChildren.length;
    if (maybeChildrenLength) {
      if (maybeChildrenLength === 1) {
        props.children = maybeChildrenLength[0];
      } else {
        props.children = maybeChildrenLength;
      }
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDev = jsx;

// 判定目前宿主环境是否支持Symbol
const supportsSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportsSymbol
  ? Symbol.for('react.element')
  : 0xeac7;

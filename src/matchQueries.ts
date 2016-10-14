import map = require('lodash/map');
import toPairs = require('lodash/toPairs');

export interface Rules {
  [key: string]: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
}

/**
 * [matchQueries description]
 */
export default function matchQueries(rules: Rules) {
  const entries = map(toPairs(rules), ([className, rule]) => ({
    minWidth: rule.minWidth != null ? rule.minWidth : 0,
    maxWidth: rule.maxWidth != null ? rule.maxWidth : Infinity,
    minHeight: rule.minHeight != null ? rule.minHeight : 0,
    maxHeight: rule.maxHeight != null ? rule.maxHeight : Infinity,
    className: className
  }));

  return function ({height, width}: {height: number, width: number}) {
    const classNameMap: {[key: string]: boolean} = {};

    for (const {className, minWidth, maxWidth, minHeight, maxHeight} of entries) {
      classNameMap[className] = (
        minWidth <= width &&
        width <= maxWidth &&
        minHeight <= height &&
        height <= maxHeight
      );
    }

    return classNameMap;
  };
}

export interface Rules {
  [key: string]: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
}

interface Entry {
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number,
  className: string,
}

export default function matchQueries(rules: Rules) {
  const entries: Array<Entry> = [];

  for (const className of Object.keys(rules)) {
    const rule = rules[className];
    entries.push({
      minWidth: rule.minWidth != null ? rule.minWidth : 0,
      maxWidth: rule.maxWidth != null ? rule.maxWidth : Infinity,
      minHeight: rule.minHeight != null ? rule.minHeight : 0,
      maxHeight: rule.maxHeight != null ? rule.maxHeight : Infinity,
      className,
    });
  }

  return function ({height, width}: {height?: number, width?: number}) {
    const classNameMap: {[key: string]: boolean} = {};

    for (const {className, minWidth, maxWidth, minHeight, maxHeight} of entries) {
      if (height != null && width != null) {
        classNameMap[className] = (
          minWidth <= width && width <= maxWidth &&
          minHeight <= height && height <= maxHeight
        );
      } else if (height == null && width != null) {
        classNameMap[className] = minWidth <= width && width <= maxWidth;
      } else if (height != null && width == null) {
        classNameMap[className] = minHeight <= height && height <= maxHeight;
      } else {
        classNameMap[className] = true;
      }
    }

    return classNameMap;
  };
}

export const getUrlSegment = (values: Record<string, string>) => {
  const attrs = Object.keys(values);
  return attrs.map((attr) => `${attr}=${encodeURIComponent(values[attr])}`).sort();
}

export const getTargetingValues = (path: string[]) => {
  return path.sort().reduce((acc, segment) => {
    const [ key, value] = segment.split('=');
    if (key) {
      return {
        ...acc,
        [key]: decodeURIComponent(value),
      }
    }
    return acc;
  }, {})
}
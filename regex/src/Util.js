export function join (arr) {
  arr = makeArray(arr);
  return arr.map(item => item.toString()).join('');
}

export function makeArray (arr) {
  switch (typeof arr) {
    case 'string': return [ arr ];
    default: return arr.hasOwnProperty('length')
        ? Array.prototype.slice.call(arr)
        : [ arr ];
  }
}

/**
 * Helper to reorder arrays
 */
export const reorder = ({ list, startIndex, endIndex }) => {
  const result = Array.from(list);
  const [reorderedItem] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, reorderedItem);
  return result;
};

export const getPageCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getPagesArray = (totalPagesCount) => {
  let result = [];
  for (let i = 0; i < totalPagesCount; i++) {
    result.push(i + 1);
  }
  return result;
};

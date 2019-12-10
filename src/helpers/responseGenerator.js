export const stripNull = (dirtyObj) => {
  let cleanObj = {};

  Object.keys(dirtyObj).forEach((key) => {
    const newVal = dirtyObj[key];
    cleanObj = newVal ? { ...cleanObj, [key]: newVal } : cleanObj;
  });

  return cleanObj;
};

export const responseGenerator = {
  sendError(res, statusCode, message = '') {
    return res.status(statusCode).send({
      message,
    });
  },

  sendSuccess(res, statusCode, data, message = '', metadata = '') {
    const filteredResponse = stripNull({
      metadata,
      message,
      data,
    });
    return res.status(statusCode).send(filteredResponse);
  },
};

export default { responseGenerator };

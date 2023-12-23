const errorWrapper = (func) => async (req, res, next) => {
    try {
      await func(req, res);
    } catch (e) {
      next(e);
    }
  };
  
// const sum = (a, b) => a + b;
// const subtract = (a, b) => a-b;
// const wrapperSum - errorWrapper(sum);
// const wrapperSubtract = errorWrapper(subtract)

  module.exports = errorWrapper;
  
module.exports = (req, res, next) => {
  try {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
  } catch (err) {
    console.error('Logger middleware error:', err);
    next(err);
  }
};
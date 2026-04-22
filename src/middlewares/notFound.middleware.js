module.exports = (req, res) => {
  console.log(`404 Middleware Hit: ${req.method} ${req.url}`);
  res.status(404).json({ 
    message: 'Route not found - CUSTOM 404',
    path: req.originalUrl || req.url,
    method: req.method
  });
};
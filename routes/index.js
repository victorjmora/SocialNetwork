const router = require('express').Router();
const apiRoutes = require('./api');

// If the request doesn't match any defined routes send response //
router.use('/api', apiRoutes);
router.use((req, res) => {
  return res.send('Incorrect route.');
});

module.exports = router;
const userRoute = require('./User');
const blogPost = require('./blogPost');
const comment = require('./comment');

router.use('/user', userRoute);
router.use('/blogPost', blogPost);
router.use('/comment', comment);

module.exports = router;

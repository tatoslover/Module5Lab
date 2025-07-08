const express = require("express");
const router = express.Router();
const friendsController = require('../controllers/friendsController');

// Clean routes that delegate to controller methods
// Following MVC pattern from Module5Code

// GET /friends - Get all friends
router.get('/', friendsController.getAllFriends);

// GET /friends/filter - Filter friends by gender and/or starting letter
// Usage: /friends/filter?gender=male&letter=R
router.get('/filter', friendsController.filterFriends);

// GET /friends/info - Get request header information
router.get('/info', friendsController.getHeaderInfo);

// GET /friends/:id - Get single friend by ID
router.get('/:id', friendsController.getFriendById);

// POST /friends - Add new friend
router.post('/', friendsController.addFriend);

// PUT /friends/:id - Update existing friend
router.put('/:id', friendsController.updateFriend);

module.exports = router;
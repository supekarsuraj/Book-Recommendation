const express = require("express");
const router = express.Router();
const userController = require('../Controllers/user_controllers');
const bookController=require('../Controllers/book_controllers');
const { authMiddleware } = require("../middleware/jwtMiddleware");

router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/find',bookController.searchbookBytitle)
router.post("/giverating",authMiddleware,bookController.giveRating)
router.get('/getrating',authMiddleware,bookController.getRating)



module.exports = router;

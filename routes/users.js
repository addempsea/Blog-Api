var express = require('express');
var router = express.Router();
const controllers = require("../controllers/index");
const auth = require("../middleware/token");


router.get('/', function(req, res, next) {
  res.send('You\'re welcome to the blog');
});

router.post("/create", auth, controllers.create);
router.get("/stories", auth, controllers.story);
router.get("/story/:id", auth, controllers.storyOne);
router.put("/story/:id/edit", auth, controllers.edit);
router.delete("/story/:id/delete", auth, controllers.removed);

module.exports = router;
  
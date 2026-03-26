const express = require("express");
const router = express.Router();
const { getItems, createItem, deleteItem, searchItems } = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect);

router.route("/")
    .get(getItems)
    .post(createItem);

router
    .route("/search")
    .get(searchItems);

router
    .route("/:id")
    .delete(deleteItem);

module.exports = router;

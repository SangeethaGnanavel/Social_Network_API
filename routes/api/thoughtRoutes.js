const router = require("express").Router();
const {
  getThoughts,
  createThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/courses
router.route("/").get(getThoughts).post(createThoughts);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions/").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
module.exports = router;

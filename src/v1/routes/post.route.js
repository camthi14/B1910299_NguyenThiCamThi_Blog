const { Router } = require("express");
const postController = require("../controllers/post.controller");

const router = Router();

router.get("/", postController.getAll);
router.get("/slide", postController.getAll);
router.post("/", postController.create);
router.get("/:id", postController.getById);
router.get("/slug/:slug", postController.getBySlug);
router.patch("/:id", postController.update);
router.delete("/:id", postController.delete);
router.delete("/force/:id", postController.deleteForce);

module.exports.postRoute = router;

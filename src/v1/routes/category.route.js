const { Router } = require("express");
const categoryController = require("../controllers/category.controller");

const router = Router();

router.get("/", categoryController.getAll);
router.post("/", categoryController.create);
router.get("/:id", categoryController.getById);
router.get("/parent/:id", categoryController.getByParentId);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);
router.delete("/force/:id", categoryController.deleteForce);

module.exports.categoryRoute = router;

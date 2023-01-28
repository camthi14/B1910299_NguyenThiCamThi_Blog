const CategoryService = require("../services/category.service");
const { _Category } = require("../models/category.model");
const ParentController = require("./parent.controller");

class CategoryController extends ParentController {
  constructor() {
    const _service = new CategoryService(_Category);
    super(_service);
  }

  create = async (req, res, next) => {
    try {
      const data = req.body;

      console.log(data);
      if (!data.name || !data.slug || !data.level || !data.parentId) {
        return next({
          status: 400,
          message:
            "Têndanh mục , slug, level, parentId là những trường bắt buộc!",
        });
      }

      const response = await this.service.create({ data });

      res.status(response.status).json(response);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CategoryController();

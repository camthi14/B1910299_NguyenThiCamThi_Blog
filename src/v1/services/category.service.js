const ParentService = require("./parent.service");

class CategoryService extends ParentService {
  superCreate = this.create;

  create = (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name } = data;

        const findName = await this.model.findOne({ name }).exec();

        if (findName) {
          return resolve({
            errors: {
              message: "Ten danh muc da ton tai",
            },
            status: 400,
          });
        }

        const response = await this.superCreate({
          parent_id: data.parentId,
          ...data,
        });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = CategoryService;

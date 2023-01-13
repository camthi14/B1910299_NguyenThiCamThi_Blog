const { typeOfObjectId } = require("../utils/functions");

class ParentService {
  constructor(model) {
    this.model = model;
  }

  getAll = async ({
    limit = 5,
    page = 1,
    selectField = "",
    populate = { path: "", select: "" },
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _model = this.model;

        if (limit === 0 && page === 0) {
          return resolve({
            elements: await _model.find(),
            errors: null,
            status: 200,
          });
        }

        console.log(populate);

        if (!populate.path && !populate.select) {
          return resolve(
            await this.#getAllNotPopulate({ limit, page, selectField })
          );
        }

        resolve(
          await this.#getAllPopulate({ limit, page, selectField, populate })
        );
      } catch (error) {
        reject(error);
      }
    });
  };

  create = async (data) => {
    const response = await this.model.create(data);

    return {
      status: 201,
      elements: response,
      errors: null,
    };
  };

  getById = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!typeOfObjectId(id)) {
          return resolve({
            errors: {
              message: "Id khong dung gia tri",
            },
            elements: null,
            status: 400,
          });
        }

        const response = await this.model.findById(id);

        if (!response) {
          return resolve({
            errors: {
              message: "Id khong ton tai",
            },
            elements: {},
            status: 200,
          });
        }

        resolve({
          elements: response,
          errors: null,
          status: 200,
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  update = async ({ id, data }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.model.findOneAndUpdate({ _id: id }, data, {
          upsert: false,
          new: true,
        });

        if (!response) {
          return resolve({
            errors: {
              message: "Id khong ton tai",
            },
            status: 400,
          });
        }

        resolve({
          elements: response,
          status: 201,
          errors: null,
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  delete = async ({ id, isDelete = false }) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (isDelete) {
          //Xoa vinh vien
          const response = await this.model.findOneAndDelete(
            { _id: id },
            { rawResult: true }
          );

          return resolve({
            errors: null,
            status: 200,
            elements: response,
          });
        }

        const response = await this.update({ id, data: { is_delete: true } });

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  deleteForce = async (id) => {
    return await this.delete({ id, isDelete: true });
  };
  /**
   * Lay du lieu khong co ref
   * @param {limit = 5, page = 1, selectField} param0
   * @returns
   */

  #getAllNotPopulate = ({ limit = 5, page = 1, selectField }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _model = this.model;
        const skip = (page - 1) * limit;

        await _model
          .find({ is_delete: false })
          .select(selectField)
          .limit(limit)
          .skip(skip)
          .exec((error, response) => {
            if (error) {
              reject(error);
            }

            _model.count().exec((error, count) => {
              if (error) {
                reject(error);
              }
              resolve({
                elements: response,
                errors: null,
                status: 200,
                meta: {
                  pagination: {
                    page,
                    limit,
                    totalRow: Math.ceil(count / limit),
                  },
                },
              });
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Lay du lieu  co ref
   * @param {limit = 5, page = 1, selectField, populate} param0
   * @returns
   */
  #getAllPopulate = ({ limit = 5, page = 1, selectField, populate }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const _model = this.model;
        const skip = (page - 1) * limit;

        await _model
          .find({ is_delete: false })
          .select(selectField)
          .populate(populate)
          .limit(limit)
          .skip(skip)
          .exec((error, response) => {
            if (error) {
              reject(error);
            }

            _model.count().exec((error, count) => {
              if (error) {
                reject(error);
              }
              resolve({
                elements: response,
                errors: null,
                status: 200,
                meta: {
                  pagination: {
                    page,
                    limit,
                    totalRow: Math.ceil(count / limit),
                  },
                },
              });
            });
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}

module.exports = ParentService;

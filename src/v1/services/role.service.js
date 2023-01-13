const ParentService = require("./parent.service");

class RoleService extends ParentService {
  superCreate = this.create;
  superUpdate = this.update;

  getRoleIdGTE5 = async () => {
    return {
      status: 200,
      message: "getRoleIdGTE5 success",
    };
  };

  //@override
  create = async ({ key, name }) => {
    const findKey = await this.model.findOne({
      key: key,
    });

    if (findKey) {
      return {
        status: 400,
        message: "Key da ton tai",
      };
    }

    const findName = await this.model.findOne({
      name: name,
    });

    if (findName) {
      return {
        status: 400,
        message: "Name da ton rai",
      };
    }

    const response = await this.superCreate({ key: key, name: name });

    return response;
  };

  update = async ({ id, data }) => {
    const findName = await this.model
      .findOne({
        name: data.name,
      })
      .exec();

    if (findName && findName._id.toString() !== id) {
      return {
        errors: {
          message: "Name da ton tai",
        },
        status: 200,
        elements: null,
      };
    }

    const findKey = await this.model
      .findOne({
        key: data.key,
      })
      .exec();

    if (findKey && findKey._id.toString() !== id) {
      return {
        errors: {
          message: "Key da ton tai",
        },
        status: 200,
        elements: null,
      };
    }

    const response = await this.superUpdate({ id: id, data: data });
    return response;
  };
}

module.exports = RoleService;

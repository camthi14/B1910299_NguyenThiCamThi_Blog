const { roleRoute } = require("./role.route");
const { userRoute } = require("./user.route");
const { authRoute } = require("./auth.route");

function initialRouter(app) {
  app.use("/api/v1/role", roleRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/auth", authRoute);
}
module.exports = initialRouter;

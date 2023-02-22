const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const error_handle_middleware = require("./v1/middlewares/error_handle_middleware");
const initialRouter = require("./v1/routes");
const cookieParser = require("cookie-parser");
const { OPTION_CORS } = require("./v1/utils/option_cors");
const multer = require("multer");
const { storage } = require("./v1/utils/functions");
const upload = multer({ storage: storage });

// init db mongo
require("./v1/database/init.mongodb");

app.use(express.static(__dirname + "/assets/upload"));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(cors(OPTION_CORS));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// * upload image
app.use(upload.array("files"));

app.post("/api/v1/upload/image", (req, res, next) => {
  const tempFile = req.files;

  if (!tempFile) {
    return next({
      message: "Không tìm thấy file ảnh",
      status: 400,
    });
  }

  if (tempFile && tempFile.length > 0) {
    res.json(req.files[0]);
  }
});

// * router
initialRouter(app);

// * error handle middleware
error_handle_middleware(app);

module.exports = app;

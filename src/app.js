// import cookieParser from "cookie-parser";
// import express from "express";
// import authRoute from "./modules/auth/auth.routes.js";
// import ApiError from "./common/utils/api-error.js";
// import multer from "multer";

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());




// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, file.fieldname + '-' + uniqueSuffix)
//   }
// })



// const upload = multer({storage});

// app.post("/upload",upload.single("file"), (req, res) => {
//   // if (!req.file) {
//   //   return res.status(400).json({ error: "No file uploaded" });
//   // }
//   // Process the uploaded file (e.g., save it, analyze it, etc.)

//   console.log(req.file); // Log file details for debugging
//   res.json({ message: "File uploaded successfully", filename: req.file.originalname });

// });

// app.use("/api/auth", authRoute);

// // Catch-all for undefined routes
// app.all("{*path}", (req, res) => {
//   throw ApiError.notFound(`Route ${req.originalUrl} not found`);
// });
// export default app;




import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/auth/auth.routes.js";
import ApiError from "./common/utils/api-error.js";
import multer from "multer";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.array("photos"), (req, res) => {
 // console.log("BODY:", req.body);
  console.log("FILE:", req.files);

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  res.json({
    success: true,
    message: "File uploaded successfully",
    file: req.file,
  });
});

app.use("/api/auth", authRoute);

app.all("{*path}", (req, res) => {
  throw ApiError.notFound(`Route ${req.originalUrl} not found`);
});

export default app;
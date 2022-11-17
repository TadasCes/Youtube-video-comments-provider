import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { videoRouter } from "./api/routes/video.routes.js";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to mongo`);
  });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", videoRouter);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.listen(5000, () => console.log(`App listening on port ${5000}.`));

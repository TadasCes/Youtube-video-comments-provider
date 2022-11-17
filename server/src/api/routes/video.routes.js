import * as express from "express";
import { getVideoList } from "../controllers/video.controller.js";
import { returnSuccess } from "../middleware/response.js";

export const videoRouter = express.Router();

videoRouter.post("/video/", async (req, res, next) => {
  await getVideoList(req.body).then((result) => {
    return returnSuccess(result, res);
  });
});

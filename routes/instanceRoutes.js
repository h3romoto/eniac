import express from "express";
import { buildInstance, connectInstance, destroyInstance } from "../controllers/instanceController.js";
import router from "./authRoutes.js";

router = express.Router()

router.route("/create-instance").post(buildInstance);
router.route("/connect-instance").post(connectInstance);
route.route("/delete-instance").patch(destroyInstance);

export default router;
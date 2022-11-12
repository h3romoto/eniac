import express from "express";
import { buildInstance, connectInstance, destroyInstance, updateInstance } from "../controllers/instanceController.js";

const router = express.Router()

router.route("/").post(buildInstance);
router.route("/vm/:id").delete(destroyInstance).patch(updateInstance).post(connectInstance);

export default router;
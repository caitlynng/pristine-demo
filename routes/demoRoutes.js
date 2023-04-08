import express from "express";
const router = express.Router();

import {
  getReport,
  showStats,
  searchAutoComplete,
  searchResults,
  manageUpload
} from "../controllers/demoController.js";

router.route("/analytics").post(showStats);
router.route("/reports").post(getReport);
router.route("/autocomplete").post(searchAutoComplete)
router.route("/search").post(searchResults)
router.route("/settings/manage-upload").get(manageUpload)

export default router;

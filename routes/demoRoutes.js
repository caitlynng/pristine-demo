import express from "express";
const router = express.Router();

import {
  getReport,
  showStats,
  // updateData,
  searchAutoComplete,
  searchResults,
} from "../controllers/demoController.js";

router.route("/analytics").post(showStats);
router.route("/reports").post(getReport);
// router.route("/statements").post(updateData);
router.route("/autocomplete").post(searchAutoComplete)
router.route("/search").post(searchResults)

export default router;

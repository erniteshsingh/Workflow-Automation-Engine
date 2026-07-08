import express from "express";

import workflowController from "../controllers/workflow.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, workflowController.createWorkflow);

router.get("/", authenticate, workflowController.getMyWorkflows);

router.get("/:id", authenticate, workflowController.getWorkflowById);

router.put("/:id", authenticate, workflowController.updateWorkflow);

router.delete("/:id", authenticate, workflowController.deleteWorkflow);

export default router;

import express from "express";

import workflowController from "../controllers/workflow.controller.js";
import authenticate from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import createWorFlowShema from "../validators/WorkFlow.validate.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  validate(createWorFlowShema),
  workflowController.createWorkflow,
);

router.get("/", authenticate, workflowController.getMyWorkflows);

router.get("/:id", authenticate, workflowController.getWorkflowById);

router.put("/:id", authenticate, workflowController.updateWorkflow);

router.delete("/:id", authenticate, workflowController.deleteWorkflow);

export default router;

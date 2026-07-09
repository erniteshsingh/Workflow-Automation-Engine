import asyncHandler from "../utils/asyncHandler.js";
import workflowService from "../services/workflow.service.js";

const createWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.createWorkflow(req.body, req.user._id);

  return res.status(201).json({
    success: true,
    message: "Workflow created successfully",
    data: workflow,
  });
});

const getMyWorkflows = asyncHandler(async (req, res) => {
  const result = await workflowService.getMyWorkflows(req.user._id, req.query);

  return res.status(200).json({
    success: true,
    message: "Workflows fetched successfully",
    data: result,
  });
});

const getWorkflowById = asyncHandler(async (req, res) => {
  const workflow = await workflowService.getWorkflowById(
    req.params.id,
    req.user._id,
  );

  return res.status(200).json({
    success: true,
    message: "Workflow fetched successfully",
    data: workflow,
  });
});

const updateWorkflow = asyncHandler(async (req, res) => {
  const workflow = await workflowService.updateWorkflow(
    req.params.id,
    req.user._id,
    req.body,
  );

  return res.status(200).json({
    success: true,
    message: "Workflow updated successfully",
    data: workflow,
  });
});

const deleteWorkflow = asyncHandler(async (req, res) => {
  await workflowService.deleteWorkflow(req.params.id, req.user._id);

  return res.status(200).json({
    success: true,
    message: "Workflow deleted successfully",
  });
});

export default {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};

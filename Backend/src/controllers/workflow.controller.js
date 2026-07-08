import workflowService from "../services/workflow.service.js";

const createWorkflow = async (req, res) => {
  try {
    const workflow = await workflowService.createWorkflow(
      req.body,
      req.user._id,
    );

    return res.status(201).json({
      success: true,
      message: "Workflow created successfully",
      data: workflow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyWorkflows = async (req, res) => {
  try {
    const result = await workflowService.getMyWorkflows(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Workflows fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getWorkflowById = async (req, res) => {
  try {
    const workflow = await workflowService.getWorkflowById(
      req.params.id,
      req.user._id,
    );

    return res.status(200).json({
      success: true,
      message: "Workflow fetched successfully",
      data: workflow,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateWorkflow = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteWorkflow = async (req, res) => {
  try {
    await workflowService.deleteWorkflow(req.params.id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "Workflow deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};

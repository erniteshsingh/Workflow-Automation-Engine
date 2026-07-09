import Workflow from "../models/workflow.model.js";
import validateObjectId from "../validators/validateObjectId.js";
import ApiError from "../utils/ApiError.js";

const createWorkflow = async (workflowData, userId) => {
  const workflow = await Workflow.create({
    ...workflowData,
    owner: userId,
  });

  return workflow;
};

const getMyWorkflows = async (userId, queryParams = {}) => {
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const search = queryParams.search?.trim();
  const status = queryParams.status;
  const sort = queryParams.sort || "-createdAt";

  const skip = (page - 1) * limit;

  const query = {
    owner: userId,
  };

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (status) {
    query.status = status;
  }

  const [workflows, total] = await Promise.all([
    Workflow.find(query).sort(sort).skip(skip).limit(limit),

    Workflow.countDocuments(query),
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    workflows,
  };
};

const getWorkflowById = async (workflowId, userId) => {
  if (!validateObjectId(workflowId)) {
    throw new ApiError(400, "Invalid workflow id");
  }

  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new ApiError(404, "Workflow not found");
  }

  return workflow;
};

const updateWorkflow = async (workflowId, userId, updateData) => {
  if (!validateObjectId(workflowId)) {
    throw new ApiError(400, "Invalid workflow id");
  }

  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new ApiError(404, "Workflow not found");
  }

  const allowedFields = ["name", "description", "status"];

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      workflow[field] = updateData[field];
    }
  });

  await workflow.save();

  return workflow;
};

const deleteWorkflow = async (workflowId, userId) => {
  if (!validateObjectId(workflowId)) {
    throw new ApiError(400, "Invalid workflow id");
  }

  const workflow = await Workflow.findOne({
    _id: workflowId,
    owner: userId,
  });

  if (!workflow) {
    throw new ApiError(404, "Workflow not found");
  }

  await workflow.deleteOne();
};

export default {
  createWorkflow,
  getMyWorkflows,
  getWorkflowById,
  updateWorkflow,
  deleteWorkflow,
};

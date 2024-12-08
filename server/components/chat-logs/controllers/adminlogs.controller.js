const asyncHandler = require("express-async-handler");
const adminlogsService = require("../services/adminlogs.services");

// Constants for status codes
const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_OK = 200;

// GET /s3/adminlogs
exports.getAdminlogs = asyncHandler(async (req, res) => {


  const options = {
    adminId: req.query.admin_id ? parseInt(req.query.admin_id, 10) : undefined,
    keyword: req.query.keyword,
    dateRange: req.query.date_range,
    sortBy: req.query.sort_by,
    order: req.query.order,
  };

  // Retrieve logs from the service
  const logs = await adminlogsService.getAdminlogs(options);

  // If no logs found, return 404
  if (!logs || logs.length === 0) {
    return res.status(HTTP_STATUS_NOT_FOUND).json({
      errors: [
        {
          status: "not_found",
          errors: ["No logs found for the specified criteria."],
          locations: ["adminlogsService.getAdminlogs"],
        },
      ],
    });
  }

  // Return logs with 200
  return res.status(HTTP_STATUS_OK).json({ data: logs });
});
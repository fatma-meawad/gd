const db = require("../config/dbconfig");

module.exports.getAdminlogsDb = async (options) => {
  let query = `SELECT id, action_type, admin_id, message_id, action_time, details FROM Log`;
  const conditions = [];
  const params = [];

  if (options.admin_id !== undefined) {
    params.push(options.admin_id);
    conditions.push(`admin_id = $${params.length}`);
  }

  if (options.keyword) {
    params.push(`%${options.keyword}%`);
    conditions.push(`details ILIKE $${params.length}`);
  }

  if (options.date_range) {
    const [startDate, endDate] = options.date_range.split(":");
    params.push(startDate, endDate);
    conditions.push(`action_time BETWEEN $${params.length - 1} AND $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(" AND ");
  }

  if (options.sort_by) {
    let sortColumn;
    if (options.sort_by === "date") {
      sortColumn = "action_time";
    } else if (options.sort_by === "keyword") {
      sortColumn = "details";
    } else if (options.sort_by === "admin_id") {
      sortColumn = "admin_id";
    }

    const sortOrder = options.order === "desc" ? "desc" : "asc";
    query += ` ORDER BY ${sortColumn} ${sortOrder}`;
  }

  query += ` LIMIT 1000`;

  const result = await db.query(query, params);



  // Format action_time to respect maxLength: 20
  const formattedRows = result.rows.map(row => ({
    ...row,
    action_time: new Date(row.action_time).toISOString().slice(0, 19) + 'Z', // Ensure 'Z' is appended for UTC
  }));

  console.log(formattedRows)
  return formattedRows;
};

const buildGetQuery = (cursor, limit) => {
  let query = "SELECT * FROM product";
  const params = [];

  if (cursor) {
    query += " WHERE id > $1";
    params.push(cursor);
    query += " LIMIT $2";
  } else {
    query += " LIMIT $1";
  }

  params.push(limit);
  return { query, params };
};

/**
 * Calculates pagination information for a set of results.
 *
 * @param {Array} resultRows - The rows of results from the database query.
 * @param {string|null} cursor - The cursor indicating the current position in the pagination.
 * @param {number} limit - The maximum number of results per page.
 * @param {number} totalCount - The total number of results available.
 * @returns {Object} An object containing pagination information.
 * @returns {number} total_count - The total number of results.
 * @returns {string|null} start_cursor - The cursor for the start of the current page.
 * @returns {string|null} end_cursor - The cursor for the end of the current page.
 * @returns {boolean} has_next_page - Indicates if there is a next page available.
 * @returns {number} page - The current page number.
 */
const calculatePaginationInfo = (resultRows, cursor, limit, totalCount) => {
  const totalPages = Math.ceil(totalCount / limit);
  const start_cursor =
    cursor || (resultRows.length > 0 ? resultRows[0].id.toString() : null);
  const page = cursor ? Math.ceil(start_cursor / limit) : 1;
  const has_next_page = page < totalPages;
  const end_cursor = has_next_page
    ? resultRows[resultRows.length - 1].id.toString()
    : null;

  return {
    total_count: totalCount,
    start_cursor,
    end_cursor,
    has_next_page,
    page,
  };
};

module.exports = {
  DEFAULT_PRODUCTS_LIMIT: 50,
  buildGetQuery,
  calculatePaginationInfo,
};

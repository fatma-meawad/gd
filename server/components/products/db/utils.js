const DATABASE_FILE = "products.db.js";
const DEFAULT_PRODUCTS_LIMIT = 50;

/**
 * Builds a SQL query to fetch products with optional cursor-based pagination.
 *
 * @param {number} [cursor] - The ID of the last product fetched in the previous query, used for pagination.
 * @param {number} limit - The maximum number of products to fetch.
 * @returns {{ query: string, params: Array }} An object containing the SQL query string and the parameters array.
 */
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
 * @returns {{ total_count: number, start_cursor: string|null, end_cursor: string|null, has_next_page: boolean, page: number }} An object containing pagination information.
 */
const calculatePaginationInfo = (resultRows, cursor, limit, totalCount) => {
  const totalPages = Math.ceil(totalCount / limit);
  const startCursor =
    cursor || (resultRows.length > 0 ? resultRows[0].id.toString() : null);
  const page = cursor ? Math.ceil(startCursor / limit) : 1;
  const hasNextPage = page < totalPages;
  const endCursor = hasNextPage
    ? resultRows[resultRows.length - 1].id.toString()
    : null;

  return {
    // eslint-disable-next-line camelcase
    total_count: totalCount,
    // eslint-disable-next-line camelcase
    start_cursor: startCursor,
    // eslint-disable-next-line camelcase
    end_cursor: endCursor,
    // eslint-disable-next-line camelcase
    has_next_page: hasNextPage,
    page,
  };
};

module.exports = {
  DATABASE_FILE,
  DEFAULT_PRODUCTS_LIMIT,
  buildGetQuery,
  calculatePaginationInfo,
};

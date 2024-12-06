const buildGetQuery = (cursor, limit) => {
  let query = 'SELECT * FROM product';
  const params = [];

  if (cursor) {
    query += ' WHERE id > $1';
    params.push(cursor);
    query += ' LIMIT $2';
  } else {
    query += ' LIMIT $1';
  }

  params.push(limit);
  return { query, params };
};

const calculatePaginationInfo = (result, cursor, limit, totalCount) => {
  const totalPages = Math.ceil(totalCount / limit);
  const start_cursor = cursor || (result.rows.length > 0 ? result.rows[0].id.toString() : null);
  const page = cursor ? Math.ceil(start_cursor / limit) : 1;
  const has_next_page = page < totalPages;
  const end_cursor = has_next_page ? result.rows[result.rows.length - 1].id.toString() : null;

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
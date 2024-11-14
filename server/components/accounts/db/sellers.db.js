const pool = require("../config/dbconfig");
const schema = require("../schema.json");

module.exports.getSellersDb = async (options) => {
  const { businessId, limit = 50, offset = 0, searchSellerName } = options;

  try {
    // Costruisci la query dinamicamente
    let query = `SELECT * FROM SellerAccount WHERE 1=1`;
    const params = [];

    if (businessId) {
      query += ` AND business_id = $1`;
      params.push(businessId);
    }

    if (searchSellerName) {
      query += ` AND name ILIKE $${params.length + 1}`;
      params.push(`%${searchSellerName}%`);
    }

    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    return {
      sellers_list: result.rows,
    };
  } catch (error) {
    console.error("Error in getSellersDb:", error);
    throw error;
  }
};

module.exports.getSellersBySellerIdAccessHistoryDb = async (seller_id) => {
  try {
    const query = `
      SELECT access_date, location, device 
      FROM SellerAccessHistory 
      WHERE seller_id = $1 
      ORDER BY access_date DESC
    `;
    const params = [seller_id];
    const result = await pool.query(query, params);

    return {
      access_history: result.rows,
    };
  } catch (error) {
    console.error("Error in getSellersBySellerIdAccessHistoryDb:", error);
    throw error;
  }
};

module.exports.postSellersInactiveNotificationsDb = async (
  inactivity_period
) => {
  try {
    const query = `
      SELECT id, name, email 
      FROM SellerAccount 
      WHERE last_active < NOW() - INTERVAL '${inactivity_period} days'
    `;
    const result = await pool.query(query);

    // Supponiamo di inviare notifiche (simulato qui)
    const notifications = result.rows.map((seller) => ({
      seller_id: seller.id,
      message: `Notification sent to ${seller.name} (${seller.email}) for inactivity.`,
    }));

    return {
      notifications,
    };
  } catch (error) {
    console.error("Error in postSellersInactiveNotificationsDb:", error);
    throw error;
  }
};

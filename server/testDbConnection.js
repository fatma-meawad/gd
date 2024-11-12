const db = require('./components/accounts/config/dbconfig'); // Corrected path

(async () => {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("Database connected successfully:", res.rows[0]);
  } catch (err) {
    console.error("Database connection error:", err);
  } finally {
    db.end();
  }
})();

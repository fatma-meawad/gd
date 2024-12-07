const schema = require("../schema.json");
const pool = require("../config/dbconfig");

module.exports.getProductsDb = async (limit, cursor) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    data: {},
    messages: ["getProductsDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.postProductsDb = async (product) => {
  const { 
    product_name: productName, 
    category_id: categoryId, 
    short_description: shortDescription, 
    detailed_description: detailedDescription, 
    product_photos: productPhotos,
    product_url: productUrl 
  } = product;

  const requiredFields = ['category_id', 'product_name', 'short_description'];
  const missingFields = requiredFields.filter(field => !product[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  const productNameLength=3;
  const shortDescriptionLength=20;
  if (
    typeof productName !== 'string' || productName.length < productNameLength ||
    typeof categoryId !== 'number' || !Number.isInteger(categoryId) ||
    typeof shortDescription !== 'string' || shortDescription.length < shortDescriptionLength ||
    (productUrl && typeof productUrl !== 'string') ||
    (productPhotos && !Array.isArray(productPhotos))
  ) {
    throw new Error("Invalid data types entered");
  }

  try {
    await pool.query('BEGIN');
    const productQuery = `
      INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, product_name, category_id, short_description, detailed_description, product_url
    `;
    const productValues = [
      productName,
      categoryId,
      shortDescription,
      detailedDescription,
      productUrl,
    ];

    const productResult = await pool.query(productQuery, productValues);
    const newProduct = productResult.rows[0];

    if (productPhotos && productPhotos.length > 0) {
      const photoQuery = `
        INSERT INTO ProductPhotos (product_id, photo_url) 
        VALUES ($1, $2)
      `;
      for (const photoUrl of productPhotos) {
        if (typeof photoUrl !== 'string') {
          throw new Error("Invalid photo URL format");
        }
        await pool.query(photoQuery, [newProduct.id, photoUrl]);
      }
    }

    await pool.query('COMMIT');

    return {
      status: "success",
      data: newProduct,
      messages: ["Product created successfully with associated photos"],
      locations: ["products.database.js"],
    };
  } catch (error) {

    await pool.query('ROLLBACK');
    const structuredError = {
      status: "error",
      messages: ["Database error while creating product"],
      details: {
        originalError: error.message,
        stack: error.stack,
        locations: ["products.db.js"],
      },
    };
    throw structuredError;
  }
};


module.exports.postProductsByProductIdTagsDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postProductsByProductIdTagsDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.postProductsByProductIdPriceDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postProductsByProductIdPriceDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.postProductsByProductIdInventoryDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postProductsByProductIdInventoryDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.postProductsBulkEditDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postProductsBulkEditDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.putProductsByIdExpirationDateDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putProductsByIdExpirationDateDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.putProductsByIdDiscountDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["putProductsByIdDiscountDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.postProductsByProductIdPhotosDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["postProductsByProductIdPhotosDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

module.exports.getProductsByProductIdPhotosDb = async (options) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  return {
    messages: ["getProductsByProductIdPhotosDb not implemented yet"],
    locations: ["products.database.js"],
  };
};

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
    // category_name: categoryName, 
    short_description: shortDescription, 
    detailed_description: detailedDescription, 
    // product_photos: productPhotos, 
    product_url: productUrl 
  }  = product;
  const requiredFields = ['category_id', 'product_name', 'short_description' ];
  const missingFields = requiredFields.filter(field => !product[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  const product_name_length=3;
  const short_description_length=20;
  if (
    typeof productName !== 'string' || productName.length < product_name_length ||
    typeof categoryId !== 'number' || !Number.isInteger(categoryId) ||
    typeof shortDescription !== 'string' || shortDescription.length < short_description_length ||
    ( productUrl && typeof  productUrl !== 'string')
  ) {
    throw new Error("Invalid data types entered");
  }

  try {
    const query = `
      INSERT INTO product (product_name, category_id, short_description, detailed_description, product_url) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, product_name, category_id, short_description, detailed_description, product_url
    `;
    const values = [
      productName,
      categoryId,
      // categoryName,
      shortDescription,
      detailedDescription,
      // productPhotos,
      productUrl
    ];

    const result = await pool.query(query, values);
    const newProduct = result.rows[0];

    return {
      status: "success",
      data: newProduct, 
      messages: ["postMessagesDb Message"],
      locations: ["messages.database.js"],
    };
  } catch (error) {

    const structuredError = {
      status: "error",
      messages: ["Database error while creating product"],
      details: {
        originalError: error.message,
        stack: error.stack,
        locations: ["products.db.js"],
      },
    };
    console.error(structuredError);
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

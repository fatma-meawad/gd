require("dotenv-flow").config();
const pool = require("../config/dbconfig");
const {
  DEFAULT_PRODUCTS_LIMIT,
  buildGetQuery,
  calculatePaginationInfo,
} = require("./utils");

module.exports.getProductsDb = async (
  limit = DEFAULT_PRODUCTS_LIMIT,
  cursor
) => {
  try {
    const { query, params } = buildGetQuery(cursor, limit);
    const result = await pool.query(query, params);
    const totalResult = await pool.query("SELECT COUNT(*) FROM product");
    const pageInfo = await calculatePaginationInfo(
      result.rows,
      cursor,
      limit,
      +totalResult.rows[0].count
    );

    return {
      data: {
        products: result.rows,
        page_info: pageInfo,
      },
      messages: [],
      locations: ["products.database.js"],
    };
  } catch (err) {
    return {
      errors: [err.message],
      messages: [],
      locations: ["products.database.js"],
    };
  }
};

module.exports.postProductsDb = async (product) => {
  /** Imagine that in this funciton, you will perform the database query and get its output in result: result = await pool.query();
  1- Modify options to be specific parameters or one of your objects: think about what you need to recieve from services to do the query successfully
  2- Thinks about the entities you need to access here. Are they created? are they well defined? Can you make sure entities in init.sql are updated. 
  3- you can access the schema.json (imported above) and use objects in it/modify or create them.
*/
  // const {
  //   id,
  //   product_name,
  //   category_id,
  //   category_name,
  //   short_description,
  //   detailed_description,
  //   product_photos = [], // Default to empty array if missing
  //   product_url = ""
  // } = product;

  //Check for missing fields (To pass Test Case 2: Invalid input - missing required field/-s)
  // const requiredFields = ['category_id', 'product_name', 'short_description'];
  // const missingFields = requiredFields.filter(field => !product[field]);

  // if (missingFields.length > 0) {
  //   throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  // }

  //Validate data types (To pass Test Case 3: Invalid input - incorrect data types/-s)
  // if (
  //   typeof category_id !== 'number' ||
  //   typeof product_name !== 'string' ||
  //   typeof short_description !== 'string'
  //   )
  // {throw new Error('Invalid data types entered');}

  // const newProduct = {
  //   id,
  //   product_name,
  //   category_id,
  //   category_name,
  //   short_description,
  //   detailed_description,
  //   product_photos,
  //   product_url,
  // };

  //Simulate saving the product by pushing it into the mock array
  // mockProducts.push(newProduct);

  return {
    // data: newProduct,
    //**Swagger shows error 500 if the below returns are not present. But postProductsDb unit tests only pass without them.**
    messages: ["postMessagesDb not implemented yet"],
    locations: ["messages.database.js"],
  };
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

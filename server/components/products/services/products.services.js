const products = require("../db/products.db");
const path = require("path");
const AppError = require(path.join(__dirname, "../../../utils/error"));
const { StatusCodes } = require("http-status-codes")
const locationHere="products.services.js"

module.exports.getProducts = async (limit, cursor) => {
  try {
    const result = await products.getProductsDb(limit, cursor);
    return { ...result };
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postProducts = async (productName, categoryId, shortDescription, detailedDescription, productPhotos, productUrl) => {
  try {
    // Convert camelCase keys to snake_case for the database
    const product = Object.keys({
      productName,
      categoryId,
      shortDescription,
      detailedDescription,
      productPhotos,
      productUrl,
    }).reduce((acc, key) => {
      const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
      acc[snakeKey] = { productName, categoryId, shortDescription, detailedDescription, productPhotos, productUrl }[key];
      return acc;
    }, {});

    const result = await products.postProductsDb(product);
    const resultMessage="Product created successfully in the database"

    result.messages.push(resultMessage);
    result.locations.push(locationHere);

    return { result };
  } catch (error) {
    throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR, {
      locations: [locationHere],
    });
  }
};


module.exports.postProductsByProductIdTags = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await products.postProductsByProductIdTagsDb(product_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postProductsByProductIdTags services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postProductsByProductIdPrice = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await products.postProductsByProductIdPriceDb(product_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postProductsByProductIdPrice services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postProductsByProductIdInventory = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await products.postProductsByProductIdInventoryDb(product_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postProductsByProductIdInventory services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postProductsBulkEdit = async () => {
  // Implement your business logic here...

  try {
    let result = await products.postProductsBulkEditDb();
    //delete this when you actually implement something.
    result.messages.push("postProductsBulkEdit services not implemented yet");
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putProductsByIdExpirationDate = async (id) => {
  // Implement your business logic here...

  try {
    let result = await products.putProductsByIdExpirationDateDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "putProductsByIdExpirationDate services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.putProductsByIdDiscount = async (id) => {
  // Implement your business logic here...

  try {
    let result = await products.putProductsByIdDiscountDb(id);
    //delete this when you actually implement something.
    result.messages.push(
      "putProductsByIdDiscount services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.postProductsByProductIdPhotos = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await products.postProductsByProductIdPhotosDb(product_id);
    //delete this when you actually implement something.
    result.messages.push(
      "postProductsByProductIdPhotos services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

module.exports.getProductsByProductIdPhotos = async (product_id) => {
  // Implement your business logic here...

  try {
    let result = await products.getProductsByProductIdPhotosDb(product_id);
    //delete this when you actually implement something.
    result.messages.push(
      "getProductsByProductIdPhotos services not implemented yet"
    );
    result.locations.push("products.services.js");

    return result;
  } catch (error) {
    throw new AppError(error);
  }
};

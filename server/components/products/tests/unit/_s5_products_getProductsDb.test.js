/**
 * unit tests for getProductsDb method
 */
const { getProductsDb } = require("../../db/products.db");
const { DEFAULT_PRODUCTS_LIMIT } = require("../../db/utils");

describe("getProductsDb", () => {
  // Test case 1: Default behavior - return a default nr of products when limit is not specified
  it("should return a default number of products when no limit is specified", async () => {
    const result = await getProductsDb();

    expect(result.data.products.length).toBeLessThanOrEqual(DEFAULT_PRODUCTS_LIMIT);
  });

  // Test case 2: Limit less than total products
  it("should return up to the specified number of products", async () => {
    const limit = 1;
    const result = await getProductsDb(limit);

    expect(result.data.products.length).toBeLessThanOrEqual(limit);
  });

  // Test case 3: Verify product structure
  it("should return products with correct structure", async () => {
    const result = await getProductsDb(1);
    const firstProduct = result.data.products[0];

    if (firstProduct) {
      expect(firstProduct).toHaveProperty("id");
      expect(firstProduct).toHaveProperty("product_name");
      expect(firstProduct).toHaveProperty("short_description");
      expect(firstProduct).toHaveProperty("category_id");
      expect(firstProduct).toHaveProperty("detailed_description");
      expect(firstProduct).toHaveProperty("product_url");
    } else {
      expect(result.data.products.length).toBe(0);
    }
  });

  // Test case 4: Verify page info details
  it("should return correct page info", async () => {
    const limit = 1;
    const result = await getProductsDb(limit);

    expect(result.data.page_info).toBeDefined();
    expect(result.data.page_info.total_count).toBeDefined();
    expect(result.data.page_info.has_next_page).toBe(
      result.data.page_info.total_count > limit
    );
    expect(result.data.page_info.start_cursor).toBe(
      result.data.products.length > 0 ? result.data.products[0].id.toString() : null
    )
    expect(result.data.page_info.end_cursor).toBe(
      result.data.page_info.has_next_page
        ? result.data.products[result.data.products.length - 1].id.toString()
        : null
    )
    expect(result.data.page_info.page).toBe(1);
  });
});

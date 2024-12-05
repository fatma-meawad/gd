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
  it("should return limited products when limit is less than total products", async () => {
    const limit = 1;
    const result = await getProductsDb(limit);

    expect(result.data.products.length).toBeLessThanOrEqual(limit);
  });

  // Test case 3: Limit greater than total products
  it.skip("should return all products when limit is greater than total products", async () => {
    const limit = 10;
    const result = await getProductsDb(limit);

    // expect(result.data.products).toHaveLength(mockProducts.length);
    expect(result.data.page_info.has_next_page).toBe(false);
  });

  // Test case 4: Verify product structure
  it.skip("should return products with correct structure", async () => {
    const result = await getProductsDb(1);
    const firstProduct = result.data.products[0];

    expect(firstProduct).toHaveProperty("id");
    expect(firstProduct).toHaveProperty("product_name");
    expect(firstProduct).toHaveProperty("short_description");
    expect(firstProduct).toHaveProperty("category_id");
    expect(firstProduct).toHaveProperty("detailed_description");
    expect(firstProduct).toHaveProperty("product_url");
  });

  // Test case 5: Verify page info details
  it.skip("should return correct page info", async () => {
    const limit = 1;
    const result = await getProductsDb(limit);

    expect(result.data.page_info).toEqual({
      has_next_page: true,
      end_cursor: null,
      start_cursor: null,
      // total_count: mockProducts.length,
      page: 1,
    });
  });
});

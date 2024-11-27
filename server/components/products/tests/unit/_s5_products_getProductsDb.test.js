/**
 * unit tests for getProductsDb method
 */
const { getProductsDb } = require("../../db/products.db");
const mockProducts = require("../../db/mock/products.json");

describe("getProductsDb", () => {
  test("should return products with pagination info", async () => {
    const limit = 10;
    const cursor = null;

    const result = await getProductsDb(limit, cursor);

    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("products");
    expect(result.data.products).toEqual(mockProducts);
    expect(result.data).toHaveProperty("page_info");
    expect(result.data.page_info).toEqual({
      has_next_page: false,
      end_cursor: null,
      start_cursor: null,
      total_count: mockProducts.length,
      page: 1,
    });
  });

  test("should return empty products list if no products are available", async () => {
    const limit = 10;
    const cursor = null;

    // Mock the products to be empty
    jest.mock("../../db/mock/products.json", () => []); // it doesnt work. why?

    const result = await getProductsDb(limit, cursor);

    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("products");
    expect(result.data.products).toEqual([]);
    expect(result.data).toHaveProperty("page_info");
    expect(result.data.page_info).toEqual({
      has_next_page: false,
      end_cursor: null,
      start_cursor: null,
      total_count: 0,
      page: 1,
    });

    // Restore the mock
    jest.restoreAllMocks();
  });

  test("should not return more products than the limit", async () => {
    const limit = 5;
    const cursor = null;

    const result = await getProductsDb(limit, cursor);

    expect(result).toHaveProperty("data");
    expect(result.data).toHaveProperty("products");
    expect(result.data.products.length).toBeLessThanOrEqual(limit);
  });
});

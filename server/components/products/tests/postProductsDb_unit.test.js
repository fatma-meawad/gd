require("dotenv-flow").config(); //added at phase 2
const {
  postProductsDb,
} = require("/workspaces/galleria-dashboard/server/components/products/db/products.db");
const mockProducts = require("/workspaces/galleria-dashboard/server/components/products/tests/unit/mock/products.json");

describe("postProductsDb", () => {
  jest.mock(
    "/workspaces/galleria-dashboard/server/components/products/tests/unit/mock/products.json",
    () => mockProducts
  );

  const validProduct = {
    id: 123,
    product_name: "RGB keyboard",
    category_id: 12345,
    short_description:
      "Experience seamless typing with this wireless RGB keyboard, featuring customizable backlighting, ergonomic design, and reliable connectivity for a smooth and vibrant typing experience",
    detailed_description:
      "Upgrade your typing experience with this wireless RGB keyboard, combining style and functionality. With customizable RGB lighting, an ergonomic design, and quiet, responsive keys, it ensures a smooth typing experience whether you're working or gaming. Benefit from stable wireless connectivity, extended battery life, and a sleek, vibrant design that enhances any workspace",
    product_photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
    ],
    product_url: "https://youtu.be/0LE0trd740Q",
  };

  const invalidProduct = {
    id: 123,
    product_name: "RGB keyboard",
    category_id: "12345",
    short_description:
      "Experience seamless typing with this wireless RGB keyboard, featuring customizable backlighting, ergonomic design, and reliable connectivity for a smooth and vibrant typing experience",
    detailed_description:
      "Upgrade your typing experience with this wireless RGB keyboard, combining style and functionality. With customizable RGB lighting, an ergonomic design, and quiet, responsive keys, it ensures a smooth typing experience whether you're working or gaming. Benefit from stable wireless connectivity, extended battery life, and a sleek, vibrant design that enhances any workspace",
    product_photos: [
      "https://example.com/photo1.jpg",
      "https://example.com/photo2.jpg",
    ],
    product_url: "https://youtu.be/0LE0trd740Q",
  };

  beforeEach(() => {
    jest.resetModules();
    mockProducts.length = 0;
  });

  //Test Case 1: Successful creation of a product
  it("should successfully save the product", async () => {
    const result = await postProductsDb(validProduct);

    expect(result.data).toHaveProperty(
      "product_name",
      validProduct.product_name
    );
    expect(result.data).toHaveProperty("category_id", validProduct.category_id);
    expect(result.data).toHaveProperty(
      "short_description",
      validProduct.short_description
    );
    expect(result.data).toHaveProperty(
      "detailed_description",
      validProduct.detailed_description
    );
    expect(result.data).toHaveProperty("product_url", validProduct.product_url);
  });

  //Test Case 2: Invalid input - missing required field/-s
  it("should throw an error for missing required fields", async () => {
    await expect(postProductsDb({})).rejects.toThrow(
      "Missing required fields: category_id, product_name, short_description"
    );
  });

  //Test Case 3: Invalid input - incorrect data types/-s
  it("should throw an error for invalid data types", async () => {
    await expect(postProductsDb(invalidProduct)).rejects.toThrow(
      "Invalid data types entered"
    );
  });
});

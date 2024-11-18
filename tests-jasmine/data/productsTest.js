import {Product, Clothing, Appliances} from'../../data/products.js';
import {formatCurrency} from '../../scripts/utils/money.js'

describe('test suite for Product class', ()=>{
  it("should correctly initialize properties from the productDetails object", () => {
    const productDetails = {
      id: 1,
      image: "example.jpg",
      name: "Sample Product",
      rating: 4.5,
      priceCents: 1500,
    };

    const product = new Product(productDetails);

    expect(product.id).toBe(1);
    expect(product.image).toBe("example.jpg");
    expect(product.name).toBe("Sample Product");
    expect(product.rating).toBe(4.5);
    expect(product.priceCents).toBe(1500);
  });
  it("should handle undefined properties in the productDetails object", () => {
    const productDetails = {
      id: 2,
      name: "Another Product",
    };

    const product = new Product(productDetails);

    expect(product.id).toBe(2);
    expect(product.name).toBe("Another Product");
    expect(product.image).toBeUndefined();
    expect(product.rating).toBeUndefined();
    expect(product.priceCents).toBeUndefined();
  });
  it("should return the correct stars URL based on the rating's stars", () => {
    const productDetails = {
      id: 1,
      image: "example.jpg",
      name: "Sample Product",
      rating: { stars: 4.5 },
      priceCents: 1500,
    };

    const product = new Product(productDetails);

    expect(product.getStarsUrl()).toBe("images/ratings/rating-45.png");
  });

  it("should handle edge cases like no stars in rating", () => {
    const productDetails = {
      id: 1,
      image: "example.jpg",
      name: "Sample Product",
      rating: { stars: 0 },
      priceCents: 1500,
    };

    const product = new Product(productDetails);

    expect(product.getStarsUrl()).toBe("images/ratings/rating-0.png");
  });
  it("should return the correct formatted price in dollars", () => {
    const productDetails = {
      id: 1,
      image: "example.jpg",
      name: "Sample Product",
      rating: { stars: 4.5 },
      priceCents: 1500,
    };

    const product = new Product(productDetails);

    expect(product.getPrice()).toBe("$15.00");
  });
  it("should handle edge cases like zero price", () => {
    const productDetails = {
      id: 1,
      image: "example.jpg",
      name: "Sample Product",
      rating: { stars: 4.5 },
      priceCents: 0,
    };

    const product = new Product(productDetails);

    expect(product.getPrice()).toBe("$0.00");
  });
})

describe('test suite for Clothing class', ()=>{
  it("should correctly initialize properties inherited from Product and its own properties", () => {
    const productDetails = {
      id: 1,
      image: "clothing.jpg",
      name: "T-shirt",
      rating: { stars: 5 },
      priceCents: 2000,
      sizeChartLink: "https://example.com/size-chart",
    };

    const clothing = new Clothing(productDetails);

    // Test inherited properties
    expect(clothing.id).toBe(1);
    expect(clothing.image).toBe("clothing.jpg");
    expect(clothing.name).toBe("T-shirt");
    expect(clothing.rating).toEqual({ stars: 5 });
    expect(clothing.priceCents).toBe(2000);

    // Test Clothing-specific property
    expect(clothing.sizeChartLink).toBe("https://example.com/size-chart");
  });

  it("should inherit methods from the Product class", () => {
    const productDetails = {
      id: 2,
      image: "jacket.jpg",
      name: "Jacket",
      rating: { stars: 4 },
      priceCents: 5000,
      sizeChartLink: "https://example.com/jacket-size-chart",
    };

    const clothing = new Clothing(productDetails);

    // Test getStarsUrl method
    expect(clothing.getStarsUrl()).toBe("images/ratings/rating-40.png");

    // Test getPrice method
    expect(clothing.getPrice()).toBe("$50.00");
  });

  it("should return HTML containing the size chart link and text", () => {
    const productDetails = {
      id: 1,
      image: "shirt.jpg",
      name: "Shirt",
      rating: { stars: 5 },
      priceCents: 2500,
      sizeChartLink: "https://example.com/size-chart",
    };

    const clothing = new Clothing(productDetails);

    const html = clothing.extraInfoHTML();

    // Check if the returned HTML contains the size chart link
    expect(html).toContain(`href="${productDetails.sizeChartLink}"`);

    // Check if the returned HTML contains the text "Size Chart"
    expect(html).toContain("Size Chart");
  });

  it("should handle missing sizeChartLink gracefully", () => {
    const productDetails = {
      id: 2,
      image: "pants.jpg",
      name: "Pants",
      rating: { stars: 4 },
      priceCents: 3000,
      // No sizeChartLink provided
    };

    const clothing = new Clothing(productDetails);

    const html = clothing.extraInfoHTML();

    // Check if the returned HTML still contains a placeholder for the link
    expect(html).toContain(`href="undefined"`);

    // Check if the returned HTML contains the text "Size Chart"
    expect(html).toContain("Size Chart");
  });
})

describe('test suite for Appliances class', ()=>{
  it("should correctly initialize properties inherited from Product and its own properties", () => {
    const productDetails = {
      id: 1,
      image: "fridge.jpg",
      name: "Refrigerator",
      rating: { stars: 5 },
      priceCents: 250000,
      instructionsLink: "https://example.com/instructions",
      warrantyLink: "https://example.com/warranty",
    };

    const appliance = new Appliances(productDetails);

    // Test inherited properties
    expect(appliance.id).toBe(1);
    expect(appliance.image).toBe("fridge.jpg");
    expect(appliance.name).toBe("Refrigerator");
    expect(appliance.rating).toEqual({ stars: 5 });
    expect(appliance.priceCents).toBe(250000);

    // Test Appliances-specific properties
    expect(appliance.instructionsLink).toBe("https://example.com/instructions");
    expect(appliance.warrantyLink).toBe("https://example.com/warranty");
  });

  it("should generate correct HTML in extraInfoHTMLAppliances", () => {
    const productDetails = {
      id: 2,
      image: "washer.jpg",
      name: "Washing Machine",
      rating: { stars: 4 },
      priceCents: 350000,
      instructionsLink: "https://example.com/washer-instructions",
      warrantyLink: "https://example.com/washer-warranty",
    };

    const appliance = new Appliances(productDetails);

    const html = appliance.extraInfoHTMLAppliances();

    // Check if the returned HTML contains the instructions link
    expect(html).toContain(`href="${productDetails.instructionsLink}"`);
    expect(html).toContain("Instructions");

    // Check if the returned HTML contains the warranty link
    expect(html).toContain(`href="${productDetails.warrantyLink}"`);
    expect(html).toContain("Warranty");
  });

  it("should handle missing instructionsLink and warrantyLink gracefully", () => {
    const productDetails = {
      id: 3,
      image: "oven.jpg",
      name: "Oven",
      rating: { stars: 3 },
      priceCents: 120000,
      // No instructionsLink or warrantyLink provided
    };

    const appliance = new Appliances(productDetails);

    const html = appliance.extraInfoHTMLAppliances();

    // Check if the returned HTML contains placeholders for the missing links
    expect(html).toContain(`href="undefined"`);
    expect(html).toContain("Instructions");
    expect(html).toContain("Warranty");
  });
})
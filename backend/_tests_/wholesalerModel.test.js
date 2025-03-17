const Wholesaler = require("../models/wholesalerModels");
const { connectDB, disconnectDB } = require("../testSetup");

beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Wholesaler Model Tests", () => {
  test("should create and save a wholesaler successfully", async () => {
    const wholesalerData = {
      name: "Test Wholesaler",
      category: "Grocery",
      location: "Los Angeles",
      email: "test@example.com",
      phone: "9876543210",
    };

    const wholesaler = new Wholesaler(wholesalerData);
    const savedWholesaler = await wholesaler.save();

    expect(savedWholesaler._id).toBeDefined();
    expect(savedWholesaler.name).toBe(wholesalerData.name);
  });

  test("should throw an error if required fields are missing", async () => {
    const wholesaler = new Wholesaler({}); // Empty data

    let err;
    try {
      await wholesaler.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.name).toBeDefined();
  });
});

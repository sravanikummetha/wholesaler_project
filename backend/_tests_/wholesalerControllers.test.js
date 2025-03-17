const request = require("supertest");
const app = require("../app");
const { connectDB, disconnectDB } = require("../testSetup");
const mongoose = require("mongoose");

// Connect to in-memory database before tests
beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Wholesaler Controller Tests", () => {
  let createdWholesalerId;

  test("POST /wholesaler should create a new wholesaler", async () => {
    const newWholesaler = {
      name: "Test Wholesaler",
      category: "Grocery",
      location: "New York",
      email: "test@example.com",
      phone: "9876543210",
    };

    const response = await request(app).post("/wholesaler").send(newWholesaler);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body.data).toHaveProperty("tour");
    expect(response.body.data.tour).toHaveProperty("_id");

    createdWholesalerId = response.body.data.tour._id; // Store valid ID
  });

  test("DELETE /wholesaler/:id should return 404 if wholesaler does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId(); // Generate a valid ObjectId

    const deleteResponse = await request(app).delete(`/wholesaler/${fakeId}`);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body.message).toBe("Wholesaler not found");
  });
});

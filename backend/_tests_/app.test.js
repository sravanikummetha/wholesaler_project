const request = require("supertest");
const app = require("../app"); // Import your Express app
const { connectDB, disconnectDB } = require("../testSetup");

// Connect to in-memory MongoDB before running tests
beforeAll(async () => await connectDB());

// Disconnect from database after all tests are done
afterAll(async () => await disconnectDB());

describe("API Endpoint Tests", () => {
  test("GET /profile should return user profile", async () => {
    const response = await request(app).get("/profile");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user.name).toBe("User");
  });

  test("GET /wholesaler should return empty array initially", async () => {
    const response = await request(app).get("/wholesaler");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "success", data: [] });
  });

  test("POST /wholesaler should create a new wholesaler", async () => {
    const newWholesaler = {
      name: "ABC Wholesalers",
      category: "Electronics",
      location: "New York",
      email: "abc@example.com",
      phone: "1234567890",
    };

    const response = await request(app).post("/wholesaler").send(newWholesaler);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body.data).toHaveProperty("tour");
    expect(response.body.data.tour).toHaveProperty("_id");
  });

  test("DELETE /wholesaler/:id should delete a wholesaler", async () => {
    // ✅ First, create a wholesaler to get a valid ID
    const newWholesaler = await request(app).post("/wholesaler").send({
      name: "Test Wholesaler",
      category: "Grocery",
      location: "San Francisco",
      email: "test@example.com",
      phone: "9876543210",
    });

    const createdWholesalerId = newWholesaler.body.data.tour._id; // ✅ Store the actual ID

    // ✅ Use the correct ID in DELETE request
    const deleteResponse = await request(app).delete(
      `/wholesaler/${createdWholesalerId}`
    );

    expect(deleteResponse.status).toBe(204); // ✅ Now should return 204
  });
});

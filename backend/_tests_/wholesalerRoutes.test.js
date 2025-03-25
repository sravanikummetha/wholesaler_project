const request = require("supertest");
const app = require("../app"); // Import the Express app
const { connectDB, disconnectDB } = require("../testSetup");

// Connect to database before tests
beforeAll(async () => await connectDB());
afterAll(async () => await disconnectDB());

describe("Wholesaler Routes Tests", () => {
  let createdWholesalerId;

  test("POST /wholesaler should create a new wholesaler", async () => {
    const newWholesaler = {
      name: "Test Wholesaler",
      category: "Grocery",
      location: "San Francisco",
      email: "test@example.com",
      phone: "9876543210",
    };

    const response = await request(app).post("/wholesaler").send(newWholesaler);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("status", "success");
    expect(response.body.data).toHaveProperty("tour");
    expect(response.body.data.tour).toHaveProperty("_id");

    createdWholesalerId = response.body.data.tour._id; // Store ID for delete test
  });

  test("GET /wholesaler should return all wholesalers", async () => {
    const response = await request(app).get("/wholesaler");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("PATCH /wholesaler/:id should update a wholesaler", async () => {
    const response = await request(app)
      .patch(`/wholesaler/${createdWholesalerId}`)
      .send({ name: "Updated Wholesaler" });

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Updated Wholesaler");
  });

  test("DELETE /wholesaler/:id should delete a wholesaler", async () => {
    const response = await request(app).delete(
      `/wholesaler/${createdWholesalerId}`
    );

    expect(response.status).toBe(204);
  });
});

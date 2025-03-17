const jwt = require("jsonwebtoken");
const { generateToken } = require("../controllers/authControllers");

describe("generateToken", () => {
  const mockUser = { _id: "1234567890", email: "test@example.com" };
  const secretKey = "test_secret"; // Mock secret key

  beforeAll(() => {
    process.env.JWT_SECRET = secretKey; // Set test secret key
  });

  afterAll(() => {
    delete process.env.JWT_SECRET; // Clean up env variable
  });

  test("should generate a valid JWT token", () => {
    const token = generateToken(mockUser);

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  test("should contain correct user ID and email in payload", () => {
    const token = generateToken(mockUser);
    const decoded = jwt.verify(token, secretKey); // Verify token with the same secret

    expect(decoded).toHaveProperty("userId", mockUser._id);
    expect(decoded).toHaveProperty("email", mockUser.email);
  });

  test("should have an expiration time of 1 hour", () => {
    const token = generateToken(mockUser);
    const decoded = jwt.verify(token, secretKey);

    const currentTime = Math.floor(Date.now() / 1000);
    const expectedExpiration = currentTime + 3600; // 1 hour in seconds

    expect(decoded.exp).toBeGreaterThan(currentTime);
    expect(decoded.exp).toBeLessThanOrEqual(expectedExpiration);
  });

  test("should throw an error if JWT_SECRET is missing", () => {
    delete process.env.JWT_SECRET; // Remove secret key

    expect(() => generateToken(mockUser)).toThrow();

    process.env.JWT_SECRET = secretKey; // Restore secret key after test
  });
});

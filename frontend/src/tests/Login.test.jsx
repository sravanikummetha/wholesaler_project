import { vi } from "vitest"; // Ensure `vi` is imported first

// Mock `@azure/msal-react`
vi.mock("@azure/msal-react", () => ({
  useMsal: vi.fn(),
}));

// Mock `react-router-dom`
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import actual module
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock `useNavigate`
  };
});

// Now import everything else
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/login/Login";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom"; 

describe("Login Component", () => {
  const mockLoginPopup = vi.fn().mockResolvedValue({
    account: { username: "test@example.com", name: "Test User" },
    idTokenClaims: { preferred_username: "test@example.com", name: "Test User", roles: ["Admin"] },
  });

  const mockAcquireTokenSilent = vi.fn().mockResolvedValue({
    accessToken: "mock-access-token",
  });

  const mockNavigate = vi.fn(); 
  beforeEach(() => {
    useMsal.mockReturnValue({
      instance: {
        loginPopup: mockLoginPopup,
        acquireTokenSilent: mockAcquireTokenSilent,
      },
    });

    useNavigate.mockReturnValue(mockNavigate); 
  });

  test("renders login page with button", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to wholesaler portal/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login with portal id/i })).toBeInTheDocument();
  });

  test("clicking login button calls loginPopup and navigates", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const loginButton = screen.getByRole("button", { name: /login with portal id/i });

    fireEvent.click(loginButton);

    // Wait for async functions
    await expect(mockLoginPopup).toHaveBeenCalled();
    await expect(mockAcquireTokenSilent).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/wholesalers"); 
  });
});

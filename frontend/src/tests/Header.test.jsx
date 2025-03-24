import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from "vitest";
import { useMsal } from "@azure/msal-react";
import Header from "../components/header/Header";

// Mock necessary modules
vi.mock("@azure/msal-react", () => ({
  useMsal: vi.fn(),
}));

vi.mock("../common/reusableButton", () => ({
  __esModule: true,
  default: ({ label, onClick }) => <button onClick={onClick}>{label}</button>,
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Header Component", () => {
  const mockLogoutPopup = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useMsal.mockReturnValue({
      instance: {
        logoutPopup: mockLogoutPopup,
      },
    });

    // Mock localStorage
    global.localStorage = {
      getItem: vi.fn().mockReturnValue("mock-token"),
      removeItem: vi.fn(),
    };

    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders Header with default user name", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Wholesaler Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("handles logout correctly", async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogoutPopup).toHaveBeenCalled();
      expect(global.localStorage.removeItem).toHaveBeenCalledWith("authToken");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});

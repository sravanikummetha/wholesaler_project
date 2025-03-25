import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import AppRoutes from "../routes/AppRoutes";

// Mock Components
vi.mock("../components/login/Login", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("../components/table/WholesalerTable", () => ({
  default: () => <div>Wholesaler Table</div>,
}));

vi.mock("../components/header/Header", () => ({
  default: () => <div>Header Component</div>,
}));

describe("AppRoutes Component", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("renders Login page at root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test("redirects to Login if no token is found", () => {
    render(
      <MemoryRouter initialEntries={["/wholesalers"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test("renders WholesalerTable when token is present", () => {
    localStorage.setItem("authToken", "mock-token");

    render(
      <MemoryRouter initialEntries={["/wholesalers"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Header Component/i)).toBeInTheDocument();
    expect(screen.getByText(/Wholesaler Table/i)).toBeInTheDocument();
  });

  test("renders 404 page for an unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/random-route"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});

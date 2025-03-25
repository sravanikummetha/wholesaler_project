import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WholesalerTable from "../components/table/WholesalerTable";
import { getAllWholesalers, deleteWholesaler } from "../services/wholesalerService";
import { vi } from "vitest";

// Mock API Calls
vi.mock("../services/wholesalerService", () => ({
  getAllWholesalers: vi.fn(() =>
    Promise.resolve([
      {
        _id: "123",
        name: "Test Wholesaler",
        category: "Electronics",
        location: "New York",
        email: "test@example.com",
        phone: "1234567890",
        orders: 50,
        revenue: 1000,
        creditLimit: 500,
        warehouse: "WH1",
        discount: 10,
        rating: 4.5,
      },
    ])
  ),
  deleteWholesaler: vi.fn(() => Promise.resolve({ success: true })),
}));

describe("WholesalerTable Component", () => {
  test("renders table with wholesalers", async () => {
    render(<WholesalerTable />);

    // Wait for API call to resolve and table to render
    await waitFor(() => {
      expect(getAllWholesalers).toHaveBeenCalledTimes(1);
      expect(screen.getByText(/Test Wholesaler/i)).toBeInTheDocument();
    });
  });

  test("deletes a wholesaler when the delete button is clicked", async () => {
    render(<WholesalerTable />);

    // Wait for the table to load with data
    await waitFor(() => {
      expect(screen.getByText(/Test Wholesaler/i)).toBeInTheDocument();
    });

    // Ensure checkboxes are present
    const checkboxes = await screen.findAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(1);

    // Select the first wholesaler
    fireEvent.click(checkboxes[1]);

    // Find the delete button and ensure it's enabled
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).not.toBeDisabled();

    // Click the delete button
    fireEvent.click(deleteButton);

    // Ensure the delete API is called
    await waitFor(() => expect(deleteWholesaler).toHaveBeenCalledTimes(1));
  });

  test("disables delete button when no wholesaler is selected", async () => {
    render(<WholesalerTable />);

    // Ensure the delete button is disabled initially
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeDisabled();
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import Login from "../components/login/Login"; 

test("renders login button", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const loginButton = screen.getByRole("button", { name: /login with portal id/i });
  expect(loginButton).toBeInTheDocument();
});

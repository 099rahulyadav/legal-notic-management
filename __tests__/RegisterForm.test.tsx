import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "@/components/RegisterForm";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("RegisterForm", () => {
  it("renders the form correctly", () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    expect(screen.getByText("Get a Quote Now")).toBeInTheDocument();
  });

  it("displays validation errors when submitting empty form", async () => {
    render(
      <Provider store={store}>
        <RegisterForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /send request/i }));

    expect(await screen.findByText("Please enter a valid email address")).toBeInTheDocument();
    expect(await screen.findByText("Phone number must be at least 10 digits")).toBeInTheDocument();
  });
});

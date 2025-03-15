import formReducer, { submitForm, resetForm } from "@/store/formSlice";
import { FormState } from "@/store/formSlice"; 

describe("formSlice reducer", () => {
  const initialState: FormState = {
    userData: null,
    token: null,
    status: "idle",
    error: null,
  };

  it("should return the initial state", () => {
    expect(formReducer(undefined, { type: "unknown_action" })).toEqual(initialState);
  });

  it("should handle form submission", () => {
    const formData = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      orderDetails: "Sample Order",
      file: "test.pdf",
    };

    const newState = formReducer(initialState, { type: submitForm.pending.type });

    expect(newState.status).toBe("loading");
    expect(newState.error).toBeNull();
  });

  it("should handle form submission success", () => {
    const submittedData = {
      "Received Data": {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        orderDetails: "Sample Order",
        file: "test.pdf",
      },
      token: "yJjbGllbnRfaWQiOiJZekV6TUdkb01ISm5PSEJpT",
    };

    const newState = formReducer(initialState, {
      type: submitForm.fulfilled.type,
      payload: submittedData,
    });

    expect(newState.status).toBe("succeeded");
    expect(newState.userData).toEqual(submittedData["Received Data"]);
    expect(newState.token).toBe(submittedData.token);
  });

  it("should handle form submission error", () => {
    const errorMessage = "Failed to submit form";
    const newState = formReducer(initialState, {
      type: submitForm.rejected.type,
      payload: errorMessage,
    });

    expect(newState.status).toBe("failed");
    expect(newState.error).toBe(errorMessage);
  });

  it("should reset the form state", () => {
    const modifiedState: FormState = {
      userData: { fullName: "Jane Doe" },
      token: "some-token",
      status: "succeeded",
      error: null,
    };

    const newState = formReducer(modifiedState, resetForm());

    expect(newState.userData).toBeNull();
    expect(newState.token).toBeNull();
  });
});

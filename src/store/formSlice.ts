import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Async action for submitting form data
export const submitForm = createAsyncThunk(
  "form/submitForm",
  async (formData: Record<string, unknown>, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");
      return data; // Return success response
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Define Redux state structure
interface FormState {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderDetails: string;
  file: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormState = {
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  orderDetails: "",
  file: null,
  status: "idle",
  error: null,
};

// Create Redux slice with extraReducers to handle API response
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

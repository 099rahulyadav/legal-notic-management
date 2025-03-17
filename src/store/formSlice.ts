import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedUserData = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");
    return {
      userData: storedUserData ? JSON.parse(storedUserData) : null,
      token: storedToken || null,
    };
  }
  return { userData: null, token: null };
};

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

      return data;
    } catch (error: unknown)  {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export interface FormState {
  userData: Record<string, unknown> | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: FormState = {
  ...loadFromLocalStorage(),
  status: "idle",
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.userData = null;
      state.token = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userData = action.payload["Received Data"];
        state.token = action.payload.token;

        localStorage.setItem("userData", JSON.stringify(action.payload["Received Data"]));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetForm } = formSlice.actions;
export default formSlice.reducer;




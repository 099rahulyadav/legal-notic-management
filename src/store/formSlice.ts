import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  fullName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderDetails: string;
  file: string | null;
}

const initialState: FormState = {
  fullName: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  orderDetails: "",
  file: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const taskForm = createSlice({
  name: "taskForm",
  initialState: {
    value: false,
  },
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = taskForm.actions;

export default taskForm.reducer;

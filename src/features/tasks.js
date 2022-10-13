import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: "idle",
  tasks: [],
});

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (id) => {
  let response = await axios.get(
    `http://localhost:3000/tasks${id ? "?projectId=" + id : ""}`
  );
  let data = await response.data;
  return data;
});

export const addNewTask = createAsyncThunk("tasks/addNewTask", async (task) => {
  const response = await axios.post("http://localhost:3000/tasks", task);
  let current = await axios.get(
    "http://localhost:3000/projects/" + task.projectId
  );
  current = current.data;
  current.trackedTime = current.trackedTime + task.time;
  await axios.put("http://localhost:3000/projects/" + task.projectId, current);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (id) => {
  let current = await axios.get("http://localhost:3000/tasks/" + id);
  current = current.data;
  console.log(current);
  current.remainingTime = current.remainingTime - 1;
  await axios.put("http://localhost:3000/tasks/" + id, current);
});

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, projectId, time) => {
    await axios.delete("http://localhost:3000/tasks/" + id);
    let current = await axios.get(
      "http://localhost:3000/projects/" + projectId
    );
    current = current.data;
    current.trackedTime = current.trackedTime - time;
    await axios.put("http://localhost:3000/projects/" + projectId, current);
  }
);

export const markComplete = createAsyncThunk(
  "tasks/markComplete",
  async (id) => {
    let current = await axios.get("http://localhost:3000/tasks/" + id);
    current = current.data;
    current.completed = true;
    current.remainingTime = 0;
    current.remainingSeconds = 0;
    await axios.put("http://localhost:3000/tasks/" + id, current);
  }
);

export const resetTask = createAsyncThunk("tasks/resetTask", async (id) => {
  let current = await axios.get("http://localhost:3000/tasks/" + id);
  current = current.data;
  current.completed = false;
  current.remainingTime = current.time - 1;
  current.remainingSeconds = 59;
  await axios.put("http://localhost:3000/tasks/" + id, current);
});

export const updateTime = createAsyncThunk("tasks/markComplete", async (id) => {
  let current = await axios.get("http://localhost:3000/tasks/" + id);
  current = current.data;
  current.remainingTime = current.remainingTime - 1;
  await axios.put("http://localhost:3000/tasks/" + id, current);
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "loading";
        state.tasks = action.payload;
        state.status = "idle";
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewTask.fulfilled, tasksAdapter.addOne)
      .addCase(removeTask.fulfilled, tasksAdapter.removeOne);
  },
});

export default tasksSlice.reducer;

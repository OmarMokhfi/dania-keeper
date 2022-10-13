import axios from "axios";
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const projectsAdapter = createEntityAdapter();

const initialState = projectsAdapter.getInitialState({
  status: "idle",
  projects: [],
});

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    return axios
      .get("http://localhost:3000/projects")
      .then((response) => response.data);
  }
);

export const addNewProject = createAsyncThunk(
  "projects/addNewProject",
  async (project) => {
    const response = await axios.post(
      "http://localhost:3000/projects",
      project
    );
    return response.data;
  }
);

export const getProject = createAsyncThunk(
  "projects/getProject",
  async (id) => {
    return axios
      .get(`http://localhost:3000/projects/${id}`)
      .then((response) => response.data);
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "loading";
        state.projects = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "loading";
        state.projects = [];
      })
      .addCase(getProject.fulfilled, projectsAdapter.getSelectors)
      .addCase(addNewProject.fulfilled, projectsAdapter.addOne);
  },
});

export default projectsSlice.reducer;
